/**
 * Security Middleware
 * Implements security headers and request validation
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Security headers for all responses
export const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};

// CORS headers
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400'
};

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(
  response: APIGatewayProxyResult
): APIGatewayProxyResult {
  return {
    ...response,
    headers: {
      ...SECURITY_HEADERS,
      ...CORS_HEADERS,
      ...response.headers
    }
  };
}

/**
 * Validate request origin
 */
export function validateOrigin(event: APIGatewayProxyEvent): boolean {
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '*').split(',');
  const origin = event.headers?.origin || event.headers?.Origin;
  
  if (allowedOrigins.includes('*')) return true;
  if (!origin) return false;
  
  return allowedOrigins.some(allowed => origin.startsWith(allowed));
}

/**
 * Rate limiting check (simple in-memory for demo)
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

export function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(clientIp);
  
  if (!record || now > record.resetTime) {
    requestCounts.set(clientIp, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

/**
 * Get client IP from event
 */
export function getClientIp(event: APIGatewayProxyEvent): string {
  return event.requestContext?.identity?.sourceIp || 
         event.headers?.['X-Forwarded-For']?.split(',')[0] || 
         'unknown';
}

/**
 * Sanitize input string
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .substring(0, 10000); // Max length
}

/**
 * Validate file upload request
 */
export function validateUploadRequest(body: any): { valid: boolean; error?: string } {
  if (!body) {
    return { valid: false, error: 'Request body is required' };
  }

  const { contentType, fileSize } = body;

  // Validate content type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (!contentType || !allowedTypes.includes(contentType)) {
    return { valid: false, error: 'Invalid file type. Allowed: JPG, PNG, PDF' };
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (fileSize && fileSize > maxSize) {
    return { valid: false, error: 'File too large. Maximum size: 10MB' };
  }

  return { valid: true };
}

export default {
  SECURITY_HEADERS,
  CORS_HEADERS,
  applySecurityHeaders,
  validateOrigin,
  checkRateLimit,
  getClientIp,
  sanitizeInput,
  validateUploadRequest
};
