/**
 * WTFee API Service
 * Handles communication with AWS backend for document processing
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Types matching backend
export interface UploadUrlResponse {
  uploadUrl: string;
  fileKey: string;
  billId: string;
  expiresIn: number;
}

export interface ExtractedLineItem {
  id: string;
  rawText: string;
  code?: string;
  description?: string;
  amount?: number;
  date?: string;
  quantity?: number;
  unitPrice?: number;
  confidence: number;
  isDuplicate?: boolean;
  category?: 'er' | 'inpatient' | 'lab' | 'imaging' | 'pharmacy' | 'facility' | 'procedure' | 'therapy' | 'other';
}

export interface ExtractedAdjustment {
  id: string;
  code?: string;
  name: string;
  amount: number;
  rawText: string;
  confidence: number;
}

export interface DocumentMetadata {
  provider?: string;
  providerSystem?: string;
  patientName?: string;
  patientDOB?: string;
  serviceDate?: string;
  serviceDateEnd?: string;
  totalAmount?: number;
  totalAdjustments?: number;
  totalOwed?: number;
  accountNumber?: string;
  accountNumbers?: string[];
  mrn?: string;
  pageCount: number;
  extractedAt: string;
  visitType?: 'er' | 'inpatient' | 'outpatient' | 'office' | 'unknown';
  daysInHospital?: number;
  insuranceStatus?: 'insured' | 'uninsured' | 'underinsured' | 'unknown';
  state?: string;
  region?: string;
}

export interface BillAccount {
  accountNumber: string;
  serviceDate?: string;
  serviceDateEnd?: string;
  description?: string;
  totalCharged: number;
  totalAdjustments: number;
  totalOwed: number;
  lineItems: ExtractedLineItem[];
  adjustments: ExtractedAdjustment[];
}

export interface ProcessingResponse {
  billId: string;
  lineItems: ExtractedLineItem[];
  adjustments: ExtractedAdjustment[];
  accounts?: BillAccount[];
  metadata: DocumentMetadata;
  confidence: number;
  status: ProcessingStatus;
}

export interface ProcessingStatusResponse {
  billId: string;
  status: ProcessingStatus;
  progress: number;
  lineItemsProcessed: number;
  totalLineItems: number;
  error?: string;
}

export enum ProcessingStatus {
  UPLOADED = 'uploaded',
  EXTRACTING = 'extracting',
  ANALYZING = 'analyzing',
  COMPLETE = 'complete',
  ERROR = 'error'
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  suggestion: string;
  retryable: boolean;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Get a presigned URL for uploading a document
   */
  async getUploadUrl(file: File): Promise<UploadUrlResponse> {
    const response = await fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileType: file.type,
        contentType: file.type,
        fileSize: file.size
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiServiceError(error.error || 'Failed to get upload URL');
    }

    return response.json();
  }

  /**
   * Upload file directly to S3 using presigned URL
   */
  async uploadToS3(uploadUrl: string, file: File): Promise<void> {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file
    });

    if (!response.ok) {
      throw new Error('Failed to upload file to S3');
    }
  }

  /**
   * Process an uploaded document with Textract
   */
  async processDocument(billId: string, fileKey: string): Promise<ProcessingResponse> {
    const response = await fetch(`${this.baseUrl}/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId, fileKey })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiServiceError(error.error || 'Failed to process document');
    }

    return response.json();
  }

  /**
   * Get processing status for a bill
   */
  async getProcessingStatus(billId: string): Promise<ProcessingStatusResponse> {
    const response = await fetch(`${this.baseUrl}/status/${billId}`);

    if (!response.ok) {
      throw new Error('Failed to get processing status');
    }

    return response.json();
  }

  /**
   * Full upload and process flow
   */
  async uploadAndProcess(
    file: File,
    onProgress?: (status: string, progress: number) => void
  ): Promise<ProcessingResponse> {
    // Step 1: Get upload URL
    onProgress?.('Preparing upload...', 10);
    const { uploadUrl, fileKey, billId } = await this.getUploadUrl(file);

    // Step 2: Upload to S3
    onProgress?.('Uploading document...', 30);
    await this.uploadToS3(uploadUrl, file);

    // Step 3: Process with Textract
    onProgress?.('Analyzing document...', 60);
    const result = await this.processDocument(billId, fileKey);

    onProgress?.('Processing complete!', 100);
    return result;
  }
}

// Custom error class
class ApiServiceError extends Error {
  constructor(public errorData: ApiErrorResponse | string) {
    super(typeof errorData === 'string' ? errorData : errorData.message);
    this.name = 'ApiServiceError';
  }
}

export const apiService = new ApiService();
export default apiService;
