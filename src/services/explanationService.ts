/**
 * Explanation Service
 * Handles AI-powered explanations for medical bill line items
 */

import { ExtractedLineItem } from './api';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

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

// Rich mock explanations for demo mode
const mockExplanations: Record<string, LineItemExplanation> = {
  '99213': {
    lineItemId: '',
    plainEnglish: `This is a standard office visit for an established patient. Your doctor spent about 15-30 minutes with you discussing your symptoms, examining you, and deciding on treatment. The "Level 3" means it was moderately complex - not just a quick check-up, but not a complicated case either.`,
    medicalContext: `Office visits are coded by complexity levels 1-5. Level 3 (99213) is the most common code, used when your visit involves reviewing your history, a focused exam, and straightforward medical decision-making.`,
    costAnalysis: `The typical cost for this visit ranges from $100-$150 at most practices. Your charge of $185 is on the higher end, which is common for hospital-based clinics that add facility fees. This is within normal range but worth noting.`,
    disputeRecommendation: undefined
  },
  '36415': {
    lineItemId: '',
    plainEnglish: `This is the charge for drawing your blood. A trained phlebotomist inserted a needle into your vein to collect blood samples for testing. It's a quick, routine procedure that takes just a few minutes.`,
    medicalContext: `Venipuncture is the medical term for drawing blood from a vein. This is separate from the actual lab tests - you're paying for the skill and supplies needed to collect the blood safely.`,
    costAnalysis: `Blood draws typically cost $20-$40. Your charge of $45 is slightly above average but reasonable. This is a standard charge and not worth disputing.`,
    disputeRecommendation: undefined
  },
  '80053': {
    lineItemId: '',
    plainEnglish: `This is a Comprehensive Metabolic Panel - a blood test that checks 14 different things at once. It looks at your blood sugar, kidney function, liver function, and electrolyte levels. Think of it as a "general health snapshot" from your blood.`,
    medicalContext: `The CMP is one of the most commonly ordered lab panels. It helps doctors screen for diabetes, kidney disease, liver problems, and electrolyte imbalances. It's often part of routine checkups or when investigating symptoms.`,
    costAnalysis: `This panel typically costs $100-$200 at most labs. Your charge of $287 is significantly above average. Hospital labs often charge 2-3x more than independent labs for the same test.`,
    disputeRecommendation: {
      shouldDispute: true,
      reason: 'This charge is 40-90% higher than typical costs for this standard lab panel.',
      talkingPoints: [
        'Ask for an itemized bill showing the lab costs separately',
        'Request a price match to Medicare rates (typically around $14 for this panel)',
        'Ask if you can get future labs done at an independent lab for lower cost',
        'Request a discount for paying in full or setting up a payment plan'
      ]
    }
  },
  '85025': {
    lineItemId: '',
    plainEnglish: `This is a Complete Blood Count (CBC) - it measures your red blood cells, white blood cells, and platelets. It helps detect infections, anemia, and many other conditions. It's one of the most common blood tests ordered.`,
    medicalContext: `A CBC with differential breaks down your white blood cells into different types, which helps identify specific infections or blood disorders. It's a fundamental diagnostic tool used in almost every medical setting.`,
    costAnalysis: `A CBC typically costs $50-$100. Your charge of $156 is above the typical range. Like other lab tests, hospital pricing tends to be higher than independent labs.`,
    disputeRecommendation: {
      shouldDispute: true,
      reason: 'This charge is 50-200% higher than typical costs.',
      talkingPoints: [
        'Compare this to independent lab pricing (often $30-50)',
        'Ask about financial assistance programs',
        'Request an itemized breakdown of all lab charges'
      ]
    }
  },
  '81001': {
    lineItemId: '',
    plainEnglish: `This is a urinalysis - a test of your urine using a dipstick. It checks for signs of infection, kidney problems, diabetes, and other conditions. It's quick, non-invasive, and provides a lot of useful information.`,
    medicalContext: `Urinalysis is often done as part of routine checkups or when you have symptoms like painful urination. The dipstick method tests for things like blood, protein, glucose, and bacteria in your urine.`,
    costAnalysis: `A basic urinalysis typically costs $30-$50. Your charge of $78 is moderately above average but not unusual for hospital settings.`,
    disputeRecommendation: undefined
  },
  'facility': {
    lineItemId: '',
    plainEnglish: `This is a facility fee - essentially a charge for using the hospital's building, equipment, and support staff. It covers overhead costs like maintaining the facility, equipment, and having staff available. Many patients are surprised by this charge because it's separate from what your doctor charges.`,
    medicalContext: `Hospital-based clinics charge facility fees because they have higher overhead than independent practices. This fee exists even for simple visits because you're technically receiving care in a hospital outpatient department.`,
    costAnalysis: `Facility fees vary wildly - from $100 to $500+ depending on the hospital and location. Your charge of $425 is on the higher end. These fees are often the most negotiable part of a hospital bill.`,
    disputeRecommendation: {
      shouldDispute: true,
      reason: 'Facility fees are often negotiable and may be reduced or waived.',
      talkingPoints: [
        'Ask why a facility fee was charged for an outpatient visit',
        'Request a reduction based on financial hardship',
        'Ask if the visit could have been coded as a non-facility visit',
        'Inquire about charity care or financial assistance programs',
        'For future visits, ask if there\'s a non-hospital clinic option'
      ]
    }
  }
};

const defaultExplanation: Omit<LineItemExplanation, 'lineItemId'> = {
  plainEnglish: `This appears to be a medical service or administrative charge. The specific details depend on what service was provided during your visit.`,
  medicalContext: `Medical billing codes can be complex. If you're unsure what this charge is for, don't hesitate to call the billing department and ask for a detailed explanation.`,
  costAnalysis: `Without knowing the specific service, it's hard to say if this price is typical. You can always ask for an itemized bill and compare prices with other providers in your area.`,
  disputeRecommendation: undefined
};

/**
 * Simulate API delay for realistic demo experience
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get explanation for a single line item
 */
export async function getExplanation(
  item: ExtractedLineItem,
  context?: { provider?: string; serviceDate?: string }
): Promise<LineItemExplanation> {
  // If we have a real API, use it
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/explain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineItem: item, context })
      });

      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.warn('API unavailable, using mock data:', error);
    }
  }

  // Fall back to mock explanations for demo
  await delay(800 + Math.random() * 1200); // Simulate API latency

  // Find matching explanation
  let explanation: LineItemExplanation;
  
  if (item.code && mockExplanations[item.code]) {
    explanation = { ...mockExplanations[item.code], lineItemId: item.id };
  } else if (item.description?.toLowerCase().includes('facility')) {
    explanation = { ...mockExplanations['facility'], lineItemId: item.id };
  } else {
    explanation = { ...defaultExplanation, lineItemId: item.id };
  }

  // Add duplicate warning if applicable
  if (item.isDuplicate) {
    explanation.disputeRecommendation = {
      shouldDispute: true,
      reason: '⚠️ This appears to be a DUPLICATE CHARGE! The same service was billed twice.',
      talkingPoints: [
        'Point out that this exact charge appears twice on your bill',
        'Request immediate removal of the duplicate',
        'Ask for a corrected bill in writing',
        'If they refuse, file a complaint with your state insurance commissioner'
      ]
    };
    explanation.costAnalysis = `🚨 DUPLICATE DETECTED: This charge of $${item.amount?.toFixed(2)} appears to be billed twice. You should NOT pay for the same service twice. This is a billing error that must be corrected.`;
  }

  return explanation;
}

/**
 * Get explanations for multiple line items with progress callback
 */
export async function getExplanationsBatch(
  items: ExtractedLineItem[],
  context?: { provider?: string; serviceDate?: string },
  onProgress?: (completed: number, total: number) => void
): Promise<Map<string, LineItemExplanation>> {
  const explanations = new Map<string, LineItemExplanation>();
  
  for (let i = 0; i < items.length; i++) {
    const explanation = await getExplanation(items[i], context);
    explanations.set(items[i].id, explanation);
    onProgress?.(i + 1, items.length);
  }

  return explanations;
}

/**
 * Format explanation for display
 */
export function formatExplanationText(explanation: LineItemExplanation): string {
  let text = explanation.plainEnglish;
  
  if (explanation.medicalContext) {
    text += `\n\n📋 Medical Context: ${explanation.medicalContext}`;
  }
  
  if (explanation.costAnalysis) {
    text += `\n\n💰 Cost Analysis: ${explanation.costAnalysis}`;
  }
  
  if (explanation.disputeRecommendation?.shouldDispute) {
    text += `\n\n⚠️ Consider Disputing: ${explanation.disputeRecommendation.reason}`;
    if (explanation.disputeRecommendation.talkingPoints.length > 0) {
      text += '\n\nTalking Points:\n' + 
        explanation.disputeRecommendation.talkingPoints.map(p => `• ${p}`).join('\n');
    }
  }
  
  return text;
}

export default {
  getExplanation,
  getExplanationsBatch,
  formatExplanationText
};
