/**
 * Enhanced Cost Comparison Service
 * Comprehensive medical billing analysis with regional data and negotiation support
 */

import { ExtractedLineItem } from './api';

// Expanded medical code database with regional variations
interface CostData {
  code: string;
  description: string;
  category: 'office-visit' | 'lab' | 'imaging' | 'procedure' | 'facility' | 'er' | 'inpatient' | 'pharmacy' | 'therapy' | 'other';
  nationalAvg: number;
  medicareRate: number;
  // Regional multipliers (1.0 = national average)
  regionalMultipliers: Record<string, number>;
  negotiability: 'low' | 'medium' | 'high';
  commonIssues: string[];
}

// Comprehensive medical cost database
const medicalCostDatabase: Record<string, CostData> = {
  // Emergency Department Visits
  '99281': { code: '99281', description: 'ER Visit - Level 1 (Minor)', category: 'er', nationalAvg: 250, medicareRate: 45, regionalMultipliers: { midwest: 0.9, northeast: 1.3, west: 1.2, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
  '99282': { code: '99282', description: 'ER Visit - Level 2 (Low)', category: 'er', nationalAvg: 450, medicareRate: 75, regionalMultipliers: { midwest: 0.9, northeast: 1.3, west: 1.2, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
  '99283': { code: '99283', description: 'ER Visit - Level 3 (Moderate)', category: 'er', nationalAvg: 750, medicareRate: 120, regionalMultipliers: { midwest: 0.9, northeast: 1.3, west: 1.2, south: 0.85 }, negotiability: 'medium', commonIssues: ['Often upcoded from Level 2'] },
  '99284': { code: '99284', description: 'ER Visit - Level 4 (High)', category: 'er', nationalAvg: 1200, medicareRate: 195, regionalMultipliers: { midwest: 0.9, northeast: 1.3, west: 1.2, south: 0.85 }, negotiability: 'medium', commonIssues: ['Frequently upcoded', 'Verify complexity matched visit'] },
  '99285': { code: '99285', description: 'ER Visit - Level 5 (Critical)', category: 'er', nationalAvg: 1800, medicareRate: 290, regionalMultipliers: { midwest: 0.9, northeast: 1.3, west: 1.2, south: 0.85 }, negotiability: 'low', commonIssues: ['Reserved for life-threatening conditions'] },
  
  // Office Visits (E/M Codes)
  '99211': { code: '99211', description: 'Office Visit - Level 1 (Minimal)', category: 'office-visit', nationalAvg: 45, medicareRate: 23, regionalMultipliers: { midwest: 0.9, northeast: 1.2, west: 1.15, south: 0.85 }, negotiability: 'low', commonIssues: [] },
  '99212': { code: '99212', description: 'Office Visit - Level 2', category: 'office-visit', nationalAvg: 85, medicareRate: 46, regionalMultipliers: { midwest: 0.9, northeast: 1.2, west: 1.15, south: 0.85 }, negotiability: 'low', commonIssues: [] },
  '99213': { code: '99213', description: 'Office Visit - Level 3', category: 'office-visit', nationalAvg: 130, medicareRate: 76, regionalMultipliers: { midwest: 0.9, northeast: 1.2, west: 1.15, south: 0.85 }, negotiability: 'low', commonIssues: [] },
  '99214': { code: '99214', description: 'Office Visit - Level 4', category: 'office-visit', nationalAvg: 195, medicareRate: 111, regionalMultipliers: { midwest: 0.9, northeast: 1.2, west: 1.15, south: 0.85 }, negotiability: 'low', commonIssues: ['Verify visit complexity'] },
  '99215': { code: '99215', description: 'Office Visit - Level 5', category: 'office-visit', nationalAvg: 265, medicareRate: 150, regionalMultipliers: { midwest: 0.9, northeast: 1.2, west: 1.15, south: 0.85 }, negotiability: 'low', commonIssues: ['High complexity required'] },

  // Lab Tests
  '36415': { code: '36415', description: 'Blood Draw (Venipuncture)', category: 'lab', nationalAvg: 30, medicareRate: 3, regionalMultipliers: { midwest: 0.9, northeast: 1.1, west: 1.1, south: 0.9 }, negotiability: 'medium', commonIssues: ['Often overpriced at hospitals'] },
  '80053': { code: '80053', description: 'Comprehensive Metabolic Panel', category: 'lab', nationalAvg: 150, medicareRate: 14, regionalMultipliers: { midwest: 0.85, northeast: 1.2, west: 1.15, south: 0.8 }, negotiability: 'high', commonIssues: ['Hospital labs charge 5-10x independent labs'] },
  '85025': { code: '85025', description: 'Complete Blood Count (CBC)', category: 'lab', nationalAvg: 75, medicareRate: 11, regionalMultipliers: { midwest: 0.85, northeast: 1.2, west: 1.15, south: 0.8 }, negotiability: 'high', commonIssues: ['Compare to Quest/LabCorp pricing'] },
  '81001': { code: '81001', description: 'Urinalysis with Microscopy', category: 'lab', nationalAvg: 45, medicareRate: 4, regionalMultipliers: { midwest: 0.9, northeast: 1.1, west: 1.1, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
  '84443': { code: '84443', description: 'TSH (Thyroid Test)', category: 'lab', nationalAvg: 85, medicareRate: 23, regionalMultipliers: { midwest: 0.9, northeast: 1.15, west: 1.1, south: 0.85 }, negotiability: 'high', commonIssues: [] },
  '82947': { code: '82947', description: 'Glucose Test', category: 'lab', nationalAvg: 35, medicareRate: 5, regionalMultipliers: { midwest: 0.9, northeast: 1.1, west: 1.1, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
  '82306': { code: '82306', description: 'Vitamin D Test', category: 'lab', nationalAvg: 120, medicareRate: 40, regionalMultipliers: { midwest: 0.9, northeast: 1.15, west: 1.1, south: 0.85 }, negotiability: 'high', commonIssues: ['Often unnecessary'] },
  '83036': { code: '83036', description: 'Hemoglobin A1C', category: 'lab', nationalAvg: 65, medicareRate: 13, regionalMultipliers: { midwest: 0.9, northeast: 1.15, west: 1.1, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
  '80061': { code: '80061', description: 'Lipid Panel', category: 'lab', nationalAvg: 85, medicareRate: 18, regionalMultipliers: { midwest: 0.9, northeast: 1.15, west: 1.1, south: 0.85 }, negotiability: 'high', commonIssues: [] },
  '87086': { code: '87086', description: 'Urine Culture', category: 'lab', nationalAvg: 55, medicareRate: 10, regionalMultipliers: { midwest: 0.9, northeast: 1.1, west: 1.1, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
  '82570': { code: '82570', description: 'Creatinine', category: 'lab', nationalAvg: 40, medicareRate: 7, regionalMultipliers: { midwest: 0.9, northeast: 1.1, west: 1.1, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
  
  // Imaging
  '71046': { code: '71046', description: 'Chest X-Ray (2 views)', category: 'imaging', nationalAvg: 150, medicareRate: 31, regionalMultipliers: { midwest: 0.85, northeast: 1.25, west: 1.2, south: 0.8 }, negotiability: 'medium', commonIssues: [] },
  '71045': { code: '71045', description: 'Chest X-Ray (1 view)', category: 'imaging', nationalAvg: 100, medicareRate: 22, regionalMultipliers: { midwest: 0.85, northeast: 1.25, west: 1.2, south: 0.8 }, negotiability: 'medium', commonIssues: [] },
  '73030': { code: '73030', description: 'Shoulder X-Ray', category: 'imaging', nationalAvg: 120, medicareRate: 26, regionalMultipliers: { midwest: 0.85, northeast: 1.25, west: 1.2, south: 0.8 }, negotiability: 'medium', commonIssues: [] },
  '70553': { code: '70553', description: 'Brain MRI with Contrast', category: 'imaging', nationalAvg: 1500, medicareRate: 450, regionalMultipliers: { midwest: 0.8, northeast: 1.3, west: 1.25, south: 0.75 }, negotiability: 'high', commonIssues: ['Hospital MRIs often 2-3x independent facilities'] },
  '70551': { code: '70551', description: 'Brain MRI without Contrast', category: 'imaging', nationalAvg: 1200, medicareRate: 350, regionalMultipliers: { midwest: 0.8, northeast: 1.3, west: 1.25, south: 0.75 }, negotiability: 'high', commonIssues: [] },
  '72148': { code: '72148', description: 'Lumbar Spine MRI', category: 'imaging', nationalAvg: 1400, medicareRate: 400, regionalMultipliers: { midwest: 0.8, northeast: 1.3, west: 1.25, south: 0.75 }, negotiability: 'high', commonIssues: [] },
  '74177': { code: '74177', description: 'CT Abdomen/Pelvis with Contrast', category: 'imaging', nationalAvg: 1200, medicareRate: 280, regionalMultipliers: { midwest: 0.85, northeast: 1.25, west: 1.2, south: 0.8 }, negotiability: 'high', commonIssues: [] },
  '74176': { code: '74176', description: 'CT Abdomen/Pelvis without Contrast', category: 'imaging', nationalAvg: 900, medicareRate: 200, regionalMultipliers: { midwest: 0.85, northeast: 1.25, west: 1.2, south: 0.8 }, negotiability: 'high', commonIssues: [] },
  '71250': { code: '71250', description: 'CT Chest without Contrast', category: 'imaging', nationalAvg: 800, medicareRate: 180, regionalMultipliers: { midwest: 0.85, northeast: 1.25, west: 1.2, south: 0.8 }, negotiability: 'high', commonIssues: [] },
  '71260': { code: '71260', description: 'CT Chest with Contrast', category: 'imaging', nationalAvg: 1000, medicareRate: 220, regionalMultipliers: { midwest: 0.85, northeast: 1.25, west: 1.2, south: 0.8 }, negotiability: 'high', commonIssues: [] },

  // Inpatient / Hospital Charges
  'ROOM_SEMI': { code: 'ROOM_SEMI', description: 'Room & Board - Semi-Private', category: 'inpatient', nationalAvg: 2500, medicareRate: 1200, regionalMultipliers: { midwest: 0.85, northeast: 1.4, west: 1.35, south: 0.8 }, negotiability: 'high', commonIssues: ['Most negotiable charge', 'Ask for 30-50% reduction'] },
  'ROOM_PRIVATE': { code: 'ROOM_PRIVATE', description: 'Room & Board - Private', category: 'inpatient', nationalAvg: 3500, medicareRate: 1500, regionalMultipliers: { midwest: 0.85, northeast: 1.4, west: 1.35, south: 0.8 }, negotiability: 'high', commonIssues: ['Did you request private room?', 'May be reduced to semi-private rate'] },
  'ROOM_ICU': { code: 'ROOM_ICU', description: 'ICU Room & Board', category: 'inpatient', nationalAvg: 5000, medicareRate: 2500, regionalMultipliers: { midwest: 0.85, northeast: 1.4, west: 1.35, south: 0.8 }, negotiability: 'medium', commonIssues: ['Verify ICU was medically necessary'] },
  'IV_THERAPY': { code: 'IV_THERAPY', description: 'IV Therapy/Infusion', category: 'inpatient', nationalAvg: 300, medicareRate: 100, regionalMultipliers: { midwest: 0.9, northeast: 1.2, west: 1.15, south: 0.85 }, negotiability: 'medium', commonIssues: ['Check for duplicate charges', 'May be bundled with room'] },
  'ER_FACILITY': { code: 'ER_FACILITY', description: 'Emergency Room Facility Fee', category: 'facility', nationalAvg: 1500, medicareRate: 400, regionalMultipliers: { midwest: 0.85, northeast: 1.35, west: 1.3, south: 0.8 }, negotiability: 'high', commonIssues: ['Separate from physician fee', 'Highly negotiable'] },
  'OR_FACILITY': { code: 'OR_FACILITY', description: 'Operating Room Fee', category: 'facility', nationalAvg: 3000, medicareRate: 1000, regionalMultipliers: { midwest: 0.85, northeast: 1.4, west: 1.35, south: 0.8 }, negotiability: 'medium', commonIssues: ['Per hour or flat fee?'] },
  
  // Pharmacy
  'PHARMACY': { code: 'PHARMACY', description: 'Pharmacy/Medications', category: 'pharmacy', nationalAvg: 200, medicareRate: 50, regionalMultipliers: { midwest: 0.9, northeast: 1.15, west: 1.1, south: 0.9 }, negotiability: 'medium', commonIssues: ['Hospital markup often 5-10x retail', 'Request itemized drug list'] },
  
  // Therapy
  'PULM_FUNC': { code: 'PULM_FUNC', description: 'Pulmonary Function Test', category: 'therapy', nationalAvg: 250, medicareRate: 80, regionalMultipliers: { midwest: 0.9, northeast: 1.2, west: 1.15, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
  '94010': { code: '94010', description: 'Spirometry', category: 'therapy', nationalAvg: 150, medicareRate: 35, regionalMultipliers: { midwest: 0.9, northeast: 1.2, west: 1.15, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
  '97110': { code: '97110', description: 'Physical Therapy - Therapeutic Exercise', category: 'therapy', nationalAvg: 75, medicareRate: 32, regionalMultipliers: { midwest: 0.9, northeast: 1.15, west: 1.1, south: 0.85 }, negotiability: 'low', commonIssues: ['Per 15-minute unit'] },
  
  // Common Procedures
  '10060': { code: '10060', description: 'Incision and Drainage', category: 'procedure', nationalAvg: 350, medicareRate: 120, regionalMultipliers: { midwest: 0.9, northeast: 1.2, west: 1.15, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
  '11102': { code: '11102', description: 'Skin Biopsy', category: 'procedure', nationalAvg: 250, medicareRate: 85, regionalMultipliers: { midwest: 0.9, northeast: 1.2, west: 1.15, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
  '90471': { code: '90471', description: 'Immunization Administration', category: 'procedure', nationalAvg: 35, medicareRate: 17, regionalMultipliers: { midwest: 0.9, northeast: 1.1, west: 1.1, south: 0.9 }, negotiability: 'low', commonIssues: [] },
  '99152': { code: '99152', description: 'Moderate Sedation', category: 'procedure', nationalAvg: 200, medicareRate: 60, regionalMultipliers: { midwest: 0.9, northeast: 1.2, west: 1.15, south: 0.85 }, negotiability: 'medium', commonIssues: [] },
};


// Adjustment code explanations
export const adjustmentCodeLibrary: Record<string, {
  name: string;
  explanation: string;
  isGoodForPatient: boolean;
  actionRequired: boolean;
  actionDetails?: string;
}> = {
  'SELF_PAY_DISCOUNT': {
    name: 'Self-Pay/Uninsured Discount',
    explanation: 'Because you\'re uninsured, the hospital automatically discounted your bill. This is standard practice - hospitals charge inflated "chargemaster" rates that insurance companies negotiate down. Self-pay discounts of 30-60% are normal and expected.',
    isGoodForPatient: true,
    actionRequired: false
  },
  'MUE_WRITEOFF': {
    name: 'MUE Write-Off (Medically Unlikely Edit)',
    explanation: 'MUE stands for Medically Unlikely Edit. This means the hospital billed for something that Medicare\'s automated system flagged as unlikely to be correct - often a duplicate charge or quantity error. This write-off proves they caught their own billing error.',
    isGoodForPatient: true,
    actionRequired: true,
    actionDetails: 'Since they found one error, there may be others. Request a full billing audit and ask specifically: "Were there any other MUE edits or billing corrections on my account?"'
  },
  'CONTRACTUAL_ADJ': {
    name: 'Contractual Adjustment',
    explanation: 'This is the difference between what the hospital charged and what your insurance agreed to pay. Insurance companies negotiate lower rates - you\'re seeing the "discount" they negotiated.',
    isGoodForPatient: true,
    actionRequired: false
  },
  'CHARITY_CARE': {
    name: 'Charity Care Adjustment',
    explanation: 'The hospital reduced your bill through their charity care or financial assistance program. Non-profit hospitals are required to provide this.',
    isGoodForPatient: true,
    actionRequired: false
  },
  'PROMPT_PAY': {
    name: 'Prompt Pay Discount',
    explanation: 'Discount for paying quickly or in full. Hospitals prefer guaranteed payment over collections risk.',
    isGoodForPatient: true,
    actionRequired: false
  },
  'ADMIN_ADJ': {
    name: 'Administrative Adjustment',
    explanation: 'A general adjustment made by the billing department. Could be error correction, goodwill adjustment, or policy-based reduction.',
    isGoodForPatient: true,
    actionRequired: true,
    actionDetails: 'Ask what specifically this adjustment was for - it may indicate other errors on your bill.'
  },
  'DUPLICATE_WRITEOFF': {
    name: 'Duplicate Charge Write-Off',
    explanation: 'The hospital removed a charge that was billed twice. This is a billing error correction.',
    isGoodForPatient: true,
    actionRequired: true,
    actionDetails: 'Review your entire bill for other potential duplicates they may have missed.'
  },
  'CODING_ADJ': {
    name: 'Coding Adjustment',
    explanation: 'The original billing code was changed, resulting in a different charge. This could be a correction or a downcode.',
    isGoodForPatient: true,
    actionRequired: true,
    actionDetails: 'Ask what the original code was and why it was changed - this may reveal systematic billing issues.'
  }
};


// State-to-region mapping
const stateToRegion: Record<string, string> = {
  // Midwest
  'OH': 'midwest', 'MI': 'midwest', 'IN': 'midwest', 'IL': 'midwest', 'WI': 'midwest',
  'MN': 'midwest', 'IA': 'midwest', 'MO': 'midwest', 'ND': 'midwest', 'SD': 'midwest',
  'NE': 'midwest', 'KS': 'midwest',
  // Northeast
  'NY': 'northeast', 'NJ': 'northeast', 'PA': 'northeast', 'CT': 'northeast', 'MA': 'northeast',
  'RI': 'northeast', 'VT': 'northeast', 'NH': 'northeast', 'ME': 'northeast',
  // West
  'CA': 'west', 'WA': 'west', 'OR': 'west', 'NV': 'west', 'AZ': 'west', 'CO': 'west',
  'UT': 'west', 'NM': 'west', 'HI': 'west', 'AK': 'west', 'ID': 'west', 'MT': 'west', 'WY': 'west',
  // South
  'TX': 'south', 'FL': 'south', 'GA': 'south', 'NC': 'south', 'SC': 'south', 'VA': 'south',
  'TN': 'south', 'AL': 'south', 'MS': 'south', 'LA': 'south', 'AR': 'south', 'KY': 'south',
  'WV': 'south', 'OK': 'south', 'MD': 'south', 'DE': 'south', 'DC': 'south'
};

export interface CostComparison {
  lineItemId: string;
  code?: string;
  description: string;
  chargedAmount: number;
  regionalAverage: { low: number; median: number; high: number };
  medicareRate: number;
  percentAboveMedian: number;
  percentAboveMedicare: number;
  priceRating: 'fair' | 'high' | 'very-high' | 'extreme';
  category: string;
  negotiability: 'low' | 'medium' | 'high';
  commonIssues: string[];
  savingsPotential: { low: number; high: number };
}

export interface DisputeRecommendation {
  lineItemId: string;
  type: 'overcharge' | 'duplicate' | 'unbundled' | 'upcoding' | 'unnecessary' | 'error';
  severity: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  potentialSavings: number;
  talkingPoints: string[];
  sampleScript: string;
  actionSteps: string[];
}

export interface BillAnalysisResult {
  comparisons: CostComparison[];
  disputes: DisputeRecommendation[];
  duplicates: string[][];
  adjustmentAnalysis: Array<{
    code: string;
    name: string;
    amount: number;
    explanation: string;
    isGood: boolean;
    actionRequired: boolean;
    actionDetails?: string;
  }>;
  totalCharged: number;
  totalAdjustments: number;
  totalOwed: number;
  fairMarketValue: number;
  potentialSavings: { low: number; high: number };
  overallRating: 'fair' | 'questionable' | 'concerning' | 'egregious';
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  urgencyReason: string;
}


/**
 * Get regional multiplier for a state
 */
function getRegionalMultiplier(state?: string): number {
  if (!state) return 1.0;
  const region = stateToRegion[state.toUpperCase()];
  // Return average multiplier for region, default to 1.0
  const regionMultipliers: Record<string, number> = {
    midwest: 0.88,
    northeast: 1.25,
    west: 1.18,
    south: 0.83
  };
  return regionMultipliers[region] || 1.0;
}

/**
 * Try to match a line item to our database by code or description
 */
function findMatchingCostData(item: ExtractedLineItem): CostData | null {
  // Direct code match
  if (item.code && medicalCostDatabase[item.code]) {
    return medicalCostDatabase[item.code];
  }

  // Try to match by description keywords
  const desc = (item.description || item.rawText || '').toLowerCase();
  
  // Room & Board matching
  if (desc.includes('room') && desc.includes('board')) {
    if (desc.includes('icu') || desc.includes('intensive')) return medicalCostDatabase['ROOM_ICU'];
    if (desc.includes('private')) return medicalCostDatabase['ROOM_PRIVATE'];
    return medicalCostDatabase['ROOM_SEMI'];
  }
  
  // ER/Emergency matching
  if (desc.includes('emergency') || desc.includes('er ')) {
    if (desc.includes('facility')) return medicalCostDatabase['ER_FACILITY'];
    // Try to determine level
    if (desc.includes('level 5') || desc.includes('critical')) return medicalCostDatabase['99285'];
    if (desc.includes('level 4') || desc.includes('high')) return medicalCostDatabase['99284'];
    if (desc.includes('level 3') || desc.includes('moderate')) return medicalCostDatabase['99283'];
    return medicalCostDatabase['99284']; // Default to level 4
  }
  
  // IV Therapy
  if (desc.includes('iv ') || desc.includes('infusion') || desc.includes('intravenous')) {
    return medicalCostDatabase['IV_THERAPY'];
  }
  
  // Imaging
  if (desc.includes('mri')) {
    if (desc.includes('brain') || desc.includes('head')) {
      return desc.includes('contrast') ? medicalCostDatabase['70553'] : medicalCostDatabase['70551'];
    }
    if (desc.includes('spine') || desc.includes('lumbar')) return medicalCostDatabase['72148'];
  }
  if (desc.includes('ct ') || desc.includes('cat scan')) {
    if (desc.includes('chest')) {
      return desc.includes('contrast') ? medicalCostDatabase['71260'] : medicalCostDatabase['71250'];
    }
    if (desc.includes('abdomen') || desc.includes('pelvis')) {
      return desc.includes('contrast') ? medicalCostDatabase['74177'] : medicalCostDatabase['74176'];
    }
  }
  if (desc.includes('x-ray') || desc.includes('xray')) {
    if (desc.includes('chest')) return medicalCostDatabase['71046'];
  }
  
  // Labs
  if (desc.includes('blood draw') || desc.includes('venipuncture')) return medicalCostDatabase['36415'];
  if (desc.includes('metabolic panel') || desc.includes('cmp')) return medicalCostDatabase['80053'];
  if (desc.includes('cbc') || desc.includes('blood count')) return medicalCostDatabase['85025'];
  if (desc.includes('urinalysis')) return medicalCostDatabase['81001'];
  if (desc.includes('lipid')) return medicalCostDatabase['80061'];
  if (desc.includes('a1c') || desc.includes('hemoglobin a')) return medicalCostDatabase['83036'];
  
  // Pharmacy
  if (desc.includes('pharmacy') || desc.includes('medication') || desc.includes('drug')) {
    return medicalCostDatabase['PHARMACY'];
  }
  
  // Pulmonary
  if (desc.includes('pulmonary') || desc.includes('lung function')) {
    return medicalCostDatabase['PULM_FUNC'];
  }
  
  // Facility fees
  if (desc.includes('facility fee') || desc.includes('hospital fee')) {
    return medicalCostDatabase['ER_FACILITY'];
  }
  
  return null;
}


/**
 * Compare a single line item against cost database with regional adjustment
 */
export function compareItemCost(item: ExtractedLineItem, state?: string): CostComparison {
  const costData = findMatchingCostData(item);
  const chargedAmount = item.amount || 0;
  const regionalMultiplier = getRegionalMultiplier(state);

  if (!costData) {
    // Unknown item - provide generic analysis
    return {
      lineItemId: item.id,
      code: item.code,
      description: item.description || item.rawText || 'Unknown charge',
      chargedAmount,
      regionalAverage: { 
        low: chargedAmount * 0.5, 
        median: chargedAmount * 0.7, 
        high: chargedAmount * 1.1 
      },
      medicareRate: chargedAmount * 0.3,
      percentAboveMedian: 0,
      percentAboveMedicare: 0,
      priceRating: 'fair',
      category: 'other',
      negotiability: 'medium',
      commonIssues: ['Unable to find reference pricing - request itemized breakdown'],
      savingsPotential: { low: 0, high: chargedAmount * 0.3 }
    };
  }

  // Calculate regional prices
  const region = state ? stateToRegion[state.toUpperCase()] : undefined;
  const multiplier = region && costData.regionalMultipliers[region] 
    ? costData.regionalMultipliers[region] 
    : regionalMultiplier;

  const regionalMedian = costData.nationalAvg * multiplier;
  const regionalLow = regionalMedian * 0.6;
  const regionalHigh = regionalMedian * 1.5;

  const percentAboveMedian = ((chargedAmount - regionalMedian) / regionalMedian) * 100;
  const percentAboveMedicare = ((chargedAmount - costData.medicareRate) / costData.medicareRate) * 100;

  let priceRating: CostComparison['priceRating'] = 'fair';
  if (percentAboveMedian > 150) priceRating = 'extreme';
  else if (percentAboveMedian > 75) priceRating = 'very-high';
  else if (percentAboveMedian > 30) priceRating = 'high';

  // Calculate savings potential
  const savingsLow = Math.max(0, chargedAmount - regionalHigh);
  const savingsHigh = Math.max(0, chargedAmount - regionalMedian);

  return {
    lineItemId: item.id,
    code: item.code || costData.code,
    description: item.description || costData.description,
    chargedAmount,
    regionalAverage: { low: regionalLow, median: regionalMedian, high: regionalHigh },
    medicareRate: costData.medicareRate,
    percentAboveMedian: Math.round(percentAboveMedian),
    percentAboveMedicare: Math.round(percentAboveMedicare),
    priceRating,
    category: costData.category,
    negotiability: costData.negotiability,
    commonIssues: costData.commonIssues,
    savingsPotential: { low: savingsLow, high: savingsHigh }
  };
}

/**
 * Detect duplicate charges in a bill
 */
export function detectDuplicates(items: ExtractedLineItem[]): string[][] {
  const duplicateGroups: string[][] = [];
  const seen = new Map<string, ExtractedLineItem[]>();

  for (const item of items) {
    // Create key based on code + amount + date (if available)
    const key = `${item.code || item.description || ''}-${item.amount}-${item.date || ''}`;
    
    if (!seen.has(key)) {
      seen.set(key, []);
    }
    seen.get(key)!.push(item);
  }

  for (const [, group] of seen) {
    if (group.length > 1) {
      duplicateGroups.push(group.map(item => item.id));
    }
  }

  return duplicateGroups;
}


/**
 * Detect potential unbundling issues
 */
function detectUnbundling(items: ExtractedLineItem[]): DisputeRecommendation[] {
  const disputes: DisputeRecommendation[] = [];
  const codes = items.map(i => i.code).filter(Boolean);

  // Multiple E/M codes same day
  const emCodes = ['99211', '99212', '99213', '99214', '99215', '99281', '99282', '99283', '99284', '99285'];
  const emMatches = items.filter(i => i.code && emCodes.includes(i.code));
  if (emMatches.length > 1) {
    const sameDate = emMatches.filter(i => i.date === emMatches[0].date);
    if (sameDate.length > 1) {
      disputes.push({
        lineItemId: sameDate[0].id,
        type: 'unbundled',
        severity: 'high',
        reason: `Multiple evaluation/management codes billed on the same date. Typically only one E/M code should be billed per visit.`,
        potentialSavings: sameDate.slice(1).reduce((sum, i) => sum + (i.amount || 0), 0),
        talkingPoints: [
          'Only one E/M code should typically be billed per visit',
          'Ask why multiple visit codes were charged',
          'Request review for proper coding'
        ],
        sampleScript: 'I noticed I was charged for multiple office/ER visit codes on the same date. Can you explain why? Typically only one evaluation and management code should be billed per encounter.',
        actionSteps: [
          'Call billing and ask for explanation',
          'Request coding review',
          'If not resolved, file appeal'
        ]
      });
    }
  }

  // Multiple blood draw codes
  const bloodDrawCodes = ['36415', '36416'];
  const bloodDraws = items.filter(i => i.code && bloodDrawCodes.includes(i.code));
  if (bloodDraws.length > 1) {
    disputes.push({
      lineItemId: bloodDraws[0].id,
      type: 'unbundled',
      severity: 'medium',
      reason: 'Multiple venipuncture codes billed. Usually only one blood draw charge should apply per visit.',
      potentialSavings: bloodDraws.slice(1).reduce((sum, i) => sum + (i.amount || 0), 0),
      talkingPoints: [
        'Blood draws should be bundled into one charge',
        'Multiple venipuncture codes suggest billing error'
      ],
      sampleScript: 'I see multiple charges for blood draws. Shouldn\'t these be combined into a single venipuncture charge?',
      actionSteps: ['Request itemized explanation', 'Ask for duplicate removal']
    });
  }

  return disputes;
}

/**
 * Generate comprehensive dispute recommendations
 */
export function generateDisputeRecommendations(
  items: ExtractedLineItem[],
  comparisons: CostComparison[]
): DisputeRecommendation[] {
  const disputes: DisputeRecommendation[] = [];

  // Check for overcharges
  for (const comparison of comparisons) {
    if (comparison.priceRating === 'extreme') {
      disputes.push({
        lineItemId: comparison.lineItemId,
        type: 'overcharge',
        severity: 'critical',
        reason: `This charge is ${comparison.percentAboveMedian}% above the regional average and ${comparison.percentAboveMedicare}% above Medicare rates. This is an extreme overcharge.`,
        potentialSavings: comparison.savingsPotential.high,
        talkingPoints: [
          `The regional average for this service is $${comparison.regionalAverage.median.toFixed(0)}`,
          `Medicare pays only $${comparison.medicareRate.toFixed(0)} for this service`,
          `Your charge of $${comparison.chargedAmount.toFixed(0)} is ${comparison.percentAboveMedian}% above average`,
          'Request a price reduction to fair market value'
        ],
        sampleScript: `I'm reviewing my bill and noticed the charge for ${comparison.description} is $${comparison.chargedAmount.toFixed(0)}. My research shows the regional average is around $${comparison.regionalAverage.median.toFixed(0)}, and Medicare pays $${comparison.medicareRate.toFixed(0)}. Can you help me understand why this charge is so much higher, and is there any way to reduce it to a more reasonable amount?`,
        actionSteps: [
          'Request itemized breakdown',
          'Ask for self-pay or prompt-pay discount',
          'Request price match to fair market value',
          'Ask about financial assistance programs',
          'If denied, request supervisor review'
        ]
      });
    } else if (comparison.priceRating === 'very-high') {
      disputes.push({
        lineItemId: comparison.lineItemId,
        type: 'overcharge',
        severity: 'high',
        reason: `This charge is ${comparison.percentAboveMedian}% above the regional average.`,
        potentialSavings: comparison.savingsPotential.high,
        talkingPoints: [
          `Regional average: $${comparison.regionalAverage.median.toFixed(0)}`,
          `Your charge: $${comparison.chargedAmount.toFixed(0)}`,
          'This is significantly above typical costs'
        ],
        sampleScript: `I'd like to discuss the charge for ${comparison.description}. At $${comparison.chargedAmount.toFixed(0)}, it seems higher than typical rates. Is there a discount available?`,
        actionSteps: [
          'Ask about available discounts',
          'Request payment plan if needed',
          'Compare with other providers for future reference'
        ]
      });
    } else if (comparison.priceRating === 'high' && comparison.negotiability === 'high') {
      disputes.push({
        lineItemId: comparison.lineItemId,
        type: 'overcharge',
        severity: 'medium',
        reason: `This charge is above average and typically negotiable.`,
        potentialSavings: comparison.savingsPotential.low,
        talkingPoints: [
          `This type of charge (${comparison.category}) is often negotiable`,
          'Ask about self-pay discounts'
        ],
        sampleScript: `I'm an uninsured/self-pay patient. Do you offer any discounts on the ${comparison.description} charge?`,
        actionSteps: ['Ask about self-pay discount', 'Inquire about payment plans']
      });
    }
  }

  // Check for duplicates
  const duplicateGroups = detectDuplicates(items);
  for (const group of duplicateGroups) {
    const duplicateItems = items.filter(i => group.includes(i.id));
    const totalDuplicateAmount = duplicateItems.slice(1).reduce((sum, i) => sum + (i.amount || 0), 0);
    
    disputes.push({
      lineItemId: group[0],
      type: 'duplicate',
      severity: 'critical',
      reason: `This charge appears ${group.length} times on your bill. You should only pay once for the same service.`,
      potentialSavings: totalDuplicateAmount,
      talkingPoints: [
        'This exact charge appears multiple times',
        'Duplicate billing is a common error',
        'Request immediate removal of duplicate charges'
      ],
      sampleScript: `I found what appears to be a duplicate charge on my bill. The ${duplicateItems[0].description || 'service'} for $${duplicateItems[0].amount?.toFixed(2)} appears ${group.length} times. Can you please review and remove the duplicate?`,
      actionSteps: [
        'Call billing immediately',
        'Document the call (date, time, representative name)',
        'Request written confirmation of correction',
        'If not resolved, file complaint with state insurance commissioner'
      ]
    });
  }

  // Check for unbundling
  disputes.push(...detectUnbundling(items));

  return disputes;
}


/**
 * Analyze adjustment codes on a bill
 */
export function analyzeAdjustments(adjustments: Array<{ code?: string; name: string; amount: number }>): BillAnalysisResult['adjustmentAnalysis'] {
  return adjustments.map(adj => {
    // Try to match adjustment to our library
    const normalizedName = adj.name.toUpperCase().replace(/[^A-Z]/g, '_');
    
    // Check for known patterns
    if (adj.name.toLowerCase().includes('self-pay') || adj.name.toLowerCase().includes('uninsured')) {
      const lib = adjustmentCodeLibrary['SELF_PAY_DISCOUNT'];
      return { code: adj.code || 'SELF_PAY', name: adj.name, amount: adj.amount, ...lib };
    }
    if (adj.name.toLowerCase().includes('mue') || adj.name.toLowerCase().includes('medically unlikely')) {
      const lib = adjustmentCodeLibrary['MUE_WRITEOFF'];
      return { code: adj.code || 'MUE', name: adj.name, amount: adj.amount, ...lib };
    }
    if (adj.name.toLowerCase().includes('contractual')) {
      const lib = adjustmentCodeLibrary['CONTRACTUAL_ADJ'];
      return { code: adj.code || 'CONTR', name: adj.name, amount: adj.amount, ...lib };
    }
    if (adj.name.toLowerCase().includes('charity')) {
      const lib = adjustmentCodeLibrary['CHARITY_CARE'];
      return { code: adj.code || 'CHARITY', name: adj.name, amount: adj.amount, ...lib };
    }
    if (adj.name.toLowerCase().includes('prompt') || adj.name.toLowerCase().includes('early')) {
      const lib = adjustmentCodeLibrary['PROMPT_PAY'];
      return { code: adj.code || 'PROMPT', name: adj.name, amount: adj.amount, ...lib };
    }
    if (adj.name.toLowerCase().includes('duplicate')) {
      const lib = adjustmentCodeLibrary['DUPLICATE_WRITEOFF'];
      return { code: adj.code || 'DUP', name: adj.name, amount: adj.amount, ...lib };
    }
    if (adj.name.toLowerCase().includes('coding') || adj.name.toLowerCase().includes('code')) {
      const lib = adjustmentCodeLibrary['CODING_ADJ'];
      return { code: adj.code || 'CODE', name: adj.name, amount: adj.amount, ...lib };
    }

    // Default for unknown adjustments
    return {
      code: adj.code || 'ADJ',
      name: adj.name,
      amount: adj.amount,
      explanation: 'This is an adjustment to your bill. Contact billing for specific details.',
      isGood: adj.amount < 0, // Negative amounts reduce what you owe
      actionRequired: false
    };
  });
}

/**
 * Calculate urgency based on bill age and amount
 */
function calculateUrgency(
  totalOwed: number,
  serviceDate?: string,
  disputes: DisputeRecommendation[] = []
): { level: BillAnalysisResult['urgencyLevel']; reason: string } {
  const now = new Date();
  let daysSinceService = 0;
  
  if (serviceDate) {
    const service = new Date(serviceDate);
    daysSinceService = Math.floor((now.getTime() - service.getTime()) / (1000 * 60 * 60 * 24));
  }

  const hasCriticalDisputes = disputes.some(d => d.severity === 'critical');
  
  if (daysSinceService > 90) {
    return {
      level: 'critical',
      reason: `This bill is ${daysSinceService} days old. Bills typically go to collections after 90-120 days. Contact billing IMMEDIATELY to prevent credit damage.`
    };
  }
  
  if (daysSinceService > 60 || (totalOwed > 5000 && daysSinceService > 30)) {
    return {
      level: 'high',
      reason: `This bill is ${daysSinceService} days old with $${totalOwed.toFixed(0)} owed. Act within the next 2 weeks to negotiate before potential collections.`
    };
  }
  
  if (hasCriticalDisputes) {
    return {
      level: 'high',
      reason: 'Critical billing issues detected that could save you significant money. Address these promptly.'
    };
  }
  
  if (totalOwed > 2000 || daysSinceService > 30) {
    return {
      level: 'medium',
      reason: 'Review and address this bill within the next 30 days.'
    };
  }
  
  return {
    level: 'low',
    reason: 'No immediate urgency, but review the bill for accuracy.'
  };
}


/**
 * Perform comprehensive bill analysis
 */
export function analyzeBill(
  items: ExtractedLineItem[],
  options?: {
    state?: string;
    adjustments?: Array<{ code?: string; name: string; amount: number }>;
    serviceDate?: string;
    totalOwed?: number;
    insuranceStatus?: 'insured' | 'uninsured' | 'underinsured' | 'unknown';
  }
): BillAnalysisResult {
  const { state, adjustments = [], serviceDate, insuranceStatus } = options || {};

  // Compare all items
  const comparisons = items.map(item => compareItemCost(item, state));

  // Generate dispute recommendations
  const disputes = generateDisputeRecommendations(items, comparisons);

  // Detect duplicates
  const duplicates = detectDuplicates(items);

  // Analyze adjustments
  const adjustmentAnalysis = analyzeAdjustments(adjustments);

  // Calculate totals
  const totalCharged = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalAdjustments = adjustments.reduce((sum, adj) => sum + Math.abs(adj.amount), 0);
  const totalOwed = options?.totalOwed ?? (totalCharged - totalAdjustments);
  const fairMarketValue = comparisons.reduce((sum, c) => sum + c.regionalAverage.median, 0);
  
  // Calculate potential savings
  const disputeSavings = disputes.reduce((sum, d) => sum + d.potentialSavings, 0);
  const comparisonSavings = comparisons.reduce((sum, c) => sum + c.savingsPotential.high, 0);
  const potentialSavingsLow = Math.min(disputeSavings * 0.5, totalOwed * 0.2);
  const potentialSavingsHigh = Math.min(disputeSavings + comparisonSavings * 0.3, totalOwed * 0.5);

  // Determine overall rating
  let overallRating: BillAnalysisResult['overallRating'] = 'fair';
  const criticalCount = disputes.filter(d => d.severity === 'critical').length;
  const highCount = disputes.filter(d => d.severity === 'high').length;
  const mediumCount = disputes.filter(d => d.severity === 'medium').length;

  if (criticalCount >= 2 || (criticalCount >= 1 && highCount >= 2)) {
    overallRating = 'egregious';
  } else if (criticalCount >= 1 || highCount >= 3) {
    overallRating = 'concerning';
  } else if (highCount >= 1 || mediumCount >= 3) {
    overallRating = 'questionable';
  }

  // Calculate urgency
  const urgency = calculateUrgency(totalOwed, serviceDate, disputes);

  return {
    comparisons,
    disputes,
    duplicates,
    adjustmentAnalysis,
    totalCharged,
    totalAdjustments,
    totalOwed,
    fairMarketValue,
    potentialSavings: { low: potentialSavingsLow, high: potentialSavingsHigh },
    overallRating,
    urgencyLevel: urgency.level,
    urgencyReason: urgency.reason
  };
}

/**
 * Get price rating color for UI
 */
export function getPriceRatingColor(rating: CostComparison['priceRating']): string {
  switch (rating) {
    case 'fair': return '#4CAF50';
    case 'high': return '#FF9800';
    case 'very-high': return '#f44336';
    case 'extreme': return '#9C27B0';
    default: return '#666';
  }
}

/**
 * Get price rating label for UI
 */
export function getPriceRatingLabel(rating: CostComparison['priceRating']): string {
  switch (rating) {
    case 'fair': return '✓ Fair Price';
    case 'high': return '⚠️ Above Average';
    case 'very-high': return '🚨 Very High';
    case 'extreme': return '💀 Extreme Overcharge';
    default: return 'Unknown';
  }
}

/**
 * Get severity color for disputes
 */
export function getSeverityColor(severity: DisputeRecommendation['severity']): string {
  switch (severity) {
    case 'low': return '#8BC34A';
    case 'medium': return '#FF9800';
    case 'high': return '#f44336';
    case 'critical': return '#9C27B0';
    default: return '#666';
  }
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export default {
  compareItemCost,
  detectDuplicates,
  generateDisputeRecommendations,
  analyzeAdjustments,
  analyzeBill,
  getPriceRatingColor,
  getPriceRatingLabel,
  getSeverityColor,
  formatCurrency,
  adjustmentCodeLibrary
};
