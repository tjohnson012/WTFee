import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ProcessingStatusResponse, ProcessingStatus } from '../types';

// In-memory store for demo (use DynamoDB in production)
const processingStatus = new Map<string, ProcessingStatusResponse>();

/**
 * Lambda handler for checking document processing status
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  };

  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders, body: '' };
    }

    const billId = event.pathParameters?.billId;

    if (!billId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'billId is required' })
      };
    }

    // Get status from store (or return default)
    const status = processingStatus.get(billId) || {
      billId,
      status: ProcessingStatus.UPLOADED,
      progress: 0,
      lineItemsProcessed: 0,
      totalLineItems: 0
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(status)
    };

  } catch (error) {
    console.error('Status handler error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to get processing status' })
    };
  }
};

/**
 * Update processing status (called internally)
 */
export function updateStatus(
  billId: string,
  status: Partial<ProcessingStatusResponse>
): void {
  const current = processingStatus.get(billId) || {
    billId,
    status: ProcessingStatus.UPLOADED,
    progress: 0,
    lineItemsProcessed: 0,
    totalLineItems: 0
  };

  processingStatus.set(billId, { ...current, ...status });
}
