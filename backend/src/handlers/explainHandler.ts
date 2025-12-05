import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { claudeService, ExplanationRequest } from '../services/claudeService';
import { ExtractedLineItem } from '../types';

interface ExplainSingleRequest {
  lineItem: ExtractedLineItem;
  context?: {
    provider?: string;
    serviceDate?: string;
  };
}

interface ExplainBatchRequest {
  lineItems: ExtractedLineItem[];
  context?: {
    provider?: string;
    serviceDate?: string;
  };
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS'
};

/**
 * Lambda handler for explaining a single line item
 */
export const explainSingle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders, body: '' };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Request body is required' })
      };
    }

    const request: ExplainSingleRequest = JSON.parse(event.body);
    
    const explanation = await claudeService.explainLineItem(
      request.lineItem,
      request.context
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(explanation)
    };

  } catch (error: any) {
    console.error('Explain handler error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Failed to generate explanation',
        message: error.message 
      })
    };
  }
};

/**
 * Lambda handler for explaining multiple line items
 */
export const explainBatch = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders, body: '' };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Request body is required' })
      };
    }

    const request: ExplainBatchRequest = JSON.parse(event.body);
    
    const result = await claudeService.explainBatch({
      lineItems: request.lineItems,
      context: request.context
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(result)
    };

  } catch (error: any) {
    console.error('Explain batch handler error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Failed to generate explanations',
        message: error.message 
      })
    };
  }
};
