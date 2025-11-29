/**
 * Lazy Loading Component Wrapper
 * Provides suspense fallback for code-split components
 */
import { Suspense, ReactNode, ComponentType, lazy } from 'react';
import styled, { keyframes } from 'styled-components';

interface LazyComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 1rem;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const DefaultFallback = () => (
  <LoadingContainer role="status" aria-label="Loading">
    <LoadingSpinner />
    <LoadingText>Summoning components...</LoadingText>
  </LoadingContainer>
);

export const LazyComponent: React.FC<LazyComponentProps> = ({ 
  children, 
  fallback = <DefaultFallback /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

/**
 * Helper to create lazy-loaded components
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) {
  return lazy(importFn);
}

export default LazyComponent;
