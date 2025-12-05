/**
 * Security Utilities
 * Handles data sanitization, validation, and privacy protection
 */

// Input validation patterns
const PATTERNS = {
  // Matches potential PII patterns
  SSN: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g,
  PHONE: /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  EMAIL: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  CREDIT_CARD: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
  DATE_OF_BIRTH: /\b(0[1-9]|1[0-2])[\/\-](0[1-9]|[12]\d|3[01])[\/\-](19|20)\d{2}\b/g,
};

/**
 * Sanitize text input to remove potential XSS vectors
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validate file type for upload
 */
export function isValidFileType(file: File): boolean {
  const validTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'application/pdf'
  ];
  return validTypes.includes(file.type);
}

/**
 * Validate file size (max 10MB)
 */
export function isValidFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}

/**
 * Redact PII from text for logging/display
 */
export function redactPII(text: string): string {
  let redacted = text;
  
  redacted = redacted.replace(PATTERNS.SSN, '[SSN REDACTED]');
  redacted = redacted.replace(PATTERNS.CREDIT_CARD, '[CARD REDACTED]');
  redacted = redacted.replace(PATTERNS.EMAIL, '[EMAIL REDACTED]');
  redacted = redacted.replace(PATTERNS.PHONE, '[PHONE REDACTED]');
  
  return redacted;
}


/**
 * Session data manager - handles automatic cleanup
 */
class SessionDataManager {
  private sessionData: Map<string, any> = new Map();
  private cleanupTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();
  private readonly DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes

  /**
   * Store data with automatic expiration
   */
  set(key: string, value: any, ttlMs: number = this.DEFAULT_TTL): void {
    // Clear existing timer if any
    this.clearTimer(key);
    
    // Store the data
    this.sessionData.set(key, value);
    
    // Set cleanup timer
    const timer = setTimeout(() => {
      this.delete(key);
    }, ttlMs);
    
    this.cleanupTimers.set(key, timer);
  }

  /**
   * Get data if not expired
   */
  get<T>(key: string): T | undefined {
    return this.sessionData.get(key) as T | undefined;
  }

  /**
   * Delete data and clear timer
   */
  delete(key: string): void {
    this.clearTimer(key);
    this.sessionData.delete(key);
  }

  /**
   * Clear all session data
   */
  clearAll(): void {
    this.cleanupTimers.forEach((timer) => clearTimeout(timer));
    this.cleanupTimers.clear();
    this.sessionData.clear();
  }

  private clearTimer(key: string): void {
    const timer = this.cleanupTimers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.cleanupTimers.delete(key);
    }
  }
}

export const sessionManager = new SessionDataManager();

/**
 * Clear sensitive data from memory
 */
export function clearSensitiveData(obj: any): void {
  if (!obj) return;
  
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'string') {
        obj[key] = '';
      } else if (typeof obj[key] === 'object') {
        clearSensitiveData(obj[key]);
      }
    });
  }
}

/**
 * Generate a secure random ID
 */
export function generateSecureId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Check if running in secure context (HTTPS)
 */
export function isSecureContext(): boolean {
  return window.isSecureContext || window.location.protocol === 'https:';
}

/**
 * Privacy notice content
 */
export const PRIVACY_NOTICE = {
  title: 'Your Privacy Matters',
  points: [
    'Your medical bill is processed locally and temporarily',
    'No personal health information is permanently stored',
    'Data is automatically deleted after your session ends',
    'We do not share your information with third parties',
    'All data transmission is encrypted'
  ]
};

export default {
  sanitizeInput,
  isValidFileType,
  isValidFileSize,
  redactPII,
  sessionManager,
  clearSensitiveData,
  generateSecureId,
  isSecureContext,
  PRIVACY_NOTICE
};
