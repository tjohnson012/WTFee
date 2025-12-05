import { motion } from 'framer-motion';
import styled, { keyframes, css } from 'styled-components';
import { useEmotionalTheme } from '../../theme/EmotionalThemeProvider';
import { ReactNode, useMemo } from 'react';

// Intense flickering animation
const intenseFlicker = keyframes`
  0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(255, 68, 68, 0.5); }
  5% { opacity: 0.8; text-shadow: 0 0 20px rgba(255, 68, 68, 0.8); }
  10% { opacity: 1; text-shadow: 0 0 5px rgba(255, 68, 68, 0.3); }
  15% { opacity: 0.9; }
  20% { opacity: 1; }
  55% { opacity: 1; }
  56% { opacity: 0.7; text-shadow: 0 0 30px rgba(255, 0, 0, 1); }
  57% { opacity: 1; }
  80% { opacity: 1; }
  81% { opacity: 0.85; }
  82% { opacity: 1; }
  83% { opacity: 0.9; text-shadow: 0 0 15px rgba(255, 68, 68, 0.6); }
  84% { opacity: 1; }
`;

const subtleFlicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.9; }
  94% { opacity: 1; }
  96% { opacity: 0.95; }
  97% { opacity: 1; }
`;

const glitchEffect = keyframes`
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 1px); }
  40% { transform: translate(2px, -1px); }
  60% { transform: translate(-1px, -1px); }
  80% { transform: translate(1px, 1px); }
`;

const FlickerSpan = styled(motion.span)<{ 
  $intensity: number;
  $enableGlitch: boolean;
}>`
  display: inline-block;
  position: relative;
  
  ${({ $intensity }) => $intensity > 0.5 && css`
    animation: ${intenseFlicker} ${3 + Math.random() * 2}s ease-in-out infinite;
  `}
  
  ${({ $intensity }) => $intensity > 0 && $intensity <= 0.5 && css`
    animation: ${subtleFlicker} ${4 + Math.random() * 2}s ease-in-out infinite;
  `}
  
  ${({ $enableGlitch }) => $enableGlitch && css`
    &:hover {
      animation: ${glitchEffect} 0.3s ease-in-out;
    }
  `}
  
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

const GlitchLayer = styled.span<{ $offset: number; $color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: inset(${({ $offset }) => $offset * 10}% 0 ${({ $offset }) => (1 - $offset) * 10}% 0);
  transform: translateX(${({ $offset }) => ($offset - 0.5) * 4}px);
  color: ${({ $color }) => $color};
  opacity: 0.8;
  pointer-events: none;
  
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

interface FlickerTextProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
  enableGlitch?: boolean;
}

export function FlickerText({ 
  children, 
  intensity = 1, 
  className,
  enableGlitch = false 
}: FlickerTextProps) {
  const { theme, prefersReducedMotion } = useEmotionalTheme();
  
  const effectIntensity = useMemo(() => {
    if (prefersReducedMotion || !theme.animations.flicker) return 0;
    return intensity * theme.effects.glowIntensity;
  }, [prefersReducedMotion, theme.animations.flicker, theme.effects.glowIntensity, intensity]);
  
  if (effectIntensity === 0) {
    return <span className={className}>{children}</span>;
  }

  return (
    <FlickerSpan
      className={className}
      $intensity={effectIntensity}
      $enableGlitch={enableGlitch && effectIntensity > 0.5}
      style={{
        textShadow: theme.typography.textShadow,
      }}
    >
      {children}
      {enableGlitch && effectIntensity > 0.7 && (
        <>
          <GlitchLayer $offset={0.3} $color="rgba(255, 0, 0, 0.5)" aria-hidden="true">
            {children}
          </GlitchLayer>
          <GlitchLayer $offset={0.7} $color="rgba(0, 255, 255, 0.5)" aria-hidden="true">
            {children}
          </GlitchLayer>
        </>
      )}
    </FlickerSpan>
  );
}

// Flickering container for larger elements
const FlickerContainerDiv = styled(motion.div)<{ $intensity: number }>`
  ${({ $intensity }) => $intensity > 0 && css`
    animation: ${subtleFlicker} ${5 + Math.random() * 3}s ease-in-out infinite;
  `}
  
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

interface FlickerContainerProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

export function FlickerContainer({ children, intensity = 0.5, className }: FlickerContainerProps) {
  const { theme, prefersReducedMotion } = useEmotionalTheme();
  
  const effectIntensity = prefersReducedMotion || !theme.animations.flicker 
    ? 0 
    : intensity * theme.effects.glowIntensity;
  
  return (
    <FlickerContainerDiv className={className} $intensity={effectIntensity}>
      {children}
    </FlickerContainerDiv>
  );
}
