/**
 * Error Handling Utilities
 * Comprehensive error handling with user-friendly messages and recovery strategies
 */

export enum ErrorCode {
  // Upload errors
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  
  // Processing errors
  OCR_FAILED = 'OCR_FAILED',
  PARSING_FAILED = 'PARSING_FAILED',
  NO_TEXT_FOUND = 'NO_TEXT_FOUND',
  
  // API errors
  API_UNAVAILABLE = 'API_UNAVAILABLE',
  RATE_LIMITED = 'RATE_LIMITED',
  TIMEOUT = 'TIMEOUT',
  
  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  OFFLINE = 'OFFLINE',
  
  // General errors
  UNKNOWN = 'UNKNOWN'
}

export interface AppError {
  code: ErrorCode;
  message: string;
  userMessage: string;
  suggestion: string;
  retryable: boolean;
  retryDelay?: number;
}

// Error definitions with user-friendly messages
const errorDefinitions: Record<ErrorCode, Omit<AppError, 'code'>> = {
  [ErrorCode.FILE_TOO_LARGE]: {
    message: 'File exceeds maximum size limit',
    userMessage: '📦 This file is too large for our spirits to handle!',
    suggestion: 'Please upload a file smaller than 10MB. Try compressing the image or splitting the PDF.',
    retryable: false
  },
  [ErrorCode.INVALID_FILE_TYPE]: {
    message: 'Invalid file type',
    userMessage: '📜 The spirits only accept certain sacred scrolls!',
    suggestion: 'Please upload a PDF, JPG, or PNG file of your medical bill.',
    retryable: false
  },
  [ErrorCode.UPLOAD_FAILED]: {
    message: 'File upload failed',
    userMessage: '👻 The upload got lost in the spirit realm!',
    suggestion: 'Please try uploading again. If the problem persists, try a different file.',
    retryable: true,
    retryDelay: 2000
  },
  [ErrorCode.OCR_FAILED]: {
    message: 'OCR processing failed',
    userMessage: '🔮 The spirits couldn\'t read your bill clearly!',
    suggestion: 'Try uploading a clearer image. Make sure the text is readable and well-lit.',
    retryable: true,
    retryDelay: 3000
  },
  [ErrorCode.PARSING_FAILED]: {
    message: 'Failed to parse document',
    userMessage: '📋 We found text but couldn\'t decode the billing runes!',
    suggestion: 'This bill format may be unusual. Try uploading a different page or a clearer image.',
    retryable: true,
    retryDelay: 2000
  },
  [ErrorCode.NO_TEXT_FOUND]: {
    message: 'No text found in document',
    userMessage: '👁️ The spirits see nothing but darkness!',
    suggestion: 'Make sure you uploaded an actual medical bill with visible text, not a blank page.',
    retryable: false
  },
  [ErrorCode.API_UNAVAILABLE]: {
    message: 'API service unavailable',
    userMessage: '🌙 Our mystical services are temporarily resting!',
    suggestion: 'We\'re using backup explanations. Full analysis will return shortly.',
    retryable: true,
    retryDelay: 5000
  },
  [ErrorCode.RATE_LIMITED]: {
    message: 'Rate limit exceeded',
    userMessage: '⏳ Too many requests! The spirits need a moment to recover.',
    suggestion: 'Please wait a moment before trying again.',
    retryable: true,
    retryDelay: 10000
  },
  [ErrorCode.TIMEOUT]: {
    message: 'Request timed out',
    userMessage: '⌛ The spirits took too long to respond!',
    suggestion: 'Please try again. If this keeps happening, try a smaller file.',
    retryable: true,
    retryDelay: 3000
  },
  [ErrorCode.NETWORK_ERROR]: {
    message: 'Network error',
    userMessage: '🌐 Lost connection to the spirit realm!',
    suggestion: 'Check your internet connection and try again.',
    retryable: true,
    retryDelay: 2000
  },
  [ErrorCode.OFFLINE]: {
    message: 'No internet connection',
    userMessage: '📡 You appear to be offline!',
    suggestion: 'Please check your internet connection and try again when connected.',
    retryable: true,
    retryDelay: 5000
  },
  [ErrorCode.UNKNOWN]: {
    message: 'Unknown error',
    userMessage: '👻 Something mysterious went wrong!',
    suggestion: 'Please try again. If the problem persists, refresh the page.',
    retryable: true,
    retryDelay: 2000
  }
};

/**
 * Create an AppError from an error code
 */
export function createError(code: ErrorCode): AppError {
  return {
    code,
    ...errorDefinitions[code]
  };
}

/**
 * Parse an unknown error into an AppError
 */
export function parseError(error: unknown): AppError {
  if (error instanceof Error) {
    // Check for specific error types
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return createError(ErrorCode.NETWORK_ERROR);
    }
    if (error.message.includes('timeout')) {
      return createError(ErrorCode.TIMEOUT);
    }
    if (error.message.includes('rate limit') || error.message.includes('429')) {
      return createError(ErrorCode.RATE_LIMITED);
    }
  }
  
  return createError(ErrorCode.UNKNOWN);
}

/**
 * Check if user is online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

export default {
  ErrorCode,
  createError,
  parseError,
  isOnline,
  retryWithBackoff
};
