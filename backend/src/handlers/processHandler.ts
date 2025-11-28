import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { textractService } from '../services/textractService';
import { documentParser } from '../services/documentParser';
import { s3Service } from '../services/s3Service';
import {
  DocumentProcessingResponse,
  ProcessingStatus,
  ProcessingError,
  ErrorCodes
} from '../types';

interface ProcessRequest {
  billId: string;
  fileKey: string;
}

/**
 * Lambda handler for processing uploaded documents with Textract
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'POST,OPTIONS'
  };

  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders, body: '' };
    }

    if (!event.body) {
      return errorResponse(400, {
        code: ErrorCodes.PARSING_FAILED,
        message: 'Request body is required',
        suggestion: 'Please provide billId and fileKey',
        retryable: false
      }, corsHeaders);
    }

    const request: ProcessRequest = JSON.parse(event.body);
    const bucketName = s3Service.getBucketName();

    console.log(`Processing document: ${request.billId}, key: ${request.fileKey}`);

    // Call Textract to analyze the document
    const { lineItems, metadata } = await textractService.analyzeDocument(
      bucketName,
      request.fileKey
    );

    // Process and enhance the extracted data
    const processedItems = documentParser.processLineItems(lineItems);
    const duplicates = documentParser.findDuplicates(processedItems);

    // Mark duplicates
    for (const item of processedItems) {
      if (duplicates.includes(item.id)) {
        (item as any).isDuplicate = true;
      }
    }

    // Calculate confidence score
    const avgConfidence = processedItems.length > 0
      ? processedItems.reduce((sum, item) => sum + item.confidence, 0) / processedItems.length
      : 0;

    const response: DocumentProcessingResponse = {
      billId: request.billId,
      lineItems: processedItems,
      metadata: {
        ...metadata,
        totalAmount: metadata.totalAmount || documentParser.calculateTotal(processedItems)
      },
      confidence: Math.round(avgConfidence),
      status: ProcessingStatus.COMPLETE
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(response)
    };

  } catch (error: any) {
    console.error('Process handler error:', error);

    // Handle specific Textract errors
    if (error.name === 'InvalidS3ObjectException') {
      return errorResponse(400, {
        code: ErrorCodes.S3_ERROR,
        message: 'Document not found or inaccessible',
        suggestion: 'Please re-upload your document',
        retryable: true
      }, corsHeaders);
    }

    if (error.name === 'UnsupportedDocumentException') {
      return errorResponse(400, {
        code: ErrorCodes.TEXTRACT_FAILED,
        message: 'Document format not supported',
        suggestion: 'Try converting to PDF or taking a clearer photo',
        retryable: false
      }, corsHeaders);
    }

    return errorResponse(500, {
      code: ErrorCodes.TEXTRACT_FAILED,
      message: 'Failed to process document',
      suggestion: 'Try uploading a clearer image. Ensure the bill is well-lit and in focus.',
      retryable: true
    }, corsHeaders);
  }
};

function errorResponse(
  statusCode: number,
  error: ProcessingError,
  headers: Record<string, string>
): APIGatewayProxyResult {
  return {
    statusCode,
    headers,
    body: JSON.stringify({ error })
  };
}
