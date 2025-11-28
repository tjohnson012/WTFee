import {
  TextractClient,
  AnalyzeDocumentCommand,
  AnalyzeExpenseCommand,
  Block,
  ExpenseDocument,
  FeatureType
} from '@aws-sdk/client-textract';
import { ExtractedLineItem, DocumentMetadata, BoundingBox } from '../types';
import { v4 as uuidv4 } from 'uuid';

const textractClient = new TextractClient({
  region: process.env.AWS_REGION || 'us-east-1'
});

export class TextractService {
  /**
   * Analyze a medical bill document using AWS Textract
   * Uses AnalyzeExpense for better extraction of line items and amounts
   */
  async analyzeDocument(
    bucketName: string,
    fileKey: string
  ): Promise<{ lineItems: ExtractedLineItem[]; metadata: DocumentMetadata }> {
    try {
      // First try AnalyzeExpense for better invoice/bill parsing
      const expenseResult = await this.analyzeExpense(bucketName, fileKey);
      
      if (expenseResult.lineItems.length > 0) {
        return expenseResult;
      }

      // Fallback to general document analysis
      return await this.analyzeGenericDocument(bucketName, fileKey);
    } catch (error) {
      console.error('Textract analysis failed:', error);
      throw error;
    }
  }

  /**
   * Use AnalyzeExpense API for invoice/receipt-like documents
   */
  private async analyzeExpense(
    bucketName: string,
    fileKey: string
  ): Promise<{ lineItems: ExtractedLineItem[]; metadata: DocumentMetadata }> {
    const command = new AnalyzeExpenseCommand({
      Document: {
        S3Object: {
          Bucket: bucketName,
          Name: fileKey
        }
      }
    });

    const response = await textractClient.send(command);
    const lineItems: ExtractedLineItem[] = [];
    const metadata: DocumentMetadata = {
      pageCount: response.ExpenseDocuments?.length || 1,
      extractedAt: new Date().toISOString()
    };

    if (response.ExpenseDocuments) {
      for (const doc of response.ExpenseDocuments) {
        // Extract summary fields (provider, total, etc.)
        this.extractSummaryFields(doc, metadata);
        
        // Extract line items
        const items = this.extractExpenseLineItems(doc);
        lineItems.push(...items);
      }
    }

    return { lineItems, metadata };
  }

  /**
   * Extract summary fields from expense document
   */
  private extractSummaryFields(doc: ExpenseDocument, metadata: DocumentMetadata): void {
    if (!doc.SummaryFields) return;

    for (const field of doc.SummaryFields) {
      const fieldType = field.Type?.Text?.toUpperCase();
      const value = field.ValueDetection?.Text;

      if (!fieldType || !value) continue;

      switch (fieldType) {
        case 'VENDOR_NAME':
        case 'SUPPLIER_NAME':
          metadata.provider = value;
          break;
        case 'TOTAL':
        case 'AMOUNT_DUE':
          metadata.totalAmount = this.parseAmount(value);
          break;
        case 'INVOICE_RECEIPT_DATE':
        case 'SERVICE_DATE':
          metadata.serviceDate = value;
          break;
        case 'ACCOUNT_NUMBER':
        case 'INVOICE_RECEIPT_ID':
          metadata.accountNumber = value;
          break;
      }
    }
  }

  /**
   * Extract line items from expense document
   */
  private extractExpenseLineItems(doc: ExpenseDocument): ExtractedLineItem[] {
    const lineItems: ExtractedLineItem[] = [];

    if (!doc.LineItemGroups) return lineItems;

    for (const group of doc.LineItemGroups) {
      if (!group.LineItems) continue;

      for (const item of group.LineItems) {
        const lineItem: ExtractedLineItem = {
          id: uuidv4(),
          rawText: '',
          confidence: 0
        };

        let confidenceSum = 0;
        let confidenceCount = 0;

        if (item.LineItemExpenseFields) {
          for (const field of item.LineItemExpenseFields) {
            const fieldType = field.Type?.Text?.toUpperCase();
            const value = field.ValueDetection?.Text;
            const confidence = field.ValueDetection?.Confidence || 0;

            confidenceSum += confidence;
            confidenceCount++;

            if (!fieldType || !value) continue;

            switch (fieldType) {
              case 'ITEM':
              case 'DESCRIPTION':
              case 'PRODUCT_CODE':
                lineItem.description = value;
                lineItem.rawText += value + ' ';
                break;
              case 'PRICE':
              case 'UNIT_PRICE':
                lineItem.unitPrice = this.parseAmount(value);
                break;
              case 'QUANTITY':
                lineItem.quantity = parseInt(value, 10) || 1;
                break;
              case 'EXPENSE_ROW':
                lineItem.amount = this.parseAmount(value);
                break;
            }
          }
        }

        // Try to extract medical codes from description
        if (lineItem.description) {
          lineItem.code = this.extractMedicalCode(lineItem.description);
        }

        // Calculate amount if not directly available
        if (!lineItem.amount && lineItem.unitPrice) {
          lineItem.amount = lineItem.unitPrice * (lineItem.quantity || 1);
        }

        lineItem.confidence = confidenceCount > 0 ? confidenceSum / confidenceCount : 0;
        lineItem.rawText = lineItem.rawText.trim();

        if (lineItem.description || lineItem.amount) {
          lineItems.push(lineItem);
        }
      }
    }

    return lineItems;
  }

  /**
   * Fallback: Use general document analysis with TABLES and FORMS
   */
  private async analyzeGenericDocument(
    bucketName: string,
    fileKey: string
  ): Promise<{ lineItems: ExtractedLineItem[]; metadata: DocumentMetadata }> {
    const command = new AnalyzeDocumentCommand({
      Document: {
        S3Object: {
          Bucket: bucketName,
          Name: fileKey
        }
      },
      FeatureTypes: [FeatureType.TABLES, FeatureType.FORMS]
    });

    const response = await textractClient.send(command);
    const lineItems: ExtractedLineItem[] = [];
    const metadata: DocumentMetadata = {
      pageCount: 1,
      extractedAt: new Date().toISOString()
    };

    if (response.Blocks) {
      // Extract from tables
      const tableItems = this.extractFromTables(response.Blocks);
      lineItems.push(...tableItems);

      // Extract key-value pairs for metadata
      this.extractKeyValuePairs(response.Blocks, metadata);
    }

    return { lineItems, metadata };
  }

  /**
   * Extract line items from table structures
   */
  private extractFromTables(blocks: Block[]): ExtractedLineItem[] {
    const lineItems: ExtractedLineItem[] = [];
    const cellMap = new Map<string, Block>();
    const tableMap = new Map<string, Block[]>();

    // Build maps for cells and tables
    for (const block of blocks) {
      if (block.BlockType === 'CELL' && block.Id) {
        cellMap.set(block.Id, block);
      }
      if (block.BlockType === 'TABLE' && block.Relationships) {
        const cells: Block[] = [];
        for (const rel of block.Relationships) {
          if (rel.Type === 'CHILD' && rel.Ids) {
            for (const id of rel.Ids) {
              const cell = cellMap.get(id);
              if (cell) cells.push(cell);
            }
          }
        }
        if (block.Id) tableMap.set(block.Id, cells);
      }
    }

    // Process each table
    for (const [tableId, cells] of tableMap) {
      const rows = this.organizeCellsIntoRows(cells, blocks);
      
      // Skip header row, process data rows
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length >= 2) {
          const lineItem = this.parseTableRow(row);
          if (lineItem) lineItems.push(lineItem);
        }
      }
    }

    return lineItems;
  }

  /**
   * Organize cells into rows based on row index
   */
  private organizeCellsIntoRows(cells: Block[], allBlocks: Block[]): string[][] {
    const rowMap = new Map<number, { col: number; text: string }[]>();

    for (const cell of cells) {
      const rowIndex = cell.RowIndex || 0;
      const colIndex = cell.ColumnIndex || 0;
      const text = this.getCellText(cell, allBlocks);

      if (!rowMap.has(rowIndex)) {
        rowMap.set(rowIndex, []);
      }
      rowMap.get(rowIndex)!.push({ col: colIndex, text });
    }

    // Sort and convert to array
    const sortedRows = Array.from(rowMap.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([_, cols]) => 
        cols.sort((a, b) => a.col - b.col).map(c => c.text)
      );

    return sortedRows;
  }

  /**
   * Get text content from a cell block
   */
  private getCellText(cell: Block, allBlocks: Block[]): string {
    if (!cell.Relationships) return '';

    const texts: string[] = [];
    for (const rel of cell.Relationships) {
      if (rel.Type === 'CHILD' && rel.Ids) {
        for (const id of rel.Ids) {
          const childBlock = allBlocks.find(b => b.Id === id);
          if (childBlock?.BlockType === 'WORD' && childBlock.Text) {
            texts.push(childBlock.Text);
          }
        }
      }
    }
    return texts.join(' ');
  }

  /**
   * Parse a table row into a line item
   */
  private parseTableRow(row: string[]): ExtractedLineItem | null {
    // Common medical bill formats:
    // [Code, Description, Amount] or [Date, Description, Amount] or [Description, Amount]
    
    let description = '';
    let amount: number | undefined;
    let code: string | undefined;
    let date: string | undefined;

    for (const cell of row) {
      const trimmed = cell.trim();
      
      // Check if it's an amount
      const parsedAmount = this.parseAmount(trimmed);
      if (parsedAmount !== undefined && parsedAmount > 0) {
        amount = parsedAmount;
        continue;
      }

      // Check if it's a medical code
      const extractedCode = this.extractMedicalCode(trimmed);
      if (extractedCode && !code) {
        code = extractedCode;
        continue;
      }

      // Check if it's a date
      if (this.isDate(trimmed)) {
        date = trimmed;
        continue;
      }

      // Otherwise, it's likely description
      if (trimmed.length > 2) {
        description += (description ? ' ' : '') + trimmed;
      }
    }

    if (!description && !amount) return null;

    return {
      id: uuidv4(),
      rawText: row.join(' '),
      code,
      description: description || undefined,
      amount,
      date,
      confidence: 85 // Default confidence for table extraction
    };
  }

  /**
   * Extract key-value pairs for metadata
   */
  private extractKeyValuePairs(blocks: Block[], metadata: DocumentMetadata): void {
    const keyValuePairs = new Map<string, string>();

    for (const block of blocks) {
      if (block.BlockType === 'KEY_VALUE_SET' && block.EntityTypes?.includes('KEY')) {
        const key = this.getBlockText(block, blocks);
        const valueBlock = this.findValueBlock(block, blocks);
        if (valueBlock) {
          const value = this.getBlockText(valueBlock, blocks);
          keyValuePairs.set(key.toLowerCase(), value);
        }
      }
    }

    // Map to metadata
    for (const [key, value] of keyValuePairs) {
      if (key.includes('provider') || key.includes('facility') || key.includes('hospital')) {
        metadata.provider = value;
      } else if (key.includes('total') || key.includes('amount due') || key.includes('balance')) {
        metadata.totalAmount = this.parseAmount(value);
      } else if (key.includes('date') || key.includes('service')) {
        metadata.serviceDate = value;
      } else if (key.includes('account') || key.includes('patient id')) {
        metadata.accountNumber = value;
      }
    }
  }

  /**
   * Get text from a block and its children
   */
  private getBlockText(block: Block, allBlocks: Block[]): string {
    if (!block.Relationships) return block.Text || '';

    const texts: string[] = [];
    for (const rel of block.Relationships) {
      if (rel.Type === 'CHILD' && rel.Ids) {
        for (const id of rel.Ids) {
          const child = allBlocks.find(b => b.Id === id);
          if (child?.Text) texts.push(child.Text);
        }
      }
    }
    return texts.join(' ');
  }

  /**
   * Find the value block for a key block
   */
  private findValueBlock(keyBlock: Block, allBlocks: Block[]): Block | null {
    if (!keyBlock.Relationships) return null;

    for (const rel of keyBlock.Relationships) {
      if (rel.Type === 'VALUE' && rel.Ids?.[0]) {
        return allBlocks.find(b => b.Id === rel.Ids![0]) || null;
      }
    }
    return null;
  }

  /**
   * Parse amount string to number
   */
  private parseAmount(text: string): number | undefined {
    if (!text) return undefined;
    
    // Remove currency symbols and commas
    const cleaned = text.replace(/[$,]/g, '').trim();
    const match = cleaned.match(/(\d+\.?\d*)/);
    
    if (match) {
      const amount = parseFloat(match[1]);
      return isNaN(amount) ? undefined : amount;
    }
    return undefined;
  }

  /**
   * Extract medical codes (CPT, ICD-10, HCPCS)
   */
  private extractMedicalCode(text: string): string | undefined {
    // CPT codes: 5 digits
    const cptMatch = text.match(/\b(\d{5})\b/);
    if (cptMatch) return cptMatch[1];

    // ICD-10 codes: Letter followed by digits and optional decimal
    const icdMatch = text.match(/\b([A-Z]\d{2}\.?\d{0,4})\b/i);
    if (icdMatch) return icdMatch[1].toUpperCase();

    // HCPCS codes: Letter followed by 4 digits
    const hcpcsMatch = text.match(/\b([A-Z]\d{4})\b/i);
    if (hcpcsMatch) return hcpcsMatch[1].toUpperCase();

    return undefined;
  }

  /**
   * Check if string looks like a date
   */
  private isDate(text: string): boolean {
    const datePatterns = [
      /^\d{1,2}\/\d{1,2}\/\d{2,4}$/,
      /^\d{1,2}-\d{1,2}-\d{2,4}$/,
      /^\d{4}-\d{2}-\d{2}$/
    ];
    return datePatterns.some(p => p.test(text.trim()));
  }
}

export const textractService = new TextractService();
