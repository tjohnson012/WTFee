/**
 * Enhanced Mock API Service for local development and demo mode
 * Simulates AWS Textract responses with realistic medical bill data
 * Supports complex bills with multiple accounts, adjustments, and various visit types
 */

import {
  ProcessingResponse,
  ExtractedLineItem,
  ExtractedAdjustment,
  DocumentMetadata,
  ProcessingStatus
} from './api';

// ER Visit with Hospital Admission - Complex bill scenario
const erAdmissionLineItems: ExtractedLineItem[] = [
  {
    id: 'er-1',
    rawText: 'Emergency Room $4,334.00',
    description: 'Emergency Room Services',
    amount: 4334.00,
    date: '08/12/2025',
    confidence: 94,
    category: 'er'
  },
  {
    id: 'er-2',
    rawText: 'CT Scan $1,570.00',
    code: '74177',
    description: 'CT Scan - Abdomen/Pelvis with Contrast',
    amount: 1570.00,
    date: '08/12/2025',
    confidence: 96,
    category: 'imaging'
  },
  {
    id: 'er-3',
    rawText: 'MRI $3,692.00',
    code: '70553',
    description: 'MRI - Brain with Contrast',
    amount: 3692.00,
    date: '08/12/2025',
    confidence: 95,
    category: 'imaging'
  },
  {
    id: 'er-4',
    rawText: 'Room and Board - Semi Private $6,532.00',
    description: 'Room & Board - Semi-Private (2 nights)',
    amount: 6532.00,
    date: '08/12/2025',
    confidence: 93,
    category: 'inpatient'
  },
  {
    id: 'er-5',
    rawText: 'IV Therapy $892.00',
    description: 'IV Therapy / Infusion Services',
    amount: 892.00,
    date: '08/12/2025',
    confidence: 91,
    category: 'therapy'
  },
  {
    id: 'er-6',
    rawText: 'Lab Services $1,245.00',
    code: '80053',
    description: 'Laboratory Services - Multiple Panels',
    amount: 1245.00,
    date: '08/12/2025',
    confidence: 92,
    category: 'lab'
  },
  {
    id: 'er-7',
    rawText: 'Pharmacy $567.00',
    description: 'Pharmacy / Medications',
    amount: 567.00,
    date: '08/12/2025',
    confidence: 90,
    category: 'pharmacy'
  },
  {
    id: 'er-8',
    rawText: 'Pulmonary Function $385.00',
    code: '94010',
    description: 'Pulmonary Function Testing',
    amount: 385.00,
    date: '08/13/2025',
    confidence: 89,
    category: 'therapy'
  }
];

const erAdmissionAdjustments: ExtractedAdjustment[] = [
  {
    id: 'adj-1',
    name: 'Self-Pay Discount (Uninsured)',
    amount: -8240.36,
    rawText: 'Self-Pay Discount (Uninsured) -$8,240.36',
    confidence: 95
  },
  {
    id: 'adj-2',
    name: 'MUE Write-Off',
    code: 'MUE',
    amount: -116.00,
    rawText: 'MUE Write-Off -$116.00',
    confidence: 92
  }
];

// Simple outpatient visit
const outpatientLineItems: ExtractedLineItem[] = [
  {
    id: 'out-1',
    rawText: '99213 Office Visit Level 3 $185.00',
    code: '99213',
    description: 'Office/Outpatient Visit, Established Patient (Level 3)',
    amount: 185.00,
    date: '10/15/2024',
    confidence: 95,
    category: 'other'
  },
  {
    id: 'out-2',
    rawText: '36415 Venipuncture $45.00',
    code: '36415',
    description: 'Collection of venous blood by venipuncture',
    amount: 45.00,
    date: '10/15/2024',
    confidence: 92,
    category: 'lab'
  },
  {
    id: 'out-3',
    rawText: '80053 Comprehensive Metabolic Panel $287.00',
    code: '80053',
    description: 'Comprehensive Metabolic Panel (14 tests)',
    amount: 287.00,
    date: '10/15/2024',
    confidence: 94,
    category: 'lab'
  },
  {
    id: 'out-4',
    rawText: '85025 Complete Blood Count $156.00',
    code: '85025',
    description: 'Complete Blood Count (CBC) with Differential',
    amount: 156.00,
    date: '10/15/2024',
    confidence: 93,
    category: 'lab'
  },
  {
    id: 'out-5',
    rawText: 'Facility Fee $425.00',
    description: 'Hospital Facility Fee - Outpatient Services',
    amount: 425.00,
    date: '10/15/2024',
    confidence: 88,
    category: 'facility'
  },
  {
    id: 'out-6',
    rawText: '99213 Office Visit Level 3 $185.00',
    code: '99213',
    description: 'Office/Outpatient Visit, Established Patient (Level 3)',
    amount: 185.00,
    date: '10/15/2024',
    confidence: 95,
    isDuplicate: true,
    category: 'other'
  },
  {
    id: 'out-7',
    rawText: '81001 Urinalysis $78.00',
    code: '81001',
    description: 'Urinalysis, by dip stick or tablet reagent',
    amount: 78.00,
    date: '10/15/2024',
    confidence: 91,
    category: 'lab'
  }
];


// Bill scenarios for demo
const billScenarios = {
  erAdmission: {
    lineItems: erAdmissionLineItems,
    adjustments: erAdmissionAdjustments,
    metadata: {
      provider: 'Mercy Health West Hospital',
      providerSystem: 'Mercy Health',
      patientName: 'Patient',
      serviceDate: '08/12/2025',
      serviceDateEnd: '08/14/2025',
      totalAmount: 19217.00,
      totalAdjustments: 8356.36,
      totalOwed: 12461.94,
      accountNumber: '615252240484',
      accountNumbers: ['616252306444', '615252240484'],
      pageCount: 2,
      extractedAt: new Date().toISOString(),
      visitType: 'inpatient' as const,
      daysInHospital: 2,
      insuranceStatus: 'uninsured' as const,
      state: 'OH',
      region: 'Cincinnati'
    } as DocumentMetadata
  },
  outpatient: {
    lineItems: outpatientLineItems,
    adjustments: [],
    metadata: {
      provider: 'Memorial General Hospital',
      serviceDate: '10/15/2024',
      totalAmount: 1361.00,
      totalOwed: 1361.00,
      accountNumber: 'MRN-2024-78542',
      pageCount: 1,
      extractedAt: new Date().toISOString(),
      visitType: 'outpatient' as const,
      insuranceStatus: 'unknown' as const
    } as DocumentMetadata
  }
};

/**
 * Simulate processing delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Detect bill type from filename or content
 */
function detectBillType(file: File): keyof typeof billScenarios {
  const name = file.name.toLowerCase();
  
  // Check filename for hints
  if (name.includes('er') || name.includes('emergency') || name.includes('hospital') || 
      name.includes('admission') || name.includes('inpatient') || name.includes('mychart')) {
    return 'erAdmission';
  }
  
  // Default to outpatient for smaller files, ER for larger
  if (file.size > 500000) {
    return 'erAdmission';
  }
  
  return 'outpatient';
}

class MockApiService {
  /**
   * Simulate full upload and process flow
   */
  async uploadAndProcess(
    file: File,
    onProgress?: (status: string, progress: number) => void
  ): Promise<ProcessingResponse> {
    const billType = detectBillType(file);
    const scenario = billScenarios[billType];

    // Simulate upload with themed messages
    const messages = billType === 'erAdmission' 
      ? [
          'Uploading medical records...',
          'Scanning for billing codes...',
          'Analyzing hospital charges...',
          'Detecting adjustments...',
          'Comparing to regional prices...',
          'Identifying potential savings...',
          'Generating recommendations...',
          'Analysis complete!'
        ]
      : [
          'Preparing the document...',
          'Uploading to secure server...',
          'Extracting line items...',
          'Analyzing charges...',
          'Checking for duplicates...',
          'Comparing prices...',
          'Almost done...',
          'Processing complete!'
        ];

    for (let i = 0; i < messages.length; i++) {
      onProgress?.(messages[i], Math.round((i + 1) / messages.length * 100));
      await delay(600 + Math.random() * 400);
    }

    const billId = `bill-${Date.now()}`;
    
    return {
      billId,
      lineItems: scenario.lineItems,
      adjustments: scenario.adjustments,
      metadata: scenario.metadata,
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
      lineItemsProcessed: erAdmissionLineItems.length,
      totalLineItems: erAdmissionLineItems.length
    };
  }

  /**
   * Get a specific demo scenario
   */
  getDemoScenario(type: keyof typeof billScenarios): ProcessingResponse {
    const scenario = billScenarios[type];
    return {
      billId: `demo-${type}-${Date.now()}`,
      lineItems: scenario.lineItems,
      adjustments: scenario.adjustments,
      metadata: scenario.metadata,
      confidence: 92,
      status: ProcessingStatus.COMPLETE
    };
  }
}

export const mockApiService = new MockApiService();

// Use mock in development or when API is unavailable
export const isDemoMode = () => {
  return import.meta.env.VITE_DEMO_MODE === 'true' || 
         !import.meta.env.VITE_API_URL;
};

export { billScenarios };
