/**
 * Local development server for testing without AWS
 * Run with: npx ts-node src/local-server.ts
 */

import http from 'http';
import { URL } from 'url';

const PORT = 3001;

// Mock data for local development
const mockLineItems = [
  {
    id: '1',
    rawText: '99213 Office Visit Level 3 $185.00',
    code: '99213',
    description: 'Office/Outpatient Visit, Established Patient (Level 3)',
    amount: 185.00,
    confidence: 95
  },
  {
    id: '2',
    rawText: '36415 Venipuncture $45.00',
    code: '36415',
    description: 'Collection of venous blood by venipuncture',
    amount: 45.00,
    confidence: 92
  },
  {
    id: '3',
    rawText: '80053 Comprehensive Metabolic Panel $287.00',
    code: '80053',
    description: 'Comprehensive Metabolic Panel (14 tests)',
    amount: 287.00,
    confidence: 94
  },
  {
    id: '4',
    rawText: 'Facility Fee $425.00',
    description: 'Hospital Facility Fee - Outpatient Services',
    amount: 425.00,
    confidence: 88
  }
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

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
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const { billId } = JSON.parse(body || '{}');
        
        res.writeHead(200);
        res.end(JSON.stringify({
          billId: billId || `bill-${Date.now()}`,
          lineItems: mockLineItems,
          metadata: {
            provider: 'Memorial General Hospital',
            serviceDate: '10/15/2024',
            totalAmount: 942.00,
            pageCount: 1,
            extractedAt: new Date().toISOString()
          },
          confidence: 92,
          status: 'complete'
        }));
      });
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
  console.log(`🎃 WTFee local server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /api/upload   - Get upload URL');
  console.log('  POST /api/process  - Process document');
  console.log('  GET  /api/status/:billId - Get status');
});
