import { ExtractedLineItem, DocumentMetadata, ProcessingError, ErrorCodes } from '../types';

/**
 * Document Parser Service
 * Handles post-processing of Textract results to extract structured medical bill data
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
   * Enhance a line item with additional parsing
   */
  private enhanceLineItem(item: ExtractedLineItem): ExtractedLineItem {
    const enhanced = { ...item };

    // Try to extract code if not present
    if (!enhanced.code && enhanced.description) {
      enhanced.code = this.extractCode(enhanced.description);
    }

    // Clean up description
    if (enhanced.description) {
      enhanced.description = this.cleanDescription(enhanced.description);
    }

    // Normalize amount
    if (enhanced.rawText && !enhanced.amount) {
      enhanced.amount = this.extractAmount(enhanced.rawText);
    }

    return enhanced;
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

    return undefined;
  }

  /**
   * Clean and normalize description text
   */
  private cleanDescription(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s\-\/\(\)\.]/g, '')
      .trim()
      .substring(0, 200);
  }

  /**
   * Extract amount from raw text
   */
  private extractAmount(text: string): number | undefined {
    const match = text.match(/\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
    if (match) {
      const amount = parseFloat(match[1].replace(/,/g, ''));
      return isNaN(amount) ? undefined : amount;
    }
    return undefined;
  }

  /**
   * Calculate total from line items
   */
  calculateTotal(lineItems: ExtractedLineItem[]): number {
    return lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
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
      const key = `${item.code || ''}-${item.amount}-${item.description?.substring(0, 20)}`;
      
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
}

export const documentParser = new DocumentParser();
