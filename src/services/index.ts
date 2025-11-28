/**
 * Services Index
 * Exports the appropriate API service based on environment
 */

import { apiService, ProcessingResponse } from './api';
import { mockApiService, isDemoMode } from './mockApi';

export * from './api';
export { isDemoMode } from './mockApi';

/**
 * Get the active API service (real or mock)
 */
export const getApiService = () => {
  if (isDemoMode()) {
    console.log('🎃 Running in demo mode with mock data');
    return mockApiService;
  }
  return apiService;
};

/**
 * Upload and process a document
 */
export const uploadAndProcessDocument = async (
  file: File,
  onProgress?: (status: string, progress: number) => void
): Promise<ProcessingResponse> => {
  const service = getApiService();
  return service.uploadAndProcess(file, onProgress);
};

export default {
  getApiService,
  uploadAndProcessDocument,
  isDemoMode
};
