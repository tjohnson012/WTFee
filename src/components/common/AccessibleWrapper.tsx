/**
 * Accessible Wrapper Component
 * Provides skip links and ARIA landmarks
 */
import { ReactNode } from 'react';
import styled from 'styled-components';

interface AccessibleWrapperProps {
  children: ReactNode;
}

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  padding: 8px 16px;
  z-index: 1000;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0 0 4px 0;
  
  &:focus {
    top: 0;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const AccessibleWrapper: React.FC<AccessibleWrapperProps> = ({ children }) => {
  return (
    <>
      <SkipLink href="#main-content">
        Skip to main content
      </SkipLink>
      <MainContent id="main-content" role="main" aria-label="Main content">
        {children}
      </MainContent>
    </>
  );
};

export default AccessibleWrapper;
