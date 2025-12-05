import { ExtractedLineItem, ExtractedAdjustment, DocumentMetadata, ProcessingError, ErrorCodes } from '../types';

/**
 * Enhanced Document Parser Service
 * Handles post-processing of Textract results to extract structured medical bill data
 * with support for adjustments, multiple accounts, and intelligent categorization
 */
export class DocumentParser {
  /**
   * Process and enhance extracted line items
   */
  processLineItems(lineItems: ExtractedLineItem[]): ExtractedLineItem[] {
    return lineItems
      .map(item => this.enhanceLineItem(item))
      .filter(item => this.isValidLineItem(item))
      .sort((a, b) => (b.amount || 0) - (a.amount || 0));
  }

  /**
   * Extract adjustments from raw text lines
   */
  extractAdjustments(rawLines: string[]): ExtractedAdjustment[] {
    const adjustments: ExtractedAdjustment[] = [];
    const adjustmentPatterns = [
      /self[- ]?pay\s*(discount|adj)/i,
      /uninsured\s*(discount|adj)/i,
      /mue\s*(write[- ]?off|adj)/i,
      /medically\s*unlikely/i,
      /contractual\s*(adj|adjustment)/i,
      /charity\s*(care|adj)/i,
      /financial\s*assistance/i,
      /prompt\s*pay/i,
      /duplicate\s*(write[- ]?off|adj)/i,
      /adjustment/i,
      /discount/i,
      /write[- ]?off/i
    ];

    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i];
      for (const pattern of adjustmentPatterns) {
        if (pattern.test(line)) {
          const amount = this.extractAmount(line);
          if (amount !== undefined) {
            adjustments.push({
              id: `adj-${i}`,
              name: this.extractAdjustmentName(line),
              amount: -Math.abs(amount), // Adjustments reduce the bill
              rawText: line,
              confidence: 85
            });
            break;
          }
        }
      }
    }

    return adjustments;
  }


  /**
   * Extract adjustment name from text
   */
  private extractAdjustmentName(text: string): string {
    const patterns: Array<{ pattern: RegExp; name: string }> = [
      { pattern: /self[- ]?pay\s*(discount|adj)/i, name: 'Self-Pay Discount' },
      { pattern: /uninsured\s*(discount|adj)/i, name: 'Uninsured Discount' },
      { pattern: /mue\s*(write[- ]?off|adj)/i, name: 'MUE Write-Off' },
      { pattern: /medically\s*unlikely/i, name: 'MUE Write-Off' },
      { pattern: /contractual\s*(adj|adjustment)/i, name: 'Contractual Adjustment' },
      { pattern: /charity\s*(care|adj)/i, name: 'Charity Care' },
      { pattern: /financial\s*assistance/i, name: 'Financial Assistance' },
      { pattern: /prompt\s*pay/i, name: 'Prompt Pay Discount' },
      { pattern: /duplicate/i, name: 'Duplicate Write-Off' }
    ];

    for (const { pattern, name } of patterns) {
      if (pattern.test(text)) {
        return name;
      }
    }

    // Extract generic adjustment name
    const match = text.match(/([A-Za-z\s]+(?:discount|adjustment|write[- ]?off))/i);
    return match ? match[1].trim() : 'Adjustment';
  }

  /**
   * Enhance a line item with additional parsing and categorization
   */
  private enhanceLineItem(item: ExtractedLineItem): ExtractedLineItem {
    const enhanced = { ...item };

    // Try to extract code if not present
    if (!enhanced.code && enhanced.description) {
      enhanced.code = this.extractCode(enhanced.description);
    }
    if (!enhanced.code && enhanced.rawText) {
      enhanced.code = this.extractCode(enhanced.rawText);
    }

    // Clean up description
    if (enhanced.description) {
      enhanced.description = this.cleanDescription(enhanced.description);
    }

    // Normalize amount
    if (enhanced.rawText && !enhanced.amount) {
      enhanced.amount = this.extractAmount(enhanced.rawText);
    }

    // Categorize the line item
    enhanced.category = this.categorizeLineItem(enhanced);

    return enhanced;
  }

  /**
   * Categorize a line item based on code and description
   */
  private categorizeLineItem(item: ExtractedLineItem): ExtractedLineItem['category'] {
    const desc = (item.description || item.rawText || '').toLowerCase();
    const code = item.code || '';

    // ER codes
    if (/^9928[1-5]$/.test(code) || desc.includes('emergency') || desc.includes(' er ')) {
      return 'er';
    }

    // Room & Board / Inpatient
    if (desc.includes('room') && desc.includes('board') || desc.includes('inpatient') || 
        desc.includes('icu') || desc.includes('admission')) {
      return 'inpatient';
    }

    // Labs
    if (/^8[0-9]{4}$/.test(code) || desc.includes('lab') || desc.includes('blood') ||
        desc.includes('panel') || desc.includes('test') || desc.includes('culture')) {
      return 'lab';
    }

    // Imaging
    if (/^7[0-9]{4}$/.test(code) || desc.includes('mri') || desc.includes('ct ') ||
        desc.includes('x-ray') || desc.includes('xray') || desc.includes('imaging') ||
        desc.includes('scan') || desc.includes('ultrasound')) {
      return 'imaging';
    }

    // Pharmacy
    if (desc.includes('pharmacy') || desc.includes('medication') || desc.includes('drug') ||
        desc.includes('rx ')) {
      return 'pharmacy';
    }

    // Facility fees
    if (desc.includes('facility') || desc.includes('hospital fee')) {
      return 'facility';
    }

    // Therapy
    if (desc.includes('therapy') || desc.includes('pulmonary') || desc.includes('respiratory') ||
        /^9[4-7][0-9]{3}$/.test(code)) {
      return 'therapy';
    }

    // Procedures
    if (/^[1-6][0-9]{4}$/.test(code)) {
      return 'procedure';
    }

    return 'other';
  }


  /**
   * Validate if line item has enough data
   */
  private isValidLineItem(item: ExtractedLineItem): boolean {
    return !!(item.description || item.code) && item.amount !== undefined && item.amount > 0;
  }

  /**
   * Extract medical code from text
   */
  private extractCode(text: string): string | undefined {
    // CPT codes (5 digits)
    const cptMatch = text.match(/\b(\d{5})\b/);
    if (cptMatch) return cptMatch[1];

    // ICD-10 codes
    const icdMatch = text.match(/\b([A-TV-Z]\d{2}\.?\d{0,4})\b/i);
    if (icdMatch) return icdMatch[1].toUpperCase();

    // HCPCS codes (letter + 4 digits)
    const hcpcsMatch = text.match(/\b([A-Z]\d{4})\b/i);
    if (hcpcsMatch) return hcpcsMatch[1].toUpperCase();

    // Revenue codes (4 digits starting with 0)
    const revMatch = text.match(/\b(0\d{3})\b/);
    if (revMatch) return revMatch[1];

    return undefined;
  }

  /**
   * Clean and normalize description text
   */
  private cleanDescription(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s\-\/\(\)\.&]/g, '')
      .trim()
      .substring(0, 200);
  }

  /**
   * Extract amount from raw text
   */
  private extractAmount(text: string): number | undefined {
    // Match currency amounts like $1,234.56 or 1234.56
    const match = text.match(/\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
    if (match) {
      const amount = parseFloat(match[1].replace(/,/g, ''));
      return isNaN(amount) ? undefined : amount;
    }
    return undefined;
  }

  /**
   * Extract date from text
   */
  extractDate(text: string): string | undefined {
    // MM/DD/YYYY or MM-DD-YYYY
    const match1 = text.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (match1) {
      const [, month, day, year] = match1;
      const fullYear = year.length === 2 ? `20${year}` : year;
      return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${fullYear}`;
    }

    // Month DD, YYYY
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const match2 = text.match(/([a-z]{3,})\s+(\d{1,2}),?\s*(\d{4})/i);
    if (match2) {
      const monthIdx = months.findIndex(m => match2[1].toLowerCase().startsWith(m));
      if (monthIdx >= 0) {
        return `${(monthIdx + 1).toString().padStart(2, '0')}/${match2[2].padStart(2, '0')}/${match2[3]}`;
      }
    }

    return undefined;
  }

  /**
   * Extract provider/hospital name from text
   */
  extractProvider(text: string): string | undefined {
    const patterns = [
      /(?:hospital|medical center|health system|clinic|healthcare)[\s:]+([A-Za-z\s]+)/i,
      /([A-Za-z\s]+)(?:hospital|medical center|health|clinic)/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].trim().substring(0, 100);
      }
    }

    return undefined;
  }

  /**
   * Extract account number from text
   */
  extractAccountNumber(text: string): string | undefined {
    const patterns = [
      /account\s*#?\s*:?\s*(\d{6,20})/i,
      /acct\s*#?\s*:?\s*(\d{6,20})/i,
      /patient\s*account\s*:?\s*(\d{6,20})/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return undefined;
  }

  /**
   * Detect insurance status from bill text
   */
  detectInsuranceStatus(text: string): DocumentMetadata['insuranceStatus'] {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('self-pay') || lowerText.includes('self pay') || 
        lowerText.includes('uninsured') || lowerText.includes('no insurance')) {
      return 'uninsured';
    }
    
    if (lowerText.includes('insurance') || lowerText.includes('copay') || 
        lowerText.includes('deductible') || lowerText.includes('coinsurance')) {
      return 'insured';
    }

    return 'unknown';
  }

  /**
   * Calculate total from line items
   */
  calculateTotal(lineItems: ExtractedLineItem[]): number {
    return lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  }

  /**
   * Calculate total adjustments
   */
  calculateAdjustments(adjustments: ExtractedAdjustment[]): number {
    return adjustments.reduce((sum, adj) => sum + Math.abs(adj.amount), 0);
  }

  /**
   * Validate document metadata
   */
  validateMetadata(metadata: DocumentMetadata): ProcessingError | null {
    if (!metadata.extractedAt) {
      return {
        code: ErrorCodes.PARSING_FAILED,
        message: 'Failed to extract document metadata',
        suggestion: 'Try uploading a clearer image of your bill',
        retryable: true
      };
    }
    return null;
  }

  /**
   * Detect duplicate charges
   */
  findDuplicates(lineItems: ExtractedLineItem[]): string[] {
    const duplicateIds: string[] = [];
    const seen = new Map<string, ExtractedLineItem>();

    for (const item of lineItems) {
      // Create key based on code + amount + date (if available)
      const key = `${item.code || ''}-${item.amount}-${item.date || ''}-${item.description?.substring(0, 30) || ''}`;
      
      if (seen.has(key)) {
        duplicateIds.push(item.id);
        const original = seen.get(key)!;
        if (!duplicateIds.includes(original.id)) {
          duplicateIds.push(original.id);
        }
      } else {
        seen.set(key, item);
      }
    }

    return duplicateIds;
  }

  /**
   * Detect visit type from line items and metadata
   */
  detectVisitType(lineItems: ExtractedLineItem[], rawText: string): DocumentMetadata['visitType'] {
    const text = rawText.toLowerCase();
    const hasERCodes = lineItems.some(item => /^9928[1-5]$/.test(item.code || ''));
    const hasRoomBoard = lineItems.some(item => 
      (item.description || '').toLowerCase().includes('room') && 
      (item.description || '').toLowerCase().includes('board')
    );

    if (text.includes('emergency') || text.includes(' er ') || hasERCodes) {
      if (hasRoomBoard) {
        return 'inpatient'; // ER that led to admission
      }
      return 'er';
    }

    if (hasRoomBoard || text.includes('admission') || text.includes('inpatient')) {
      return 'inpatient';
    }

    if (text.includes('outpatient')) {
      return 'outpatient';
    }

    if (text.includes('office visit') || lineItems.some(item => /^9921[1-5]$/.test(item.code || ''))) {
      return 'office';
    }

    return 'unknown';
  }
}

export const documentParser = new DocumentParser();
