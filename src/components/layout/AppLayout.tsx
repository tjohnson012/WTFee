import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { FogEffect, GhostShapes, FlickerText } from '../effects';
import { useEmotionalTheme, EmotionalState } from '../../theme';

const edgeGlow = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const LayoutContainer = styled(motion.div)<{ $state: EmotionalState }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  
  /* Ominous vignette effect */
  &::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      transparent 50%,
      ${({ $state }) => 
        $state === EmotionalState.HAUNTED || $state === EmotionalState.PROCESSING
          ? `rgba(0, 0, 0, 0.7) 100%`
          : $state === EmotionalState.UNDERSTANDING
          ? `rgba(0, 0, 0, 0.3) 100%`
          : `transparent 100%`
      }
    );
    transition: background 1s ease-in-out;
  }
  
  /* Edge glow for haunted states */
  ${({ $state }) => ($state === EmotionalState.HAUNTED || $state === EmotionalState.PROCESSING) && css`
    &::after {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 3;
      box-shadow: inset 0 0 150px rgba(139, 0, 0, 0.4);
      animation: ${edgeGlow} 4s ease-in-out infinite;
      
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }
  `}
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

const Logo = styled(motion.h1)<{ $state: EmotionalState }>`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  text-shadow: ${({ theme }) => theme.typography.textShadow};
  font-family: ${({ theme, $state }) => 
    $state === EmotionalState.HAUNTED || $state === EmotionalState.PROCESSING
      ? theme.typography.fontFamilySpooky
      : theme.typography.fontFamily};
  letter-spacing: ${({ $state }) => 
    $state === EmotionalState.HAUNTED ? '0.1em' : '0'};
  transition: all 0.5s ease-in-out;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Tagline = styled(motion.p)<{ $state: EmotionalState }>`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 0.5rem;
  text-align: center;
  font-style: ${({ $state }) => 
    $state === EmotionalState.HAUNTED ? 'italic' : 'normal'};
  transition: all 0.5s ease-in-out;
`;

// Creepy subtitle messages per state
const TAGLINES: Record<EmotionalState, string> = {
  [EmotionalState.HAUNTED]: '🕯️ Dare to face your medical bill nightmares...',
  [EmotionalState.PROCESSING]: '⚡ The spirits are deciphering your cursed document...',
  [EmotionalState.UNDERSTANDING]: '💡 The fog lifts... clarity emerges...',
  [EmotionalState.RELIEVED]: '✨ Your bill has been decoded. Knowledge is power.',
};

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { prefersReducedMotion, emotionalState } = useEmotionalTheme();

  return (
    <LayoutContainer
      $state={emotionalState}
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
            $state={emotionalState}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {emotionalState === EmotionalState.HAUNTED || emotionalState === EmotionalState.PROCESSING ? (
              <FlickerText intensity={emotionalState === EmotionalState.HAUNTED ? 1 : 0.5}>
                WTFee
              </FlickerText>
            ) : (
              'WTFee'
            )}
          </Logo>
          <Tagline
            $state={emotionalState}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            key={emotionalState} // Re-animate on state change
          >
            {TAGLINES[emotionalState]}
          </Tagline>
        </div>
      </Header>
      
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
}