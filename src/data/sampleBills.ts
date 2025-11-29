/**
 * Sample Medical Bills for Demo Mode
 * Pre-loaded data for consistent hackathon presentation
 */

import { ProcessingResponse, ExtractedLineItem } from '../services/api';

// Sample line items representing a typical ER visit
const erVisitLineItems: ExtractedLineItem[] = [
  {
    id: 'er-1',
    rawText: '99284 Emergency Dept Visit Level 4 $1,245.00',
    code: '99284',
    description: 'Emergency Department Visit - Level 4 (High Complexity)',
    amount: 1245.00,
    date: '10/31/2024',
    confidence: 96
  },
  {
    id: 'er-2',
    rawText: '71046 Chest X-Ray 2 Views $487.00',
    code: '71046',
    description: 'Chest X-Ray, 2 Views (Front and Side)',
    amount: 487.00,
    date: '10/31/2024',
    confidence: 94
  },
  {
    id: 'er-3',
    rawText: '80053 Comprehensive Metabolic Panel $312.00',
    code: '80053',
    description: 'Comprehensive Metabolic Panel (14 Tests)',
    amount: 312.00,
    date: '10/31/2024',
    confidence: 95
  },
  {
    id: 'er-4',
    rawText: '85025 Complete Blood Count $178.00',
    code: '85025',
    description: 'Complete Blood Count (CBC) with Differential',
    amount: 178.00,
    date: '10/31/2024',
    confidence: 93
  },
  {
    id: 'er-5',
    rawText: 'Facility Fee Emergency Services $2,150.00',
    description: 'Hospital Facility Fee - Emergency Services',
    amount: 2150.00,
    date: '10/31/2024',
    confidence: 89
  },
  {
    id: 'er-6',
    rawText: '99284 Emergency Dept Visit Level 4 $1,245.00',
    code: '99284',
    description: 'Emergency Department Visit - Level 4 (High Complexity)',
    amount: 1245.00,
    date: '10/31/2024',
    confidence: 96,
    isDuplicate: true
  }
];


// Sample routine checkup bill
const checkupLineItems: ExtractedLineItem[] = [
  {
    id: 'chk-1',
    rawText: '99213 Office Visit Level 3 $185.00',
    code: '99213',
    description: 'Office/Outpatient Visit, Established Patient (Level 3)',
    amount: 185.00,
    date: '10/15/2024',
    confidence: 95
  },
  {
    id: 'chk-2',
    rawText: '36415 Venipuncture $45.00',
    code: '36415',
    description: 'Collection of venous blood by venipuncture',
    amount: 45.00,
    date: '10/15/2024',
    confidence: 92
  },
  {
    id: 'chk-3',
    rawText: '80053 Comprehensive Metabolic Panel $287.00',
    code: '80053',
    description: 'Comprehensive Metabolic Panel (14 tests)',
    amount: 287.00,
    date: '10/15/2024',
    confidence: 94
  },
  {
    id: 'chk-4',
    rawText: '85025 Complete Blood Count $156.00',
    code: '85025',
    description: 'Complete Blood Count (CBC) with Differential',
    amount: 156.00,
    date: '10/15/2024',
    confidence: 93
  },
  {
    id: 'chk-5',
    rawText: '81001 Urinalysis $78.00',
    code: '81001',
    description: 'Urinalysis, by dip stick or tablet reagent',
    amount: 78.00,
    date: '10/15/2024',
    confidence: 91
  },
  {
    id: 'chk-6',
    rawText: 'Facility Fee $425.00',
    description: 'Hospital Facility Fee - Outpatient Services',
    amount: 425.00,
    date: '10/15/2024',
    confidence: 88
  },
  {
    id: 'chk-7',
    rawText: '99213 Office Visit Level 3 $185.00',
    code: '99213',
    description: 'Office/Outpatient Visit, Established Patient (Level 3)',
    amount: 185.00,
    date: '10/15/2024',
    confidence: 95,
    isDuplicate: true
  }
];

export const sampleBills: Record<string, ProcessingResponse> = {
  'er-visit': {
    billId: 'demo-er-visit',
    lineItems: erVisitLineItems,
    metadata: {
      provider: 'Haunted Memorial Hospital',
      serviceDate: '10/31/2024',
      totalAmount: erVisitLineItems.reduce((sum, item) => sum + (item.amount || 0), 0),
      accountNumber: 'SPOOKY-2024-1031',
      pageCount: 1,
      extractedAt: new Date().toISOString()
    },
    confidence: 94,
    status: 'complete' as const
  },
  'routine-checkup': {
    billId: 'demo-routine-checkup',
    lineItems: checkupLineItems,
    metadata: {
      provider: 'Memorial General Hospital',
      serviceDate: '10/15/2024',
      totalAmount: checkupLineItems.reduce((sum, item) => sum + (item.amount || 0), 0),
      accountNumber: 'MRN-2024-78542',
      pageCount: 1,
      extractedAt: new Date().toISOString()
    },
    confidence: 92,
    status: 'complete' as const
  }
};

export const demoLoadingMessages = [
  "Summoning the billing spirits...",
  "Deciphering ancient medical codes...",
  "Consulting the healthcare oracle...",
  "Exorcising hidden charges...",
  "Translating billing hieroglyphics...",
  "Awakening the cost comparison demons...",
  "Channeling insurance wisdom...",
  "The spirits are revealing the truth..."
];

export default sampleBills;
