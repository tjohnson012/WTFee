import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useEmotionalTheme } from '../../theme/EmotionalThemeProvider';
import { ReactNode } from 'react';

const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 
      0 0 20px rgba(255, 68, 68, 0.4),
      0 0 40px rgba(255, 68, 68, 0.2),
      0 0 60px rgba(139, 0, 0, 0.1);
  }
  50% { 
    box-shadow: 
      0 0 30px rgba(255, 68, 68, 0.6),
      0 0 60px rgba(255, 68, 68, 0.3),
      0 0 90px rgba(139, 0, 0, 0.2);
  }
`;

const heartbeat = keyframes`
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.02); }
  28% { transform: scale(1); }
  42% { transform: scale(1.015); }
  70% { transform: scale(1); }
`;

const dangerPulse = keyframes`
  0%, 100% { 
    box-shadow: 
      0 0 10px rgba(255, 0, 0, 0.5),
      inset 0 0 20px rgba(255, 0, 0, 0.1);
  }
  50% { 
    box-shadow: 
      0 0 25px rgba(255, 0, 0, 0.8),
      inset 0 0 30px rgba(255, 0, 0, 0.2);
  }
`;

const GlowContainer = styled(motion.div)<{ 
  $intensity: number;
  $variant: 'ominous' | 'danger' | 'warning';
  $enableHeartbeat: boolean;
}>`
  position: relative;
  
  ${({ $variant, $intensity }) => $variant === 'ominous' && css`
    box-shadow: 
      0 0 ${20 * $intensity}px rgba(255, 68, 68, ${0.4 * $intensity}),
      0 0 ${40 * $intensity}px rgba(255, 68, 68, ${0.2 * $intensity}),
      0 0 ${60 * $intensity}px rgba(139, 0, 0, ${0.1 * $intensity});
    animation: ${pulseGlow} 3s ease-in-out infinite;
  `}
  
  ${({ $variant, $intensity }) => $variant === 'danger' && css`
    box-shadow: 
      0 0 ${15 * $intensity}px rgba(255, 0, 0, ${0.5 * $intensity}),
      inset 0 0 ${20 * $intensity}px rgba(255, 0, 0, ${0.1 * $intensity});
    animation: ${dangerPulse} 1.5s ease-in-out infinite;
  `}
  
  ${({ $variant, $intensity }) => $variant === 'warning' && css`
    box-shadow: 
      0 0 ${15 * $intensity}px rgba(255, 140, 0, ${0.4 * $intensity}),
      0 0 ${30 * $intensity}px rgba(255, 100, 0, ${0.2 * $intensity});
  `}
  
  ${({ $enableHeartbeat }) => $enableHeartbeat && css`
    animation: ${heartbeat} 1.2s ease-in-out infinite;
  `}
  
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

const InnerGlow = styled.div<{ $color: string; $intensity: number }>`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 ${({ $intensity }) => 30 * $intensity}px ${({ $color }) => $color};
  pointer-events: none;
`;

interface OminousGlowProps {
  children: ReactNode;
  variant?: 'ominous' | 'danger' | 'warning';
  enableHeartbeat?: boolean;
  className?: string;
}

export function OminousGlow({ 
  children, 
  variant = 'ominous',
  enableHeartbeat = false,
  className 
}: OminousGlowProps) {
  const { theme, prefersReducedMotion } = useEmotionalTheme();
  
  const intensity = theme.effects.glowIntensity;
  
  if (intensity === 0) {
    return <div className={className}>{children}</div>;
  }

  const glowColor = variant === 'danger' 
    ? 'rgba(255, 0, 0, 0.15)' 
    : variant === 'warning'
    ? 'rgba(255, 140, 0, 0.1)'
    : theme.colors.glow;

  return (
    <GlowContainer
      className={className}
      $intensity={intensity}
      $variant={variant}
      $enableHeartbeat={enableHeartbeat && !prefersReducedMotion && intensity > 0.5}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InnerGlow $color={glowColor} $intensity={intensity} aria-hidden="true" />
      {children}
    </GlowContainer>
  );
}

// Specialized component for money/total amounts
const MoneyGlowContainer = styled(motion.span)<{ $intensity: number; $isHigh: boolean }>`
  display: inline-block;
  padding: 0.25em 0.5em;
  border-radius: 4px;
  background: ${({ $isHigh }) => $isHigh 
    ? 'rgba(139, 0, 0, 0.2)' 
    : 'rgba(255, 140, 0, 0.1)'};
  
  ${({ $isHigh, $intensity }) => $isHigh && css`
    box-shadow: 
      0 0 ${10 * $intensity}px rgba(255, 0, 0, ${0.5 * $intensity}),
      0 0 ${20 * $intensity}px rgba(139, 0, 0, ${0.3 * $intensity});
    animation: ${dangerPulse} 2s ease-in-out infinite;
  `}
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

interface MoneyGlowProps {
  children: ReactNode;
  amount: number;
  threshold?: number;
  className?: string;
}

export function MoneyGlow({ 
  children, 
  amount, 
  threshold = 500,
  className 
}: MoneyGlowProps) {
  const { theme, prefersReducedMotion } = useEmotionalTheme();
  
  const intensity = theme.effects.glowIntensity;
  const isHigh = amount >= threshold;
  
  if (intensity === 0 || prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <MoneyGlowContainer
      className={className}
      $intensity={intensity}
      $isHigh={isHigh}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </MoneyGlowContainer>
  );
}
