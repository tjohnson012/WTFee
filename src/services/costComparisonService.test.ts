import { describe, it, expect } from 'vitest';
import {
  compareItemCost,
  detectDuplicates,
  analyzeBill,
  formatCurrency
} from './costComparisonService';
import { ExtractedLineItem } from './api';

describe('Cost Comparison Service', () => {
  describe('compareItemCost', () => {
    it('should return fair rating for reasonable prices', () => {
      const item: ExtractedLineItem = {
        id: '1',
        rawText: 'Office Visit',
        code: '99213',
        amount: 130,
        confidence: 95
      };
      
      const result = compareItemCost(item);
      expect(result).not.toBeNull();
      expect(result?.priceRating).toBe('fair');
    });

    it('should flag high prices', () => {
      const item: ExtractedLineItem = {
        id: '2',
        rawText: 'Office Visit',
        code: '99213',
        amount: 250,
        confidence: 95
      };
      
      const result = compareItemCost(item);
      expect(result?.priceRating).toBe('very-high');
    });

    it('should flag extreme prices', () => {
      const item: ExtractedLineItem = {
        id: '3',
        rawText: 'Blood Draw',
        code: '36415',
        amount: 150,
        confidence: 95
      };
      
      const result = compareItemCost(item);
      expect(result?.priceRating).toBe('extreme');
    });
  });

  describe('detectDuplicates', () => {
    it('should detect duplicate charges', () => {
      const items: ExtractedLineItem[] = [
        { id: '1', rawText: 'Visit', code: '99213', amount: 130, confidence: 95 },
        { id: '2', rawText: 'Visit', code: '99213', amount: 130, confidence: 95 },
      ];
      
      const duplicates = detectDuplicates(items);
      expect(duplicates.length).toBe(1);
      expect(duplicates[0]).toContain('1');
      expect(duplicates[0]).toContain('2');
    });

    it('should not flag different charges as duplicates', () => {
      const items: ExtractedLineItem[] = [
        { id: '1', rawText: 'Visit', code: '99213', amount: 130, confidence: 95 },
        { id: '2', rawText: 'Lab', code: '80053', amount: 200, confidence: 95 },
      ];
      
      const duplicates = detectDuplicates(items);
      expect(duplicates.length).toBe(0);
    });
  });

  describe('analyzeBill', () => {
    it('should analyze a complete bill', () => {
      const items: ExtractedLineItem[] = [
        { id: '1', rawText: 'Visit', code: '99213', amount: 130, confidence: 95 },
        { id: '2', rawText: 'Lab', code: '80053', amount: 150, confidence: 95 },
      ];
      
      const result = analyzeBill(items);
      expect(result.totalCharged).toBe(280);
      expect(result.comparisons.length).toBe(2);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
    });
  });
});
