/**
 * Claude API Service for AI-powered medical bill explanations
 * Uses Anthropic's Claude API or AWS Bedrock
 */

import { ExtractedLineItem } from '../types';

// Configuration
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-3-haiku-20240307'; // Fast and cost-effective for explanations

export interface LineItemExplanation {
  lineItemId: string;
  plainEnglish: string;
  medicalContext: string;
  costAnalysis: string;
  disputeRecommendation?: {
    shouldDispute: boolean;
    reason: string;
    talkingPoints: string[];
  };
}

export interface ExplanationRequest {
  lineItems: ExtractedLineItem[];
  context?: {
    provider?: string;
    serviceDate?: string;
    region?: string;
  };
}

export interface ExplanationResponse {
  explanations: LineItemExplanation[];
  overallSummary: string;
}

// System prompt for medical bill explanations
const SYSTEM_PROMPT = `You are a helpful medical billing expert who explains medical bills in plain, friendly English. Your goal is to help patients understand what they're being charged for and identify potential issues.

When explaining medical charges:
1. Use simple, everyday language - avoid medical jargon
2. Explain what the procedure/service actually is
3. Provide context about why it might have been done
4. Give honest cost analysis compared to typical prices
5. Flag any potential issues (duplicates, unusually high charges)
6. Be empathetic - medical bills are stressful

Always be accurate but reassuring. Help people feel empowered, not overwhelmed.`;

export class ClaudeService {
  private apiKey: string;

  constructor() {
    this.apiKey = CLAUDE_API_KEY || '';
  }

  /**
   * Generate explanation for a single line item
   */
  async explainLineItem(
    item: ExtractedLineItem,
    context?: ExplanationRequest['context']
  ): Promise<LineItemExplanation> {
    const prompt = this.buildLineItemPrompt(item, context);

    try {
      const response = await this.callClaudeAPI(prompt);
      return this.parseExplanationResponse(item.id, response);
    } catch (error) {
      console.error('Claude API error:', error);
      return this.getFallbackExplanation(item);
    }
  }

  /**
   * Generate explanations for multiple line items
   */
  async explainBatch(
    request: ExplanationRequest
  ): Promise<ExplanationResponse> {
    const explanations: LineItemExplanation[] = [];

    // Process items in parallel with rate limiting
    const batchSize = 3;
    for (let i = 0; i < request.lineItems.length; i += batchSize) {
      const batch = request.lineItems.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(item => this.explainLineItem(item, request.context))
      );
      explanations.push(...batchResults);
    }

    const overallSummary = await this.generateSummary(request.lineItems, explanations);

    return { explanations, overallSummary };
  }

  /**
   * Build prompt for line item explanation
   */
  private buildLineItemPrompt(
    item: ExtractedLineItem,
    context?: ExplanationRequest['context']
  ): string {
    let prompt = `Please explain this medical bill charge in plain English:\n\n`;
    
    if (item.code) {
      prompt += `Medical Code: ${item.code}\n`;
    }
    prompt += `Description: ${item.description || item.rawText}\n`;
    prompt += `Amount Charged: $${item.amount?.toFixed(2) || 'Unknown'}\n`;
    
    if (item.date) {
      prompt += `Service Date: ${item.date}\n`;
    }
    
    if (context?.provider) {
      prompt += `Provider: ${context.provider}\n`;
    }

    prompt += `\nPlease provide:
1. A simple explanation of what this charge is for (2-3 sentences)
2. Medical context - why this might have been done
3. Cost analysis - is this price reasonable compared to typical costs?
4. If the price seems high, suggest whether to dispute and what to say

Format your response as JSON:
{
  "plainEnglish": "...",
  "medicalContext": "...",
  "costAnalysis": "...",
  "shouldDispute": true/false,
  "disputeReason": "...",
  "talkingPoints": ["...", "..."]
}`;

    return prompt;
  }

  /**
   * Call Claude API
   */
  private async callClaudeAPI(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Claude API key not configured');
    }

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Claude API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  /**
   * Parse Claude's response into structured explanation
   */
  private parseExplanationResponse(
    lineItemId: string,
    response: string
  ): LineItemExplanation {
    try {
      // Try to parse JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          lineItemId,
          plainEnglish: parsed.plainEnglish || response,
          medicalContext: parsed.medicalContext || '',
          costAnalysis: parsed.costAnalysis || '',
          disputeRecommendation: parsed.shouldDispute ? {
            shouldDispute: parsed.shouldDispute,
            reason: parsed.disputeReason || '',
            talkingPoints: parsed.talkingPoints || []
          } : undefined
        };
      }
    } catch (e) {
      // Fall through to plain text handling
    }

    // If not JSON, use the raw response
    return {
      lineItemId,
      plainEnglish: response,
      medicalContext: '',
      costAnalysis: ''
    };
  }

  /**
   * Generate overall bill summary
   */
  private async generateSummary(
    items: ExtractedLineItem[],
    explanations: LineItemExplanation[]
  ): Promise<string> {
    const total = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const disputeCount = explanations.filter(e => e.disputeRecommendation?.shouldDispute).length;
    
    const prompt = `Summarize this medical bill in 2-3 friendly sentences:
- Total: $${total.toFixed(2)}
- Number of charges: ${items.length}
- Charges recommended to dispute: ${disputeCount}

Be encouraging and helpful. If there are items to dispute, mention the potential savings.`;

    try {
      return await this.callClaudeAPI(prompt);
    } catch {
      return `Your bill totals $${total.toFixed(2)} across ${items.length} charges. ${
        disputeCount > 0 
          ? `We found ${disputeCount} charge(s) you might want to question.` 
          : 'All charges appear reasonable.'
      }`;
    }
  }

  /**
   * Fallback explanation when API is unavailable
   */
  private getFallbackExplanation(item: ExtractedLineItem): LineItemExplanation {
    const fallbacks: Record<string, string> = {
      '99213': 'This is a standard office visit with your doctor, typically lasting 15-30 minutes for an established patient.',
      '36415': 'This is the charge for drawing blood from your vein (venipuncture) for lab tests.',
      '80053': 'This is a Comprehensive Metabolic Panel - a blood test that checks 14 different things including kidney and liver function.',
      '85025': 'This is a Complete Blood Count (CBC) that measures your red and white blood cells and platelets.',
      '81001': 'This is a urinalysis - a test of your urine to check for infections or other conditions.'
    };

    const explanation = item.code && fallbacks[item.code]
      ? fallbacks[item.code]
      : `This charge is for: ${item.description || item.rawText}. Contact your provider for more details about this specific service.`;

    return {
      lineItemId: item.id,
      plainEnglish: explanation,
      medicalContext: 'This is a common medical service.',
      costAnalysis: `The charge of $${item.amount?.toFixed(2) || '0.00'} should be compared with your insurance explanation of benefits.`
    };
  }
}

export const claudeService = new ClaudeService();
