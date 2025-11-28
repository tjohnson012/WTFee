import { ScheduledEvent } from 'aws-lambda';
import { s3Service } from '../services/s3Service';

/**
 * Lambda handler for scheduled cleanup of expired documents
 * Triggered by CloudWatch Events rule (every hour)
 */
export const handler = async (event: ScheduledEvent): Promise<void> => {
  console.log('Starting scheduled cleanup:', event.time);

  try {
    const result = await s3Service.cleanupExpiredDocuments();
    console.log(`Cleanup complete. Deleted ${result.deleted} expired documents.`);
  } catch (error) {
    console.error('Cleanup failed:', error);
    throw error;
  }
};
