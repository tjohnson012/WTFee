import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1'
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'wtfee-documents';
const UPLOAD_EXPIRY_SECONDS = 300; // 5 minutes for upload URL
const CLEANUP_HOURS = 24; // Auto-delete after 24 hours

export class S3Service {
  /**
   * Generate a presigned URL for uploading a document
   */
  async generateUploadUrl(
    fileType: string,
    contentType: string
  ): Promise<{ uploadUrl: string; fileKey: string; billId: string }> {
    const billId = uuidv4();
    const extension = this.getExtension(fileType);
    const fileKey = `uploads/${billId}/${billId}${extension}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      ContentType: contentType,
      Metadata: {
        'bill-id': billId,
        'upload-time': new Date().toISOString(),
        'expires-at': new Date(Date.now() + CLEANUP_HOURS * 60 * 60 * 1000).toISOString()
      }
    });

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: UPLOAD_EXPIRY_SECONDS
    });

    return { uploadUrl, fileKey, billId };
  }

  /**
   * Generate a presigned URL for downloading/viewing a document
   */
  async generateDownloadUrl(fileKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey
    });

    return getSignedUrl(s3Client, command, {
      expiresIn: 3600 // 1 hour
    });
  }

  /**
   * Delete a document from S3
   */
  async deleteDocument(fileKey: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey
    });

    await s3Client.send(command);
  }

  /**
   * Delete all documents for a bill
   */
  async deleteBillDocuments(billId: string): Promise<void> {
    const prefix = `uploads/${billId}/`;
    
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix
    });

    const response = await s3Client.send(listCommand);

    if (response.Contents) {
      for (const obj of response.Contents) {
        if (obj.Key) {
          await this.deleteDocument(obj.Key);
        }
      }
    }
  }

  /**
   * Cleanup expired documents (called by scheduled Lambda)
   */
  async cleanupExpiredDocuments(): Promise<{ deleted: number }> {
    const cutoffTime = new Date(Date.now() - CLEANUP_HOURS * 60 * 60 * 1000);
    let deletedCount = 0;

    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: 'uploads/'
    });

    const response = await s3Client.send(listCommand);

    if (response.Contents) {
      for (const obj of response.Contents) {
        if (obj.LastModified && obj.LastModified < cutoffTime && obj.Key) {
          await this.deleteDocument(obj.Key);
          deletedCount++;
        }
      }
    }

    return { deleted: deletedCount };
  }

  /**
   * Get file extension from file type
   */
  private getExtension(fileType: string): string {
    const extensions: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'application/pdf': '.pdf'
    };
    return extensions[fileType] || '.bin';
  }

  /**
   * Validate file type
   */
  static isValidFileType(contentType: string): boolean {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf'
    ];
    return validTypes.includes(contentType);
  }

  /**
   * Get bucket name
   */
  getBucketName(): string {
    return BUCKET_NAME;
  }
}

export const s3Service = new S3Service();
