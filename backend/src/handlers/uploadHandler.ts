import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { s3Service, S3Service } from '../services/s3Service';
import { UploadUrlResponse, ProcessingError, ErrorCodes } from '../types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface UploadRequest {
  fileType: string;
  contentType: string;
  fileSize?: number;
}

/**
 * Lambda handler for generating presigned upload URLs
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
    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders, body: '' };
    }

    if (!event.body) {
      return errorResponse(400, {
        code: ErrorCodes.INVALID_FILE_TYPE,
        message: 'Request body is required',
        suggestion: 'Please provide file type and content type',
        retryable: false
      }, corsHeaders);
    }

    const request: UploadRequest = JSON.parse(event.body);
    
    // Validate file type
    if (!S3Service.isValidFileType(request.contentType)) {
      return errorResponse(400, {
        code: ErrorCodes.INVALID_FILE_TYPE,
        message: 'Invalid file type. Supported: JPG, PNG, PDF',
        suggestion: 'Please upload a JPG, PNG image or PDF document',
        retryable: false
      }, corsHeaders);
    }

    // Validate file size
    if (request.fileSize && request.fileSize > MAX_FILE_SIZE) {
      return errorResponse(400, {
        code: ErrorCodes.FILE_TOO_LARGE,
        message: 'File too large. Maximum size is 10MB',
        suggestion: 'Try compressing your image or splitting the PDF',
        retryable: false
      }, corsHeaders);
    }

    // Generate presigned URL
    const { uploadUrl, fileKey, billId } = await s3Service.generateUploadUrl(
      request.contentType,
      request.contentType
    );

    const response: UploadUrlResponse = {
      uploadUrl,
      fileKey,
      billId,
      expiresIn: 300
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Upload handler error:', error);
    
    return errorResponse(500, {
      code: ErrorCodes.S3_ERROR,
      message: 'Failed to generate upload URL',
      suggestion: 'Please try again in a moment',
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
