/**
 * Cost Comparison Service
 * Compares medical charges against regional averages and detects billing issues
 */

import { ExtractedLineItem } from './api';

// Medical code cost database (national averages)
// Sources: CMS Medicare rates, Healthcare Bluebook, Fair Health
interface CostData {
  code: string;
  description: string;
  avgCost: number;
  lowCost: number;
  highCost: number;
  medicareRate: number;
  category: 'office-visit' | 'lab' | 'imaging' | 'procedure' | 'facility' | 'other';
}

const medicalCostDatabase: Record<string, CostData> = {
  // Office Visits (E/M Codes)
  '99211': { code: '99211', description: 'Office Visit - Level 1 (Minimal)', avgCost: 45, lowCost: 25, highCost: 75, medicareRate: 23, category: 'office-visit' },
  '99212': { code: '99212', description: 'Office Visit - Level 2 (Straightforward)', avgCost: 85, lowCost: 50, highCost: 130, medicareRate: 46, category: 'office-visit' },
  '99213': { code: '99213', description: 'Office Visit - Level 3 (Low Complexity)', avgCost: 130, lowCost: 80, highCost: 185, medicareRate: 76, category: 'office-visit' },
  '99214': { code: '99214', description: 'Office Visit - Level 4 (Moderate)', avgCost: 195, lowCost: 120, highCost: 280, medicareRate: 111, category: 'office-visit' },
  '99215': { code: '99215', description: 'Office Visit - Level 5 (High Complexity)', avgCost: 265, lowCost: 180, highCost: 380, medicareRate: 150, category: 'office-visit' },
  
  // Lab Tests
  '36415': { code: '36415', description: 'Venipuncture (Blood Draw)', avgCost: 30, lowCost: 15, highCost: 50, medicareRate: 3, category: 'lab' },
  '80053': { code: '80053', description: 'Comprehensive Metabolic Panel', avgCost: 150, lowCost: 50, highCost: 250, medicareRate: 14, category: 'lab' },
  '85025': { code: '85025', description: 'Complete Blood Count (CBC)', avgCost: 75, lowCost: 30, highCost: 150, medicareRate: 11, category: 'lab' },
  '81001': { code: '81001', description: 'Urinalysis with Microscopy', avgCost: 45, lowCost: 20, highCost: 80, medicareRate: 4, category: 'lab' },
  '84443': { code: '84443', description: 'TSH (Thyroid Test)', avgCost: 85, lowCost: 35, highCost: 150, medicareRate: 23, category: 'lab' },
  '82947': { code: '82947', description: 'Glucose Test', avgCost: 35, lowCost: 15, highCost: 60, medicareRate: 5, category: 'lab' },
  '82306': { code: '82306', description: 'Vitamin D Test', avgCost: 120, lowCost: 50, highCost: 200, medicareRate: 40, category: 'lab' },
  '83036': { code: '83036', description: 'Hemoglobin A1C', avgCost: 65, lowCost: 30, highCost: 120, medicareRate: 13, category: 'lab' },
  '80061': { code: '80061', description: 'Lipid Panel', avgCost: 85, lowCost: 35, highCost: 150, medicareRate: 18, category: 'lab' },
  
  // Imaging
  '71046': { code: '71046', description: 'Chest X-Ray (2 views)', avgCost: 150, lowCost: 75, highCost: 300, medicareRate: 31, category: 'imaging' },
  '73030': { code: '73030', description: 'Shoulder X-Ray', avgCost: 120, lowCost: 60, highCost: 250, medicareRate: 26, category: 'imaging' },
  '70553': { code: '70553', description: 'Brain MRI with Contrast', avgCost: 1500, lowCost: 500, highCost: 3000, medicareRate: 450, category: 'imaging' },
  
  // Common Procedures
  '10060': { code: '10060', description: 'Incision and Drainage', avgCost: 350, lowCost: 150, highCost: 600, medicareRate: 120, category: 'procedure' },
  '11102': { code: '11102', description: 'Skin Biopsy', avgCost: 250, lowCost: 100, highCost: 450, medicareRate: 85, category: 'procedure' },
  '90471': { code: '90471', description: 'Immunization Administration', avgCost: 35, lowCost: 15, highCost: 60, medicareRate: 17, category: 'procedure' },
};

export interface CostComparison {
  lineItemId: string;
  code?: string;
  chargedAmount: number;
  avgCost: number;
  lowCost: number;
  highCost: number;
  medicareRate: number;
  percentAboveAvg: number;
  percentAboveMedicare: number;
  priceRating: 'fair' | 'high' | 'very-high' | 'extreme';
  category: string;
}

export interface DisputeRecommendation {
  lineItemId: string;
  type: 'overcharge' | 'duplicate' | 'unbundled' | 'upcoding' | 'unnecessary';
  severity: 'low' | 'medium' | 'high';
  reason: string;
  potentialSavings: number;
  talkingPoints: string[];
  actionSteps: string[];
}

export interface BillAnalysisResult {
  comparisons: CostComparison[];
  disputes: DisputeRecommendation[];
  duplicates: string[][];
  totalCharged: number;
  fairMarketValue: number;
  potentialSavings: number;
  overallRating: 'fair' | 'questionable' | 'concerning' | 'egregious';
}

/**
 * Compare a single line item against cost database
 */
export function compareItemCost(item: ExtractedLineItem): CostComparison | null {
  const costData = item.code ? medicalCostDatabase[item.code] : null;
  const chargedAmount = item.amount || 0;

  if (!costData) {
    // Return generic comparison for unknown codes
    return {
      lineItemId: item.id,
      code: item.code,
      chargedAmount,
      avgCost: chargedAmount * 0.7, // Estimate
      lowCost: chargedAmount * 0.4,
      highCost: chargedAmount * 1.2,
      medicareRate: chargedAmount * 0.3,
      percentAboveAvg: 0,
      percentAboveMedicare: 0,
      priceRating: 'fair',
      category: 'other'
    };
  }

  const percentAboveAvg = ((chargedAmount - costData.avgCost) / costData.avgCost) * 100;
  const percentAboveMedicare = ((chargedAmount - costData.medicareRate) / costData.medicareRate) * 100;

  let priceRating: CostComparison['priceRating'] = 'fair';
  if (percentAboveAvg > 100) priceRating = 'extreme';
  else if (percentAboveAvg > 50) priceRating = 'very-high';
  else if (percentAboveAvg > 25) priceRating = 'high';

  return {
    lineItemId: item.id,
    code: item.code,
    chargedAmount,
    avgCost: costData.avgCost,
    lowCost: costData.lowCost,
    highCost: costData.highCost,
    medicareRate: costData.medicareRate,
    percentAboveAvg: Math.round(percentAboveAvg),
    percentAboveMedicare: Math.round(percentAboveMedicare),
    priceRating,
    category: costData.category
  };
}


/**
 * Detect duplicate charges in a bill
 */
export function detectDuplicates(items: ExtractedLineItem[]): string[][] {
  const duplicateGroups: string[][] = [];
  const seen = new Map<string, ExtractedLineItem[]>();

  for (const item of items) {
    // Create a key based on code + amount + date
    const key = `${item.code || ''}-${item.amount}-${item.date || ''}`;
    
    if (!seen.has(key)) {
      seen.set(key, []);
    }
    seen.get(key)!.push(item);
  }

  // Find groups with more than one item
  for (const [_, group] of seen) {
    if (group.length > 1) {
      duplicateGroups.push(group.map(item => item.id));
    }
  }

  return duplicateGroups;
}

/**
 * Detect potential unbundling (services that should be billed together)
 */
function detectUnbundling(items: ExtractedLineItem[]): DisputeRecommendation[] {
  const disputes: DisputeRecommendation[] = [];

  // Common unbundling patterns
  const unbundlingPatterns = [
    {
      codes: ['36415', '36416'], // Multiple blood draw codes
      reason: 'Multiple venipuncture codes billed - typically only one should be charged per visit'
    },
    {
      codes: ['99213', '99214', '99215'], // Multiple E/M codes same day
      reason: 'Multiple office visit codes on same date - only one E/M code should be billed per visit'
    }
  ];

  for (const pattern of unbundlingPatterns) {
    const matches = items.filter(i => i.code && pattern.codes.includes(i.code));
    if (matches.length > 1) {
      disputes.push({
        lineItemId: matches[0].id,
        type: 'unbundled',
        severity: 'medium',
        reason: pattern.reason,
        potentialSavings: matches.slice(1).reduce((sum, i) => sum + (i.amount || 0), 0),
        talkingPoints: [
          'Ask why multiple similar codes were billed',
          'Request review for proper bundling',
          'Reference CMS bundling guidelines'
        ],
        actionSteps: [
          'Call billing department and ask for itemized explanation',
          'Request a coding review',
          'If denied, file appeal with your insurance'
        ]
      });
    }
  }

  return disputes;
}

/**
 * Generate dispute recommendations based on cost analysis
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
        severity: 'high',
        reason: `This charge is ${comparison.percentAboveAvg}% above the average cost and ${comparison.percentAboveMedicare}% above Medicare rates.`,
        potentialSavings: comparison.chargedAmount - comparison.avgCost,
        talkingPoints: [
          `The average cost for this service is $${comparison.avgCost.toFixed(2)}`,
          `Medicare pays only $${comparison.medicareRate.toFixed(2)} for this service`,
          `Your charge of $${comparison.chargedAmount.toFixed(2)} is significantly above market rates`
        ],
        actionSteps: [
          'Request an itemized bill with detailed breakdown',
          'Ask for a price reduction to match fair market value',
          'Request financial assistance or payment plan',
          'If insured, ask your insurance to review the charge'
        ]
      });
    } else if (comparison.priceRating === 'very-high') {
      disputes.push({
        lineItemId: comparison.lineItemId,
        type: 'overcharge',
        severity: 'medium',
        reason: `This charge is ${comparison.percentAboveAvg}% above average.`,
        potentialSavings: comparison.chargedAmount - comparison.avgCost,
        talkingPoints: [
          `The typical cost for this service is $${comparison.avgCost.toFixed(2)}`,
          `Your charge is on the high end of the price range`
        ],
        actionSteps: [
          'Ask if there are any discounts available',
          'Request a payment plan if needed',
          'Compare with other providers for future reference'
        ]
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
      severity: 'high',
      reason: `This charge appears ${group.length} times on your bill. You should only pay once.`,
      potentialSavings: totalDuplicateAmount,
      talkingPoints: [
        'Point out the duplicate entries on your bill',
        'Request immediate removal of duplicate charges',
        'Ask for a corrected bill in writing'
      ],
      actionSteps: [
        'Call billing immediately to report the duplicate',
        'Document the call with date, time, and representative name',
        'Request written confirmation of the correction',
        'If not resolved, file a complaint with your state insurance commissioner'
      ]
    });
  }

  // Check for unbundling
  const unbundlingDisputes = detectUnbundling(items);
  disputes.push(...unbundlingDisputes);

  return disputes;
}


/**
 * Perform full bill analysis
 */
export function analyzeBill(items: ExtractedLineItem[]): BillAnalysisResult {
  // Compare all items
  const comparisons = items
    .map(item => compareItemCost(item))
    .filter((c): c is CostComparison => c !== null);

  // Generate dispute recommendations
  const disputes = generateDisputeRecommendations(items, comparisons);

  // Detect duplicates
  const duplicates = detectDuplicates(items);

  // Calculate totals
  const totalCharged = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const fairMarketValue = comparisons.reduce((sum, c) => sum + c.avgCost, 0);
  const potentialSavings = disputes.reduce((sum, d) => sum + d.potentialSavings, 0);

  // Determine overall rating
  let overallRating: BillAnalysisResult['overallRating'] = 'fair';
  const highSeverityCount = disputes.filter(d => d.severity === 'high').length;
  const mediumSeverityCount = disputes.filter(d => d.severity === 'medium').length;

  if (highSeverityCount >= 3 || potentialSavings > totalCharged * 0.3) {
    overallRating = 'egregious';
  } else if (highSeverityCount >= 1 || mediumSeverityCount >= 3) {
    overallRating = 'concerning';
  } else if (mediumSeverityCount >= 1 || potentialSavings > totalCharged * 0.1) {
    overallRating = 'questionable';
  }

  return {
    comparisons,
    disputes,
    duplicates,
    totalCharged,
    fairMarketValue,
    potentialSavings,
    overallRating
  };
}

/**
 * Get price rating color
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
 * Get price rating label
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
  analyzeBill,
  getPriceRatingColor,
  getPriceRatingLabel,
  formatCurrency
};
