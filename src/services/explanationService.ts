/**
 * Enhanced Explanation Service
 * Handles AI-powered deep analysis of medical bills
 */

import { ExtractedLineItem } from './api';
import { analyzeBill, formatCurrency, adjustmentCodeLibrary } from './costComparisonService';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

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

export interface FullBillAnalysis {
  lineItemExplanations: LineItemExplanation[];
  adjustmentExplanations: AdjustmentExplanation[];
  summary: BillSummary;
}

export interface AnalysisContext {
  provider?: string;
  providerSystem?: string;
  serviceDate?: string;
  region?: string;
  state?: string;
  insuranceStatus?: 'insured' | 'uninsured' | 'underinsured' | 'unknown';
  totalBilled?: number;
  totalOwed?: number;
  visitType?: 'er' | 'inpatient' | 'outpatient' | 'office' | 'unknown';
  daysInHospital?: number;
}

// Enhanced mock explanations with deep medical billing knowledge
const medicalKnowledgeBase: Record<string, Partial<LineItemExplanation>> = {
  // ER Visits
  '99284': {
    plainEnglish: 'This is the physician\'s fee for evaluating and treating you in the Emergency Room. Level 4 means your case was considered "high complexity" - you had multiple symptoms, needed diagnostic tests, and required significant medical decision-making.',
    whyCharged: 'Every ER visit includes a physician evaluation fee. The level (1-5) is based on how complex your case was. Level 4 is common for patients who need tests like CT scans, labs, or have concerning symptoms.',
    medicalContext: 'ER visits are coded by complexity. Level 4 (99284) involves detailed history, comprehensive exam, and moderate complexity decision-making. It\'s appropriate for conditions like chest pain, abdominal pain, or injuries requiring imaging.',
  },
  '99285': {
    plainEnglish: 'This is the highest-level ER physician fee, reserved for life-threatening or highly complex emergencies. Your condition required immediate, intensive evaluation and treatment.',
    whyCharged: 'Level 5 ER visits are for critical situations - severe trauma, heart attacks, strokes, or conditions requiring immediate intervention to prevent death or serious harm.',
    medicalContext: 'Code 99285 requires comprehensive history and exam with high complexity medical decision-making. Often involves multiple organ systems or life-threatening conditions.',
  },
  // Room & Board
  'ROOM_SEMI': {
    plainEnglish: 'This is the daily charge for your hospital room and basic nursing care. "Semi-private" means a room that could be shared with another patient (even if you were alone). It covers the bed, meals, housekeeping, and 24/7 nursing availability.',
    whyCharged: 'Hospitals charge a daily rate for inpatient stays. This covers the physical room, utilities, meals, linens, basic supplies, and the nursing staff who monitor you around the clock.',
    medicalContext: 'Room & Board is separate from all other charges. You\'ll also see separate charges for medications, procedures, labs, and physician visits. This is just for the "hotel" portion of your stay.',
    negotiationTips: [
      'Room & Board is one of the MOST negotiable charges',
      'Ask for 30-50% reduction, especially if uninsured',
      'If you were in a private room but didn\'t request it, ask to be charged semi-private rate',
      'Request financial assistance - this charge is often reduced first'
    ]
  },
  'ROOM_ICU': {
    plainEnglish: 'This is the daily charge for the Intensive Care Unit. ICU rooms have specialized monitoring equipment, higher nurse-to-patient ratios (often 1:1 or 1:2), and immediate access to life-saving interventions.',
    whyCharged: 'ICU care is significantly more expensive because you\'re receiving constant monitoring, specialized equipment, and dedicated nursing care. ICU nurses manage fewer patients to provide intensive attention.',
    medicalContext: 'ICU admission is reserved for patients who need continuous monitoring or are at risk of rapid deterioration. Common reasons include post-surgery recovery, respiratory failure, heart problems, or severe infections.',
  },
  // IV Therapy
  'IV_THERAPY': {
    plainEnglish: 'This charge covers IV (intravenous) fluids and/or medications given through a needle in your vein. It includes the supplies, nursing time to start and monitor the IV, and the fluids themselves.',
    whyCharged: 'IVs are used when you need fluids, medications, or nutrients delivered directly into your bloodstream for faster effect or because you can\'t take them by mouth.',
    medicalContext: 'IV therapy is standard for most hospital admissions and ER visits. It ensures you stay hydrated and allows quick administration of medications.',
    negotiationTips: [
      'Check if this is bundled with Room & Board - sometimes it\'s double-charged',
      'Ask for itemization of what was actually given via IV'
    ]
  },
  // Imaging
  '70553': {
    plainEnglish: 'This is an MRI (Magnetic Resonance Imaging) of your brain with contrast dye. The MRI uses powerful magnets to create detailed pictures of your brain. The contrast dye helps highlight blood vessels and certain abnormalities.',
    whyCharged: 'Brain MRIs are ordered when doctors need to see detailed images of brain tissue - to check for tumors, strokes, bleeding, infections, or other abnormalities that CT scans might miss.',
    medicalContext: 'MRI provides better soft tissue detail than CT scans and doesn\'t use radiation. The contrast dye (gadolinium) is injected through an IV and helps certain structures show up more clearly.',
    negotiationTips: [
      'Hospital MRIs often cost 2-3x more than independent imaging centers',
      'For future reference, ask if the MRI can be done at an outpatient facility',
      'Request a cash-pay discount - imaging is highly negotiable'
    ]
  },
  '74177': {
    plainEnglish: 'This is a CT scan of your abdomen and pelvis with contrast dye. CT scans use X-rays to create cross-sectional images of your body. The contrast helps organs and blood vessels show up more clearly.',
    whyCharged: 'Abdominal CT scans are commonly ordered for abdominal pain, to check for appendicitis, kidney stones, internal bleeding, infections, or other problems in your digestive and urinary systems.',
    medicalContext: 'CT scans are faster than MRIs and excellent for seeing bones, bleeding, and many abdominal conditions. The contrast dye is usually given through an IV and sometimes orally.',
  },
  '71250': {
    plainEnglish: 'This is a CT scan of your chest without contrast dye. It creates detailed cross-sectional images of your lungs, heart, and chest structures.',
    whyCharged: 'Chest CTs are ordered to look for pneumonia, blood clots in the lungs (pulmonary embolism), lung nodules, or other chest abnormalities.',
    medicalContext: 'Non-contrast chest CT is often used for lung screening or when contrast isn\'t needed or is contraindicated (kidney problems, allergies).',
  },
  // Labs
  '80053': {
    plainEnglish: 'This is a Comprehensive Metabolic Panel (CMP) - a blood test that checks 14 different things at once. It measures your blood sugar, kidney function (creatinine, BUN), liver function (ALT, AST), and electrolytes (sodium, potassium, etc.).',
    whyCharged: 'The CMP is one of the most commonly ordered lab panels. It gives doctors a quick snapshot of your overall health and helps detect diabetes, kidney disease, liver problems, and electrolyte imbalances.',
    medicalContext: 'This panel is often ordered for routine checkups, hospital admissions, or when investigating symptoms. It\'s a cost-effective way to check multiple organ systems at once.',
    negotiationTips: [
      'Hospital labs typically charge 5-10x more than independent labs like Quest or LabCorp',
      'Medicare pays only about $14 for this test',
      'For future labs, ask if you can use an independent lab'
    ]
  },
  '85025': {
    plainEnglish: 'This is a Complete Blood Count (CBC) with differential. It measures your red blood cells (carry oxygen), white blood cells (fight infection), and platelets (help clotting). The "differential" breaks down the types of white blood cells.',
    whyCharged: 'CBCs are ordered to check for anemia, infections, blood disorders, and many other conditions. It\'s one of the most common blood tests.',
    medicalContext: 'The CBC helps diagnose conditions from simple infections to leukemia. Changes in blood cell counts can indicate many different health issues.',
  },
  '36415': {
    plainEnglish: 'This is the charge for drawing your blood (venipuncture). A phlebotomist or nurse inserted a needle into your vein to collect blood samples for testing.',
    whyCharged: 'This is a separate charge from the actual lab tests. You\'re paying for the skill, supplies (needle, tubes, bandage), and time to safely collect your blood.',
    medicalContext: 'Venipuncture is a routine procedure. The charge is the same whether they draw one tube or ten - it\'s for the blood draw itself, not the tests.',
    negotiationTips: [
      'This charge is often inflated at hospitals',
      'Medicare pays only about $3 for this service'
    ]
  },
  // Facility Fees
  'ER_FACILITY': {
    plainEnglish: 'This is the Emergency Room facility fee - essentially a charge for using the ER\'s building, equipment, and support staff. It\'s SEPARATE from what the doctor charges. Think of it as the "cover charge" for walking into the ER.',
    whyCharged: 'ERs have enormous overhead: 24/7 staffing, specialized equipment, trauma bays, and the requirement to treat everyone regardless of ability to pay. This fee helps cover those costs.',
    medicalContext: 'You\'ll see both a facility fee (goes to the hospital) and a physician fee (goes to the doctor). This is called "split billing" and is standard in hospital settings.',
    negotiationTips: [
      'Facility fees are often the MOST negotiable part of an ER bill',
      'Ask for a self-pay discount of 40-60%',
      'If your visit was minor, ask if it could be recoded as urgent care level',
      'Request financial assistance - hospitals must provide this to maintain non-profit status'
    ]
  },
  // Pharmacy
  'PHARMACY': {
    plainEnglish: 'This covers medications given to you during your hospital stay or ER visit. Hospital pharmacies charge significantly more than retail pharmacies for the same drugs.',
    whyCharged: 'Hospitals mark up medications substantially - often 5-10x the retail cost. This covers their pharmacy operations, 24/7 availability, and the nursing time to administer medications.',
    medicalContext: 'Hospital pharmacy charges include both the drug cost and administration. IV medications cost more than pills because they require more preparation and monitoring.',
    negotiationTips: [
      'Request an itemized list of every medication charged',
      'Compare prices to GoodRx or retail pharmacies',
      'Ask if any medications were given that you didn\'t actually need',
      'Hospital Tylenol can cost $15-30 per pill - this is a known issue'
    ]
  },
  // Pulmonary
  'PULM_FUNC': {
    plainEnglish: 'This is a pulmonary function test - you breathed into a machine that measured how well your lungs work. It checks how much air you can inhale/exhale and how efficiently oxygen moves into your blood.',
    whyCharged: 'These tests are ordered to diagnose or monitor lung conditions like asthma, COPD, or to check lung function before surgery.',
    medicalContext: 'Pulmonary function tests (PFTs) are non-invasive and help doctors understand your breathing capacity and identify lung diseases.',
  }
};


/**
 * Simulate API delay for realistic demo experience
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Try to match item to knowledge base by code or description
 */
function findKnowledgeBaseMatch(item: ExtractedLineItem): Partial<LineItemExplanation> | null {
  // Direct code match
  if (item.code && medicalKnowledgeBase[item.code]) {
    return medicalKnowledgeBase[item.code];
  }

  const desc = (item.description || item.rawText || '').toLowerCase();

  // Pattern matching for common charges
  if (desc.includes('room') && desc.includes('board')) {
    if (desc.includes('icu') || desc.includes('intensive')) return medicalKnowledgeBase['ROOM_ICU'];
    return medicalKnowledgeBase['ROOM_SEMI'];
  }
  if (desc.includes('emergency') && desc.includes('facility')) return medicalKnowledgeBase['ER_FACILITY'];
  if (desc.includes('iv ') || desc.includes('infusion')) return medicalKnowledgeBase['IV_THERAPY'];
  if (desc.includes('pharmacy') || desc.includes('medication')) return medicalKnowledgeBase['PHARMACY'];
  if (desc.includes('pulmonary') || desc.includes('lung function')) return medicalKnowledgeBase['PULM_FUNC'];
  if (desc.includes('mri') && desc.includes('brain')) return medicalKnowledgeBase['70553'];
  if (desc.includes('ct ') && desc.includes('abdomen')) return medicalKnowledgeBase['74177'];
  if (desc.includes('metabolic panel')) return medicalKnowledgeBase['80053'];
  if (desc.includes('blood count') || desc.includes('cbc')) return medicalKnowledgeBase['85025'];
  if (desc.includes('blood draw') || desc.includes('venipuncture')) return medicalKnowledgeBase['36415'];

  return null;
}

/**
 * Generate explanation for a single line item
 */
export async function getExplanation(
  item: ExtractedLineItem,
  context?: AnalysisContext
): Promise<LineItemExplanation> {
  // Try real API first
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
      console.warn('API unavailable, using local analysis:', error);
    }
  }

  // Fall back to local analysis
  await delay(500 + Math.random() * 800);

  // Get cost comparison data
  const costAnalysis = analyzeBill([item], { state: context?.state });
  const comparison = costAnalysis.comparisons[0];
  const disputes = costAnalysis.disputes;

  // Get knowledge base info
  const knowledge = findKnowledgeBaseMatch(item);

  // Build explanation
  const explanation: LineItemExplanation = {
    lineItemId: item.id,
    plainEnglish: knowledge?.plainEnglish || `This charge is for: ${item.description || item.rawText}. Contact billing for specific details about this service.`,
    whyCharged: knowledge?.whyCharged || 'This service was provided during your visit.',
    medicalContext: knowledge?.medicalContext || 'This is a medical service. Request an itemized bill for more details.',
    costAnalysis: {
      chargedAmount: item.amount || 0,
      regionalAverage: comparison?.regionalAverage || { low: 0, high: 0, median: 0 },
      medicareRate: comparison?.medicareRate || 0,
      percentAboveAverage: comparison?.percentAboveMedian || 0,
      priceVerdict: comparison?.priceRating || 'fair'
    },
    redFlags: comparison?.commonIssues || [],
    negotiationTips: knowledge?.negotiationTips || ['Request an itemized bill', 'Ask about self-pay discounts'],
    disputeRecommendation: undefined
  };

  // Add dispute recommendation if applicable
  const itemDispute = disputes.find(d => d.lineItemId === item.id);
  if (itemDispute) {
    explanation.disputeRecommendation = {
      shouldDispute: true,
      reason: itemDispute.reason,
      talkingPoints: itemDispute.talkingPoints,
      sampleScript: itemDispute.sampleScript
    };
    explanation.redFlags = [...explanation.redFlags, itemDispute.reason];
  }

  // Add duplicate warning
  if (item.isDuplicate) {
    explanation.disputeRecommendation = {
      shouldDispute: true,
      reason: '⚠️ DUPLICATE CHARGE DETECTED! This exact charge appears multiple times on your bill.',
      talkingPoints: [
        'This charge appears more than once',
        'You should only pay for this service once',
        'Request immediate removal of the duplicate'
      ],
      sampleScript: `I noticed the charge for ${item.description || 'this service'} appears multiple times on my bill. This appears to be a duplicate charge. Can you please review and remove the duplicate?`
    };
    explanation.redFlags = ['🚨 DUPLICATE CHARGE - Do not pay twice for the same service'];
  }

  return explanation;
}


/**
 * Perform full bill analysis with all explanations and summary
 */
export async function analyzeFullBill(
  items: ExtractedLineItem[],
  context?: AnalysisContext,
  adjustments?: Array<{ code?: string; name: string; amount: number }>,
  onProgress?: (completed: number, total: number, stage: string) => void
): Promise<FullBillAnalysis> {
  // Try real API first
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineItems: items, adjustments, context })
      });

      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.warn('API unavailable, using local analysis:', error);
    }
  }

  // Local analysis
  onProgress?.(0, items.length + 2, 'Analyzing charges...');

  // Get explanations for all items
  const lineItemExplanations: LineItemExplanation[] = [];
  for (let i = 0; i < items.length; i++) {
    const explanation = await getExplanation(items[i], context);
    lineItemExplanations.push(explanation);
    onProgress?.(i + 1, items.length + 2, `Analyzed ${i + 1} of ${items.length} charges`);
  }

  // Analyze adjustments
  onProgress?.(items.length, items.length + 2, 'Analyzing adjustments...');
  const adjustmentExplanations: AdjustmentExplanation[] = (adjustments || []).map(adj => {
    const normalizedName = adj.name.toLowerCase();
    
    // Match to known adjustment types
    if (normalizedName.includes('self-pay') || normalizedName.includes('uninsured')) {
      return {
        code: adj.code || 'SELF_PAY',
        name: adj.name,
        amount: adj.amount,
        explanation: adjustmentCodeLibrary['SELF_PAY_DISCOUNT'].explanation,
        isGood: true,
        actionRequired: false
      };
    }
    if (normalizedName.includes('mue') || normalizedName.includes('medically unlikely')) {
      return {
        code: adj.code || 'MUE',
        name: adj.name,
        amount: adj.amount,
        explanation: adjustmentCodeLibrary['MUE_WRITEOFF'].explanation,
        isGood: true,
        actionRequired: true,
        actionDetails: adjustmentCodeLibrary['MUE_WRITEOFF'].actionDetails
      };
    }
    
    // Default
    return {
      code: adj.code || 'ADJ',
      name: adj.name,
      amount: adj.amount,
      explanation: 'This adjustment reduced your bill. Contact billing for specific details.',
      isGood: adj.amount < 0,
      actionRequired: false
    };
  });

  // Generate summary
  onProgress?.(items.length + 1, items.length + 2, 'Generating recommendations...');
  await delay(500);

  const billAnalysis = analyzeBill(items, {
    state: context?.state,
    adjustments,
    serviceDate: context?.serviceDate,
    totalOwed: context?.totalOwed,
    insuranceStatus: context?.insuranceStatus
  });

  const totalCharged = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalAdjustments = (adjustments || []).reduce((sum, adj) => sum + Math.abs(adj.amount), 0);
  const totalOwed = context?.totalOwed ?? (totalCharged - totalAdjustments);

  // Build priorities
  const topPriorities: BillSummary['topPriorities'] = [];
  
  // Add dispute priorities
  const criticalDisputes = billAnalysis.disputes.filter(d => d.severity === 'critical' || d.severity === 'high');
  for (const dispute of criticalDisputes.slice(0, 3)) {
    topPriorities.push({
      action: dispute.type === 'duplicate' ? 'Remove duplicate charge' : `Dispute ${dispute.type}`,
      reason: dispute.reason,
      potentialSavings: dispute.potentialSavings
    });
  }

  // Add financial assistance if uninsured
  if (context?.insuranceStatus === 'uninsured' && totalOwed > 1000) {
    topPriorities.push({
      action: 'Apply for financial assistance',
      reason: 'As an uninsured patient with a significant balance, you likely qualify for charity care or reduced rates.',
      potentialSavings: totalOwed * 0.5
    });
  }

  // Add negotiation priority for high bills
  if (totalOwed > 5000) {
    topPriorities.push({
      action: 'Negotiate overall bill reduction',
      reason: 'Bills over $5,000 often have room for negotiation, especially Room & Board and facility fees.',
      potentialSavings: totalOwed * 0.25
    });
  }

  const summary: BillSummary = {
    totalCharged,
    totalAdjustments,
    totalOwed,
    overallAssessment: generateOverallAssessment(billAnalysis, context),
    potentialSavings: billAnalysis.potentialSavings,
    urgencyLevel: billAnalysis.urgencyLevel,
    urgencyReason: billAnalysis.urgencyReason,
    topPriorities,
    financialAssistance: {
      likelyEligible: context?.insuranceStatus === 'uninsured' || totalOwed > 5000,
      programs: [
        'Hospital charity care / financial assistance',
        'Payment plans (often 0% interest)',
        'State medical assistance programs',
        'Non-profit patient advocacy organizations'
      ],
      howToApply: [
        `Call ${context?.provider || 'the hospital'} billing department`,
        'Ask specifically for "financial assistance" or "charity care" application',
        'Gather income documentation (pay stubs, tax returns)',
        'Submit application - decisions usually take 2-4 weeks',
        'If denied, appeal with additional documentation'
      ],
      incomeThresholds: 'Most hospitals offer assistance for incomes up to 200-400% of federal poverty level'
    },
    negotiationStrategy: {
      overallApproach: generateNegotiationApproach(billAnalysis, context),
      keyPoints: generateKeyPoints(billAnalysis, context),
      whatToSay: generateWhatToSay(billAnalysis, context),
      whatNotToSay: 'Don\'t agree to pay the full amount immediately. Don\'t say you "can\'t afford it" - instead say you\'re "seeking a fair price." Don\'t ignore the bill - this leads to collections.'
    }
  };

  onProgress?.(items.length + 2, items.length + 2, 'Analysis complete!');

  return {
    lineItemExplanations,
    adjustmentExplanations,
    summary
  };
}


function generateOverallAssessment(
  analysis: ReturnType<typeof analyzeBill>,
  context?: AnalysisContext
): string {
  const { totalOwed, potentialSavings, overallRating, disputes } = analysis;
  const criticalCount = disputes.filter(d => d.severity === 'critical').length;
  const highCount = disputes.filter(d => d.severity === 'high').length;

  let assessment = '';

  if (overallRating === 'egregious') {
    assessment = `🚨 This bill has serious issues that need immediate attention. `;
  } else if (overallRating === 'concerning') {
    assessment = `⚠️ This bill has several charges worth questioning. `;
  } else if (overallRating === 'questionable') {
    assessment = `This bill has some charges above typical rates. `;
  } else {
    assessment = `This bill appears to be within normal ranges. `;
  }

  if (criticalCount > 0) {
    assessment += `We found ${criticalCount} critical issue(s) including potential duplicates or extreme overcharges. `;
  }

  if (potentialSavings.high > 0) {
    assessment += `You could potentially save ${formatCurrency(potentialSavings.low)} to ${formatCurrency(potentialSavings.high)} by disputing charges and negotiating. `;
  }

  if (context?.insuranceStatus === 'uninsured') {
    assessment += `As an uninsured patient, you have strong negotiating power - hospitals expect to discount self-pay bills significantly.`;
  }

  return assessment;
}

function generateNegotiationApproach(
  analysis: ReturnType<typeof analyzeBill>,
  context?: AnalysisContext
): string {
  if (context?.insuranceStatus === 'uninsured') {
    return 'Lead with financial assistance application. Hospitals are required to offer charity care and typically discount uninsured bills by 40-70%. Apply for assistance FIRST, then negotiate any remaining balance.';
  }

  if (analysis.overallRating === 'egregious' || analysis.overallRating === 'concerning') {
    return 'Request a detailed itemized bill and billing audit. Point out specific overcharges and duplicates. Ask to speak with a supervisor or patient advocate if the first representative can\'t help.';
  }

  return 'Start by asking about available discounts for prompt payment or self-pay. Request a payment plan if needed. Be polite but persistent - billing departments have flexibility.';
}

function generateKeyPoints(
  analysis: ReturnType<typeof analyzeBill>,
  context?: AnalysisContext
): string[] {
  const points: string[] = [];

  if (analysis.duplicates.length > 0) {
    points.push(`You have ${analysis.duplicates.length} potential duplicate charge(s) - these should be removed immediately`);
  }

  const extremeCharges = analysis.comparisons.filter(c => c.priceRating === 'extreme' || c.priceRating === 'very-high');
  if (extremeCharges.length > 0) {
    points.push(`${extremeCharges.length} charge(s) are significantly above regional averages`);
  }

  if (context?.insuranceStatus === 'uninsured') {
    points.push('As an uninsured patient, you should receive at minimum a 40% self-pay discount');
    points.push('You likely qualify for financial assistance / charity care');
  }

  const mueAdjustment = analysis.adjustmentAnalysis.find(a => a.code === 'MUE' || a.name.toLowerCase().includes('mue'));
  if (mueAdjustment) {
    points.push('The MUE write-off indicates billing errors were found - request a full audit for other errors');
  }

  points.push('Room & Board and facility fees are typically the most negotiable charges');
  points.push('Request everything in writing before making any payment');

  return points;
}

function generateWhatToSay(
  analysis: ReturnType<typeof analyzeBill>,
  context?: AnalysisContext
): string {
  if (context?.insuranceStatus === 'uninsured') {
    return `"Hi, I'm calling about my bill for account [number]. I'm currently uninsured and would like to apply for your financial assistance program. I'd also like to request an itemized bill and discuss what discounts are available for self-pay patients. I want to resolve this bill but need to find a payment amount that works for my situation."`;
  }

  if (analysis.duplicates.length > 0) {
    return `"Hi, I'm reviewing my bill and noticed what appears to be duplicate charges. I'd like to request a billing audit and have these reviewed. I also have questions about several charges that seem higher than typical rates. Can you help me understand these charges and discuss any adjustments?"`;
  }

  return `"Hi, I'm calling about my bill. I'd like to request an itemized statement and discuss my payment options. Are there any discounts available for prompt payment or setting up a payment plan? I want to resolve this but some of the charges seem higher than I expected."`;
}

/**
 * Get explanations for multiple line items with progress callback
 */
export async function getExplanationsBatch(
  items: ExtractedLineItem[],
  context?: AnalysisContext,
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
  let text = `📋 ${explanation.plainEnglish}`;
  
  if (explanation.whyCharged) {
    text += `\n\n❓ Why this charge: ${explanation.whyCharged}`;
  }
  
  if (explanation.medicalContext) {
    text += `\n\n🏥 Medical context: ${explanation.medicalContext}`;
  }
  
  if (explanation.costAnalysis.percentAboveAverage > 0) {
    text += `\n\n💰 Cost analysis: Your charge of ${formatCurrency(explanation.costAnalysis.chargedAmount)} is ${explanation.costAnalysis.percentAboveAverage}% above the regional average of ${formatCurrency(explanation.costAnalysis.regionalAverage.median)}.`;
  }
  
  if (explanation.redFlags.length > 0) {
    text += `\n\n🚩 Red flags:\n${explanation.redFlags.map(f => `• ${f}`).join('\n')}`;
  }
  
  if (explanation.disputeRecommendation?.shouldDispute) {
    text += `\n\n⚠️ CONSIDER DISPUTING: ${explanation.disputeRecommendation.reason}`;
    if (explanation.disputeRecommendation.talkingPoints.length > 0) {
      text += '\n\nWhat to say:\n' + 
        explanation.disputeRecommendation.talkingPoints.map(p => `• ${p}`).join('\n');
    }
  }
  
  if (explanation.negotiationTips.length > 0) {
    text += `\n\n💡 Tips:\n${explanation.negotiationTips.map(t => `• ${t}`).join('\n')}`;
  }
  
  return text;
}

export default {
  getExplanation,
  getExplanationsBatch,
  analyzeFullBill,
  formatExplanationText
};
