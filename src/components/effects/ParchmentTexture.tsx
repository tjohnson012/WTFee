import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useEmotionalTheme } from '../../theme/EmotionalThemeProvider';
import { ReactNode } from 'react';

const burnEdge = keyframes`
  0%, 100% { filter: brightness(1) sepia(0.3); }
  50% { filter: brightness(0.95) sepia(0.4); }
`;

const inkBleed = keyframes`
  0%, 100% { text-shadow: 0 0 1px rgba(0, 0, 0, 0.5); }
  50% { text-shadow: 0 0 3px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(139, 0, 0, 0.3); }
`;

const ParchmentContainer = styled(motion.div)<{ 
  $intensity: number;
  $enableBurn: boolean;
}>`
  position: relative;
  background: 
    /* Aged paper texture */
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(139, 90, 43, 0.03) 2px,
      rgba(139, 90, 43, 0.03) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(139, 90, 43, 0.02) 2px,
      rgba(139, 90, 43, 0.02) 4px
    ),
    /* Base parchment color */
    linear-gradient(
      135deg,
      rgba(45, 35, 25, 0.95) 0%,
      rgba(35, 28, 20, 0.98) 50%,
      rgba(40, 32, 22, 0.95) 100%
    );
  
  /* Torn/burned edges effect */
  ${({ $enableBurn, $intensity }) => $enableBurn && css`
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(ellipse at 0% 0%, rgba(139, 0, 0, ${0.3 * $intensity}) 0%, transparent 30%),
        radial-gradient(ellipse at 100% 0%, rgba(139, 0, 0, ${0.25 * $intensity}) 0%, transparent 25%),
        radial-gradient(ellipse at 0% 100%, rgba(139, 0, 0, ${0.2 * $intensity}) 0%, transparent 20%),
        radial-gradient(ellipse at 100% 100%, rgba(139, 0, 0, ${0.35 * $intensity}) 0%, transparent 35%);
      pointer-events: none;
      animation: ${burnEdge} 4s ease-in-out infinite;
    }
  `}
  
  /* Stain marks */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 30% 20% at 20% 30%, rgba(100, 60, 30, ${({ $intensity }) => 0.1 * $intensity}) 0%, transparent 70%),
      radial-gradient(ellipse 25% 35% at 75% 70%, rgba(80, 50, 25, ${({ $intensity }) => 0.08 * $intensity}) 0%, transparent 60%),
      radial-gradient(ellipse 40% 25% at 50% 85%, rgba(90, 55, 28, ${({ $intensity }) => 0.12 * $intensity}) 0%, transparent 65%);
    pointer-events: none;
    opacity: ${({ $intensity }) => $intensity};
  }
  
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  box-shadow: 
    inset 0 0 50px rgba(0, 0, 0, 0.5),
    0 4px 20px rgba(0, 0, 0, 0.6),
    0 0 ${({ $intensity }) => 30 * $intensity}px rgba(139, 0, 0, ${({ $intensity }) => 0.3 * $intensity});
  
  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`;

const ParchmentContent = styled.div<{ $intensity: number }>`
  position: relative;
  z-index: 1;
  
  /* Ink bleed effect on text */
  ${({ $intensity }) => $intensity > 0.5 && css`
    animation: ${inkBleed} 3s ease-in-out infinite;
  `}
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const WaxSeal = styled.div<{ $position: 'top-right' | 'bottom-left' }>`
  position: absolute;
  ${({ $position }) => $position === 'top-right' ? 'top: -15px; right: -15px;' : 'bottom: -15px; left: -15px;'}
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    #8B0000 0%,
    #5C0000 50%,
    #3D0000 100%
  );
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 0.2),
    inset 0 -2px 4px rgba(0, 0, 0, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.5);
  
  &::after {
    content: '💀';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  }
`;

interface ParchmentTextureProps {
  children: ReactNode;
  className?: string;
  showWaxSeal?: boolean;
  sealPosition?: 'top-right' | 'bottom-left';
}

export function ParchmentTexture({ 
  children, 
  className,
  showWaxSeal = false,
  sealPosition = 'top-right'
}: ParchmentTextureProps) {
  const { theme, prefersReducedMotion } = useEmotionalTheme();
  
  const intensity = theme.effects.parchmentTexture ? theme.effects.glowIntensity : 0;
  
  if (intensity === 0) {
    return <div className={className}>{children}</div>;
  }

  return (
    <ParchmentContainer
      className={className}
      $intensity={intensity}
      $enableBurn={intensity > 0.3 && !prefersReducedMotion}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ParchmentContent $intensity={intensity}>
        {children}
      </ParchmentContent>
      {showWaxSeal && <WaxSeal $position={sealPosition} aria-hidden="true" />}
    </ParchmentContainer>
  );
}
