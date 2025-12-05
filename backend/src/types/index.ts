// Document Processing Types
export interface DocumentProcessingRequest {
  fileKey: string;
  fileType: 'image' | 'pdf';
  bucketName: string;
}

export interface DocumentProcessingResponse {
  billId: string;
  lineItems: ExtractedLineItem[];
  adjustments: ExtractedAdjustment[];
  accounts?: BillAccount[];
  metadata: DocumentMetadata;
  confidence: number;
  status: ProcessingStatus;
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
  boundingBox?: BoundingBox;
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

export interface BoundingBox {
  width: number;
  height: number;
  left: number;
  top: number;
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

export enum ProcessingStatus {
  UPLOADED = 'uploaded',
  EXTRACTING = 'extracting',
  ANALYZING = 'analyzing',
  COMPLETE = 'complete',
  ERROR = 'error'
}

// API Response Types
export interface UploadUrlResponse {
  uploadUrl: string;
  fileKey: string;
  billId: string;
  expiresIn: number;
}

export interface ProcessingStatusResponse {
  billId: string;
  status: ProcessingStatus;
  progress: number;
  lineItemsProcessed: number;
  totalLineItems: number;
  error?: string;
}

// Error Types
export interface ProcessingError {
  code: string;
  message: string;
  suggestion: string;
  retryable: boolean;
}

export const ErrorCodes = {
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  TEXTRACT_FAILED: 'TEXTRACT_FAILED',
  PARSING_FAILED: 'PARSING_FAILED',
  S3_ERROR: 'S3_ERROR',
  TIMEOUT: 'TIMEOUT'
} as const;
