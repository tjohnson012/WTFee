import { describe, it, expect } from 'vitest';
import {
  sanitizeInput,
  isValidFileType,
  isValidFileSize,
  redactPII,
  generateSecureId
} from './security';

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('should escape HTML characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
      );
    });

    it('should handle empty input', () => {
      expect(sanitizeInput('')).toBe('');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });
  });

  describe('isValidFileType', () => {
    it('should accept valid file types', () => {
      const jpegFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const pngFile = new File([''], 'test.png', { type: 'image/png' });
      const pdfFile = new File([''], 'test.pdf', { type: 'application/pdf' });
      
      expect(isValidFileType(jpegFile)).toBe(true);
      expect(isValidFileType(pngFile)).toBe(true);
      expect(isValidFileType(pdfFile)).toBe(true);
    });

    it('should reject invalid file types', () => {
      const exeFile = new File([''], 'test.exe', { type: 'application/x-msdownload' });
      expect(isValidFileType(exeFile)).toBe(false);
    });
  });

  describe('isValidFileSize', () => {
    it('should accept files under limit', () => {
      const smallFile = new File(['x'.repeat(1000)], 'small.txt');
      expect(isValidFileSize(smallFile, 10)).toBe(true);
    });

    it('should reject files over limit', () => {
      const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.txt');
      expect(isValidFileSize(largeFile, 10)).toBe(false);
    });
  });

  describe('redactPII', () => {
    it('should redact SSN', () => {
      expect(redactPII('SSN: 123-45-6789')).toBe('SSN: [SSN REDACTED]');
    });

    it('should redact email', () => {
      expect(redactPII('Email: test@example.com')).toBe('Email: [EMAIL REDACTED]');
    });

    it('should redact credit card', () => {
      expect(redactPII('Card: 1234-5678-9012-3456')).toBe('Card: [CARD REDACTED]');
    });
  });

  describe('generateSecureId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateSecureId();
      const id2 = generateSecureId();
      
      expect(id1).not.toBe(id2);
      expect(id1.length).toBe(32);
    });
  });
});
