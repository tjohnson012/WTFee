/**
 * Enhanced Local Development Server
 * Supports full bill analysis with adjustments, explanations, and recommendations
 */

import http from 'http';
import { URL } from 'url';

const PORT = 3001;

// Enhanced mock data for local development
const mockLineItems = [
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

const mockAdjustments = [
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

const mockMetadata = {
  provider: 'Mercy Health West Hospital',
  providerSystem: 'Mercy Health',
  serviceDate: '08/12/2025',
  serviceDateEnd: '08/14/2025',
  totalAmount: 19217.00,
  totalAdjustments: 8356.36,
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
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

function parseBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(body));
  });
}


const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const path = url.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  // Set CORS headers for all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  try {
    // POST /api/upload - Generate upload URL
    if (path === '/api/upload' && req.method === 'POST') {
      const billId = `bill-${Date.now()}`;
      const fileKey = `uploads/${billId}/document.pdf`;
      
      res.writeHead(200);
      res.end(JSON.stringify({
        uploadUrl: `http://localhost:${PORT}/mock-upload`,
        fileKey,
        billId,
        expiresIn: 300
      }));
      return;
    }

    // POST /api/process - Process document
    if (path === '/api/process' && req.method === 'POST') {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const body = await parseBody(req);
      const { billId } = JSON.parse(body || '{}');
      
      res.writeHead(200);
      res.end(JSON.stringify({
        billId: billId || `bill-${Date.now()}`,
        lineItems: mockLineItems,
        adjustments: mockAdjustments,
        metadata: mockMetadata,
        confidence: 92,
        status: 'complete'
      }));
      return;
    }

    // POST /api/explain - Explain a single line item
    if (path === '/api/explain' && req.method === 'POST') {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const body = await parseBody(req);
      const { lineItem } = JSON.parse(body || '{}');
      
      res.writeHead(200);
      res.end(JSON.stringify({
        lineItemId: lineItem?.id || 'unknown',
        plainEnglish: `This charge is for ${lineItem?.description || 'medical services'}.`,
        whyCharged: 'This service was provided during your visit.',
        medicalContext: 'Contact your provider for specific details.',
        costAnalysis: {
          chargedAmount: lineItem?.amount || 0,
          regionalAverage: { low: (lineItem?.amount || 0) * 0.6, median: (lineItem?.amount || 0) * 0.8, high: (lineItem?.amount || 0) * 1.1 },
          medicareRate: (lineItem?.amount || 0) * 0.3,
          percentAboveAverage: 25,
          priceVerdict: 'high'
        },
        redFlags: [],
        negotiationTips: ['Request an itemized bill', 'Ask about self-pay discounts']
      }));
      return;
    }

    // POST /api/analyze - Full bill analysis
    if (path === '/api/analyze' && req.method === 'POST') {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const body = await parseBody(req);
      const { lineItems, context } = JSON.parse(body || '{}');
      
      const totalCharged = (lineItems || mockLineItems).reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
      
      res.writeHead(200);
      res.end(JSON.stringify({
        lineItemExplanations: (lineItems || mockLineItems).map((item: any) => ({
          lineItemId: item.id,
          plainEnglish: `This charge is for ${item.description || 'medical services'}.`,
          whyCharged: 'This service was provided during your visit.',
          medicalContext: 'Standard medical service.',
          costAnalysis: {
            chargedAmount: item.amount || 0,
            regionalAverage: { low: (item.amount || 0) * 0.6, median: (item.amount || 0) * 0.8, high: (item.amount || 0) * 1.1 },
            medicareRate: (item.amount || 0) * 0.3,
            percentAboveAverage: 25,
            priceVerdict: 'high'
          },
          redFlags: [],
          negotiationTips: ['Request an itemized bill']
        })),
        adjustmentExplanations: mockAdjustments.map(adj => ({
          code: adj.code || 'ADJ',
          name: adj.name,
          amount: adj.amount,
          explanation: adj.name.includes('Self-Pay') 
            ? 'Standard discount for uninsured patients.'
            : 'Billing adjustment.',
          isGood: true,
          actionRequired: adj.name.includes('MUE')
        })),
        summary: {
          totalCharged,
          totalAdjustments: 8356.36,
          totalOwed: context?.totalOwed || totalCharged - 8356.36,
          overallAssessment: 'This bill has several charges worth reviewing.',
          potentialSavings: { low: totalCharged * 0.1, high: totalCharged * 0.3 },
          urgencyLevel: 'medium',
          urgencyReason: 'Review and address within 30 days.',
          topPriorities: [
            { action: 'Apply for financial assistance', reason: 'You may qualify for charity care', potentialSavings: totalCharged * 0.5 }
          ],
          financialAssistance: {
            likelyEligible: true,
            programs: ['Hospital charity care', 'Payment plans'],
            howToApply: ['Call billing department', 'Request financial assistance application']
          },
          negotiationStrategy: {
            overallApproach: 'Start with financial assistance application.',
            keyPoints: ['Ask about charity care', 'Request itemized bill'],
            whatToSay: 'I would like to apply for financial assistance.',
            whatNotToSay: 'Do not agree to pay full amount immediately.'
          }
        }
      }));
      return;
    }

    // GET /api/status/:billId - Get processing status
    if (path.startsWith('/api/status/') && req.method === 'GET') {
      const billId = path.split('/').pop();
      
      res.writeHead(200);
      res.end(JSON.stringify({
        billId,
        status: 'complete',
        progress: 100,
        lineItemsProcessed: mockLineItems.length,
        totalLineItems: mockLineItems.length
      }));
      return;
    }

    // PUT /mock-upload - Mock S3 upload
    if (path === '/mock-upload' && req.method === 'PUT') {
      res.writeHead(200);
      res.end();
      return;
    }

    // 404 for unknown routes
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));

  } catch (error: any) {
    console.error('Server error:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`\n🏥 WTFee local server running at http://localhost:${PORT}\n`);
  console.log('Available endpoints:');
  console.log('  POST /api/upload    - Get upload URL');
  console.log('  POST /api/process   - Process document');
  console.log('  POST /api/explain   - Explain single line item');
  console.log('  POST /api/analyze   - Full bill analysis');
  console.log('  GET  /api/status/:id - Get processing status');
  console.log('\nDemo mode: Returns realistic ER admission bill data\n');
});
