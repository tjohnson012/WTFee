import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { FogEffect, GhostShapes } from '../effects';
import { useEmotionalTheme } from '../../theme';

const LayoutContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 10;
`;

const Header = styled(motion.header)`
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
`;

const Logo = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  text-shadow: ${({ theme }) => theme.typography.textShadow};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Tagline = styled(motion.p)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 0.5rem;
  text-align: center;
`;

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { prefersReducedMotion } = useEmotionalTheme();

  return (
    <LayoutContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      {/* Haunting background effects */}
      <GhostShapes />
      <FogEffect />
      
      <Header>
        <div style={{ textAlign: 'center' }}>
          <Logo
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            WTFee
          </Logo>
          <Tagline
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            What The Fee — Demystify Your Medical Bills
          </Tagline>
        </div>
      </Header>
      
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
}