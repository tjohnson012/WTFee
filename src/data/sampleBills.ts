/**
 * Sample Medical Bills for Demo Mode
 * Realistic scenarios for testing and demonstration
 */

import { ProcessingResponse, ExtractedLineItem, ExtractedAdjustment, ProcessingStatus } from '../services/api';

// ER Visit leading to hospital admission - complex high-value bill
const erAdmissionLineItems: ExtractedLineItem[] = [
  {
    id: 'er-1',
    rawText: 'Emergency Room $4,334.00',
    description: 'Emergency Room Services - Level 4',
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

// Routine checkup with some issues
const checkupLineItems: ExtractedLineItem[] = [
  {
    id: 'chk-1',
    rawText: '99213 Office Visit Level 3 $185.00',
    code: '99213',
    description: 'Office/Outpatient Visit, Established Patient (Level 3)',
    amount: 185.00,
    date: '10/15/2024',
    confidence: 95,
    category: 'other'
  },
  {
    id: 'chk-2',
    rawText: '36415 Venipuncture $45.00',
    code: '36415',
    description: 'Collection of venous blood by venipuncture',
    amount: 45.00,
    date: '10/15/2024',
    confidence: 92,
    category: 'lab'
  },
  {
    id: 'chk-3',
    rawText: '80053 Comprehensive Metabolic Panel $287.00',
    code: '80053',
    description: 'Comprehensive Metabolic Panel (14 tests)',
    amount: 287.00,
    date: '10/15/2024',
    confidence: 94,
    category: 'lab'
  },
  {
    id: 'chk-4',
    rawText: '85025 Complete Blood Count $156.00',
    code: '85025',
    description: 'Complete Blood Count (CBC) with Differential',
    amount: 156.00,
    date: '10/15/2024',
    confidence: 93,
    category: 'lab'
  },
  {
    id: 'chk-5',
    rawText: '81001 Urinalysis $78.00',
    code: '81001',
    description: 'Urinalysis, by dip stick or tablet reagent',
    amount: 78.00,
    date: '10/15/2024',
    confidence: 91,
    category: 'lab'
  },
  {
    id: 'chk-6',
    rawText: 'Facility Fee $425.00',
    description: 'Hospital Facility Fee - Outpatient Services',
    amount: 425.00,
    date: '10/15/2024',
    confidence: 88,
    category: 'facility'
  },
  {
    id: 'chk-7',
    rawText: '99213 Office Visit Level 3 $185.00',
    code: '99213',
    description: 'Office/Outpatient Visit, Established Patient (Level 3)',
    amount: 185.00,
    date: '10/15/2024',
    confidence: 95,
    isDuplicate: true,
    category: 'other'
  }
];


export const sampleBills: Record<string, ProcessingResponse> = {
  'er-admission': {
    billId: 'demo-er-admission',
    lineItems: erAdmissionLineItems,
    adjustments: erAdmissionAdjustments,
    metadata: {
      provider: 'Mercy Health West Hospital',
      providerSystem: 'Mercy Health',
      serviceDate: '08/12/2025',
      serviceDateEnd: '08/14/2025',
      totalAmount: erAdmissionLineItems.reduce((sum, item) => sum + (item.amount || 0), 0),
      totalAdjustments: Math.abs(erAdmissionAdjustments.reduce((sum, adj) => sum + adj.amount, 0)),
      totalOwed: 12461.94,
      accountNumber: '615252240484',
      accountNumbers: ['616252306444', '615252240484'],
      pageCount: 2,
      extractedAt: new Date().toISOString(),
      visitType: 'inpatient',
      daysInHospital: 2,
      insuranceStatus: 'uninsured',
      state: 'OH',
      region: 'Cincinnati'
    },
    confidence: 94,
    status: ProcessingStatus.COMPLETE
  },
  'routine-checkup': {
    billId: 'demo-routine-checkup',
    lineItems: checkupLineItems,
    adjustments: [],
    metadata: {
      provider: 'Memorial General Hospital',
      serviceDate: '10/15/2024',
      totalAmount: checkupLineItems.reduce((sum, item) => sum + (item.amount || 0), 0),
      totalOwed: checkupLineItems.reduce((sum, item) => sum + (item.amount || 0), 0),
      accountNumber: 'MRN-2024-78542',
      pageCount: 1,
      extractedAt: new Date().toISOString(),
      visitType: 'outpatient',
      insuranceStatus: 'unknown'
    },
    confidence: 92,
    status: ProcessingStatus.COMPLETE
  }
};

export const demoLoadingMessages = [
  "Uploading your document...",
  "Scanning for billing codes...",
  "Extracting line items...",
  "Analyzing charges...",
  "Comparing to regional prices...",
  "Detecting potential issues...",
  "Generating recommendations...",
  "Almost done..."
];

export default sampleBills;
