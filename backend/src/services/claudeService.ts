/**
 * Claude API Service for AI-powered medical bill analysis
 * Deep understanding of medical billing, insurance, and patient advocacy
 */

import { ExtractedLineItem } from '../types';

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-3-5-sonnet-20241022'; // Using Sonnet for deeper analysis

export interface LineItemExplanation {
  lineItemId: string;
  plainEnglish: string;
  whyCharged: string;
  medicalContext: string;
  costAnalysis: {
    chargedAmount: number;
    regionalAverage: { low: number; high: number; median: number };
    medicareRate: number;
    percentAboveAverage: number;
    priceVerdict: 'fair' | 'high' | 'very-high' | 'extreme';
  };
  redFlags: string[];
  negotiationTips: string[];
  disputeRecommendation?: {
    shouldDispute: boolean;
    reason: string;
    talkingPoints: string[];
    sampleScript: string;
  };
}

export interface AdjustmentExplanation {
  code: string;
  name: string;
  amount: number;
  explanation: string;
  isGood: boolean;
  actionRequired: boolean;
  actionDetails?: string;
}

export interface BillSummary {
  totalCharged: number;
  totalAdjustments: number;
  totalOwed: number;
  overallAssessment: string;
  potentialSavings: { low: number; high: number };
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  urgencyReason: string;
  topPriorities: Array<{
    action: string;
    reason: string;
    potentialSavings: number;
    deadline?: string;
  }>;
  financialAssistance: {
    likelyEligible: boolean;
    programs: string[];
    howToApply: string[];
    incomeThresholds?: string;
  };
  negotiationStrategy: {
    overallApproach: string;
    keyPoints: string[];
    whatToSay: string;
    whatNotToSay: string;
  };
}

export interface ExplanationRequest {
  lineItems: ExtractedLineItem[];
  adjustments?: Array<{ code: string; name: string; amount: number }>;
  context?: {
    provider?: string;
    providerSystem?: string;
    serviceDate?: string;
    region?: string;
    state?: string;
    insuranceStatus?: 'insured' | 'uninsured' | 'underinsured' | 'unknown';
    totalBilled?: number;
    totalOwed?: number;
    accountNumbers?: string[];
    visitType?: 'er' | 'inpatient' | 'outpatient' | 'office' | 'unknown';
    daysInHospital?: number;
  };
}

export interface FullBillAnalysis {
  lineItemExplanations: LineItemExplanation[];
  adjustmentExplanations: AdjustmentExplanation[];
  summary: BillSummary;
  rawAnalysis: string;
}

const SYSTEM_PROMPT = `You are an expert medical billing analyst and patient advocate with deep knowledge of:

1. **Medical Coding**: CPT codes, HCPCS codes, ICD-10, DRG codes, revenue codes
2. **Hospital Billing**: Chargemaster pricing, facility fees, room & board, ancillary charges
3. **Insurance**: EOBs, allowed amounts, in-network vs out-of-network, deductibles, coinsurance
4. **Billing Errors**: Upcoding, unbundling, duplicate charges, balance billing, surprise billing
5. **Patient Rights**: No Surprises Act, state billing protections, charity care laws
6. **Negotiation**: Hospital financial assistance, payment plans, bill reduction strategies
7. **Regional Pricing**: Fair market rates vary by region, Medicare rates as baseline

Your mission: Help patients understand their bills and SAVE MONEY. Be their advocate.

When analyzing bills:
- Explain charges in plain English a high schooler would understand
- Always explain WHY something was charged, not just what it is
- Compare prices to regional averages and Medicare rates
- Flag ANY potential errors, overcharges, or negotiable items
- Provide specific, actionable advice with scripts for what to say
- Consider the patient's insurance status when giving advice
- Be empathetic - medical bills cause real stress and financial hardship

Key billing knowledge:
- "Chargemaster" prices are inflated list prices nobody actually pays
- Self-pay discounts of 30-60% are standard and expected
- MUE (Medically Unlikely Edit) write-offs indicate billing errors
- Facility fees are often the most negotiable charges
- Room & Board can often be reduced 30-50%
- Labs and imaging are frequently overpriced vs independent facilities
- ER facility fees are separate from physician fees
- Hospitals must provide charity care to maintain non-profit status

Always output valid JSON when requested.`;

export class ClaudeService {
  private apiKey: string;

  constructor() {
    this.apiKey = CLAUDE_API_KEY || '';
  }

  /**
   * Perform comprehensive analysis of an entire medical bill
   */
  async analyzeFullBill(request: ExplanationRequest): Promise<FullBillAnalysis> {
    const prompt = this.buildFullAnalysisPrompt(request);

    try {
      const response = await this.callClaudeAPI(prompt, 4096);
      return this.parseFullAnalysis(request, response);
    } catch (error) {
      console.error('Claude API error:', error);
      return this.getFallbackAnalysis(request);
    }
  }

  /**
   * Generate explanation for a single line item with full context
   */
  async explainLineItem(
    item: ExtractedLineItem,
    context?: ExplanationRequest['context']
  ): Promise<LineItemExplanation> {
    const prompt = this.buildLineItemPrompt(item, context);

    try {
      const response = await this.callClaudeAPI(prompt, 1500);
      return this.parseLineItemResponse(item, response);
    } catch (error) {
      console.error('Claude API error:', error);
      return this.getFallbackExplanation(item);
    }
  }

  /**
   * Batch explain multiple line items efficiently
   */
  async explainBatch(request: ExplanationRequest): Promise<{
    explanations: LineItemExplanation[];
    overallSummary: string;
  }> {
    // For small batches, do full analysis
    if (request.lineItems.length <= 10) {
      const fullAnalysis = await this.analyzeFullBill(request);
      return {
        explanations: fullAnalysis.lineItemExplanations,
        overallSummary: fullAnalysis.summary.overallAssessment
      };
    }

    // For larger bills, process in batches
    const explanations: LineItemExplanation[] = [];
    const batchSize = 5;
    
    for (let i = 0; i < request.lineItems.length; i += batchSize) {
      const batch = request.lineItems.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(item => this.explainLineItem(item, request.context))
      );
      explanations.push(...batchResults);
    }

    const summary = await this.generateSummary(request, explanations);
    return { explanations, overallSummary: summary };
  }

  private buildFullAnalysisPrompt(request: ExplanationRequest): string {
    const { lineItems, adjustments, context } = request;
    
    let prompt = `Analyze this medical bill comprehensively. I need you to be my advocate and help me understand every charge and find ways to reduce what I owe.

## BILL DETAILS\n`;

    if (context?.provider) prompt += `Provider: ${context.provider}\n`;
    if (context?.providerSystem) prompt += `Health System: ${context.providerSystem}\n`;
    if (context?.region || context?.state) prompt += `Location: ${context.region || ''} ${context.state || ''}\n`;
    if (context?.serviceDate) prompt += `Service Date: ${context.serviceDate}\n`;
    if (context?.visitType) prompt += `Visit Type: ${context.visitType}\n`;
    if (context?.daysInHospital) prompt += `Hospital Stay: ${context.daysInHospital} days\n`;
    if (context?.insuranceStatus) prompt += `Insurance Status: ${context.insuranceStatus}\n`;
    if (context?.totalBilled) prompt += `Total Billed: $${context.totalBilled.toFixed(2)}\n`;
    if (context?.totalOwed) prompt += `Amount Owed: $${context.totalOwed.toFixed(2)}\n`;

    prompt += `\n## LINE ITEMS\n`;
    for (const item of lineItems) {
      prompt += `- ${item.code || 'N/A'}: ${item.description || item.rawText} - $${item.amount?.toFixed(2) || '0.00'}`;
      if (item.date) prompt += ` (${item.date})`;
      if (item.quantity && item.quantity > 1) prompt += ` x${item.quantity}`;
      prompt += `\n`;
    }

    if (adjustments && adjustments.length > 0) {
      prompt += `\n## ADJUSTMENTS\n`;
      for (const adj of adjustments) {
        prompt += `- ${adj.name}: -$${Math.abs(adj.amount).toFixed(2)}\n`;
      }
    }

    prompt += `
## ANALYSIS REQUIRED

Provide a comprehensive JSON analysis with this structure:
{
  "lineItems": [
    {
      "id": "item id or index",
      "code": "CPT/code if known",
      "plainEnglish": "Simple explanation of what this is",
      "whyCharged": "Why this appears on the bill - what triggered this charge",
      "medicalContext": "Medical explanation of the service",
      "costAnalysis": {
        "chargedAmount": 0.00,
        "regionalAverage": { "low": 0, "high": 0, "median": 0 },
        "medicareRate": 0,
        "percentAboveAverage": 0,
        "priceVerdict": "fair|high|very-high|extreme"
      },
      "redFlags": ["any concerns about this charge"],
      "negotiationTips": ["specific tips for this charge"],
      "disputeRecommendation": {
        "shouldDispute": true/false,
        "reason": "why to dispute",
        "talkingPoints": ["what to say"],
        "sampleScript": "Exact words to use when calling"
      }
    }
  ],
  "adjustments": [
    {
      "code": "adjustment code",
      "name": "adjustment name",
      "amount": 0.00,
      "explanation": "What this adjustment means",
      "isGood": true/false,
      "actionRequired": true/false,
      "actionDetails": "what to do if action required"
    }
  ],
  "summary": {
    "totalCharged": 0.00,
    "totalAdjustments": 0.00,
    "totalOwed": 0.00,
    "overallAssessment": "2-3 sentence summary of the bill and main concerns",
    "potentialSavings": { "low": 0, "high": 0 },
    "urgencyLevel": "low|medium|high|critical",
    "urgencyReason": "why this urgency level",
    "topPriorities": [
      {
        "action": "specific action to take",
        "reason": "why this matters",
        "potentialSavings": 0,
        "deadline": "if time-sensitive"
      }
    ],
    "financialAssistance": {
      "likelyEligible": true/false,
      "programs": ["charity care", "payment plans", etc],
      "howToApply": ["step 1", "step 2"],
      "incomeThresholds": "income limits if known"
    },
    "negotiationStrategy": {
      "overallApproach": "recommended strategy",
      "keyPoints": ["main negotiation points"],
      "whatToSay": "opening script for calling billing",
      "whatNotToSay": "things to avoid saying"
    }
  }
}

Be specific with dollar amounts for regional averages. Use your knowledge of typical medical costs.
For Medicare rates, use approximate CMS fee schedule rates.
Flag anything suspicious - duplicate charges, unbundling, upcoding, excessive facility fees.
Consider the patient's insurance status when recommending actions.`;

    return prompt;
  }

  private buildLineItemPrompt(
    item: ExtractedLineItem,
    context?: ExplanationRequest['context']
  ): string {
    let prompt = `Analyze this single medical bill charge:\n\n`;
    
    if (item.code) prompt += `Code: ${item.code}\n`;
    prompt += `Description: ${item.description || item.rawText}\n`;
    prompt += `Amount: $${item.amount?.toFixed(2) || '0.00'}\n`;
    if (item.date) prompt += `Date: ${item.date}\n`;
    if (item.quantity) prompt += `Quantity: ${item.quantity}\n`;
    
    if (context) {
      prompt += `\nContext:\n`;
      if (context.provider) prompt += `- Provider: ${context.provider}\n`;
      if (context.visitType) prompt += `- Visit Type: ${context.visitType}\n`;
      if (context.insuranceStatus) prompt += `- Insurance: ${context.insuranceStatus}\n`;
      if (context.state) prompt += `- State: ${context.state}\n`;
    }

    prompt += `
Respond with JSON:
{
  "plainEnglish": "Simple explanation anyone can understand",
  "whyCharged": "Why this charge exists - what triggered it",
  "medicalContext": "Medical background on this service",
  "costAnalysis": {
    "chargedAmount": ${item.amount || 0},
    "regionalAverage": { "low": 0, "high": 0, "median": 0 },
    "medicareRate": 0,
    "percentAboveAverage": 0,
    "priceVerdict": "fair|high|very-high|extreme"
  },
  "redFlags": [],
  "negotiationTips": [],
  "disputeRecommendation": null or { "shouldDispute": bool, "reason": "", "talkingPoints": [], "sampleScript": "" }
}`;

    return prompt;
  }

  private async callClaudeAPI(prompt: string, maxTokens: number = 2048): Promise<string> {
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
        max_tokens: maxTokens,
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

  private parseFullAnalysis(request: ExplanationRequest, response: string): FullBillAnalysis {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      
      const parsed = JSON.parse(jsonMatch[0]);
      
      return {
        lineItemExplanations: (parsed.lineItems || []).map((item: any, idx: number) => ({
          lineItemId: item.id || request.lineItems[idx]?.id || `item-${idx}`,
          plainEnglish: item.plainEnglish || '',
          whyCharged: item.whyCharged || '',
          medicalContext: item.medicalContext || '',
          costAnalysis: item.costAnalysis || {
            chargedAmount: request.lineItems[idx]?.amount || 0,
            regionalAverage: { low: 0, high: 0, median: 0 },
            medicareRate: 0,
            percentAboveAverage: 0,
            priceVerdict: 'fair'
          },
          redFlags: item.redFlags || [],
          negotiationTips: item.negotiationTips || [],
          disputeRecommendation: item.disputeRecommendation
        })),
        adjustmentExplanations: (parsed.adjustments || []).map((adj: any) => ({
          code: adj.code || '',
          name: adj.name || '',
          amount: adj.amount || 0,
          explanation: adj.explanation || '',
          isGood: adj.isGood ?? true,
          actionRequired: adj.actionRequired ?? false,
          actionDetails: adj.actionDetails
        })),
        summary: {
          totalCharged: parsed.summary?.totalCharged || 0,
          totalAdjustments: parsed.summary?.totalAdjustments || 0,
          totalOwed: parsed.summary?.totalOwed || 0,
          overallAssessment: parsed.summary?.overallAssessment || '',
          potentialSavings: parsed.summary?.potentialSavings || { low: 0, high: 0 },
          urgencyLevel: parsed.summary?.urgencyLevel || 'medium',
          urgencyReason: parsed.summary?.urgencyReason || '',
          topPriorities: parsed.summary?.topPriorities || [],
          financialAssistance: parsed.summary?.financialAssistance || {
            likelyEligible: false,
            programs: [],
            howToApply: []
          },
          negotiationStrategy: parsed.summary?.negotiationStrategy || {
            overallApproach: '',
            keyPoints: [],
            whatToSay: '',
            whatNotToSay: ''
          }
        },
        rawAnalysis: response
      };
    } catch (e) {
      console.error('Failed to parse Claude response:', e);
      return this.getFallbackAnalysis(request);
    }
  }

  private parseLineItemResponse(item: ExtractedLineItem, response: string): LineItemExplanation {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      
      const parsed = JSON.parse(jsonMatch[0]);
      
      return {
        lineItemId: item.id,
        plainEnglish: parsed.plainEnglish || '',
        whyCharged: parsed.whyCharged || '',
        medicalContext: parsed.medicalContext || '',
        costAnalysis: parsed.costAnalysis || {
          chargedAmount: item.amount || 0,
          regionalAverage: { low: 0, high: 0, median: 0 },
          medicareRate: 0,
          percentAboveAverage: 0,
          priceVerdict: 'fair'
        },
        redFlags: parsed.redFlags || [],
        negotiationTips: parsed.negotiationTips || [],
        disputeRecommendation: parsed.disputeRecommendation
      };
    } catch (e) {
      return this.getFallbackExplanation(item);
    }
  }

  private async generateSummary(
    request: ExplanationRequest,
    explanations: LineItemExplanation[]
  ): Promise<string> {
    const total = request.lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
    const disputeCount = explanations.filter(e => e.disputeRecommendation?.shouldDispute).length;
    const potentialSavings = explanations
      .filter(e => e.disputeRecommendation?.shouldDispute)
      .reduce((sum, e) => {
        const charged = e.costAnalysis.chargedAmount;
        const fair = e.costAnalysis.regionalAverage.median || charged * 0.7;
        return sum + (charged - fair);
      }, 0);

    return `Your bill totals $${total.toFixed(2)} across ${request.lineItems.length} charges. ` +
      (disputeCount > 0 
        ? `We identified ${disputeCount} charge(s) worth questioning, with potential savings of $${potentialSavings.toFixed(0)}-${(potentialSavings * 1.5).toFixed(0)}. ` 
        : 'All charges appear within normal ranges. ') +
      (request.context?.insuranceStatus === 'uninsured'
        ? 'As an uninsured patient, you likely qualify for financial assistance - this should be your first call.'
        : '');
  }

  private getFallbackExplanation(item: ExtractedLineItem): LineItemExplanation {
    return {
      lineItemId: item.id,
      plainEnglish: `This charge is for: ${item.description || item.rawText}`,
      whyCharged: 'This service was provided during your visit.',
      medicalContext: 'Contact your provider for specific details about this service.',
      costAnalysis: {
        chargedAmount: item.amount || 0,
        regionalAverage: { low: 0, high: 0, median: 0 },
        medicareRate: 0,
        percentAboveAverage: 0,
        priceVerdict: 'fair'
      },
      redFlags: [],
      negotiationTips: ['Request an itemized bill for more details'],
      disputeRecommendation: undefined
    };
  }

  private getFallbackAnalysis(request: ExplanationRequest): FullBillAnalysis {
    const total = request.lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
    
    return {
      lineItemExplanations: request.lineItems.map(item => this.getFallbackExplanation(item)),
      adjustmentExplanations: (request.adjustments || []).map(adj => ({
        code: adj.code,
        name: adj.name,
        amount: adj.amount,
        explanation: 'This is an adjustment to your bill.',
        isGood: adj.amount < 0,
        actionRequired: false
      })),
      summary: {
        totalCharged: total,
        totalAdjustments: 0,
        totalOwed: request.context?.totalOwed || total,
        overallAssessment: 'Unable to perform detailed analysis. Please review each charge carefully.',
        potentialSavings: { low: 0, high: total * 0.2 },
        urgencyLevel: 'medium',
        urgencyReason: 'Review your bill and contact billing with questions.',
        topPriorities: [{
          action: 'Request itemized bill',
          reason: 'Get detailed breakdown of all charges',
          potentialSavings: 0
        }],
        financialAssistance: {
          likelyEligible: request.context?.insuranceStatus === 'uninsured',
          programs: ['Hospital financial assistance', 'Payment plans'],
          howToApply: ['Call the billing department', 'Ask about charity care programs']
        },
        negotiationStrategy: {
          overallApproach: 'Start by requesting an itemized bill and asking about discounts.',
          keyPoints: ['Ask about self-pay discounts', 'Inquire about payment plans'],
          whatToSay: 'I received my bill and would like to discuss payment options.',
          whatNotToSay: 'Avoid agreeing to pay the full amount immediately.'
        }
      },
      rawAnalysis: ''
    };
  }
}

export const claudeService = new ClaudeService();
