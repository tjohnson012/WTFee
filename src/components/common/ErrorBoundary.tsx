/**
 * Error Boundary Component
 * Catches React errors and displays a friendly fallback UI
 */
import { Component, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem;
  text-align: center;
`;

const ErrorIcon = styled.span`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  color: #f44336;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  max-width: 400px;
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #ff8c00;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #e67e00;
  }
`;

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer role="alert">
          <ErrorIcon>👻</ErrorIcon>
          <ErrorTitle>Something Went Wrong</ErrorTitle>
          <ErrorMessage>
            The spirits encountered an unexpected disturbance. 
            Don't worry, your data is safe.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            🔄 Try Again
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
