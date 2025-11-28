/**
 * Mock API Service for local development and demo mode
 * Simulates AWS Textract responses with realistic medical bill data
 */

import {
  ProcessingResponse,
  ExtractedLineItem,
  DocumentMetadata,
  ProcessingStatus
} from './api';

// Sample medical bill line items for demo
const sampleLineItems: ExtractedLineItem[] = [
  {
    id: '1',
    rawText: '99213 Office Visit Level 3 $185.00',
    code: '99213',
    description: 'Office/Outpatient Visit, Established Patient (Level 3)',
    amount: 185.00,
    date: '10/15/2024',
    confidence: 95
  },
  {
    id: '2',
    rawText: '36415 Venipuncture $45.00',
    code: '36415',
    description: 'Collection of venous blood by venipuncture',
    amount: 45.00,
    date: '10/15/2024',
    confidence: 92
  },
  {
    id: '3',
    rawText: '80053 Comprehensive Metabolic Panel $287.00',
    code: '80053',
    description: 'Comprehensive Metabolic Panel (14 tests)',
    amount: 287.00,
    date: '10/15/2024',
    confidence: 94
  },
  {
    id: '4',
    rawText: '85025 Complete Blood Count $156.00',
    code: '85025',
    description: 'Complete Blood Count (CBC) with Differential',
    amount: 156.00,
    date: '10/15/2024',
    confidence: 93
  },
  {
    id: '5',
    rawText: 'Facility Fee $425.00',
    description: 'Hospital Facility Fee - Outpatient Services',
    amount: 425.00,
    date: '10/15/2024',
    confidence: 88,
    isDuplicate: false
  }
,
  {
    id: '6',
    rawText: '99213 Office Visit Level 3 $185.00',
    code: '99213',
    description: 'Office/Outpatient Visit, Established Patient (Level 3)',
    amount: 185.00,
    date: '10/15/2024',
    confidence: 95,
    isDuplicate: true // Duplicate charge!
  },
  {
    id: '7',
    rawText: '81001 Urinalysis $78.00',
    code: '81001',
    description: 'Urinalysis, by dip stick or tablet reagent',
    amount: 78.00,
    date: '10/15/2024',
    confidence: 91
  }
];

const sampleMetadata: DocumentMetadata = {
  provider: 'Memorial General Hospital',
  serviceDate: '10/15/2024',
  totalAmount: 1361.00,
  accountNumber: 'MRN-2024-78542',
  pageCount: 1,
  extractedAt: new Date().toISOString()
};

/**
 * Simulate processing delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockApiService {
  /**
   * Simulate full upload and process flow
   */
  async uploadAndProcess(
    _file: File,
    onProgress?: (status: string, progress: number) => void
  ): Promise<ProcessingResponse> {
    // Simulate upload
    onProgress?.('Preparing the cursed document...', 10);
    await delay(800);

    onProgress?.('Uploading to the spirit realm...', 25);
    await delay(1200);

    onProgress?.('Summoning the bill demons...', 40);
    await delay(1000);

    onProgress?.('Deciphering ancient medical codes...', 60);
    await delay(1500);

    onProgress?.('Exorcising hidden charges...', 80);
    await delay(1000);

    onProgress?.('The curse is lifting...', 95);
    await delay(500);

    // Return mock response
    const billId = `bill-${Date.now()}`;
    
    return {
      billId,
      lineItems: sampleLineItems,
      metadata: sampleMetadata,
      confidence: 92,
      status: ProcessingStatus.COMPLETE
    };
  }

  /**
   * Get mock processing status
   */
  async getProcessingStatus(billId: string): Promise<any> {
    return {
      billId,
      status: ProcessingStatus.COMPLETE,
      progress: 100,
      lineItemsProcessed: sampleLineItems.length,
      totalLineItems: sampleLineItems.length
    };
  }
}

export const mockApiService = new MockApiService();

// Use mock in development or when API is unavailable
export const isDemoMode = () => {
  return import.meta.env.VITE_DEMO_MODE === 'true' || 
         !import.meta.env.VITE_API_URL;
};
