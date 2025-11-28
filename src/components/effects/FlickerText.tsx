import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useEmotionalTheme } from '../../theme/EmotionalThemeProvider';
import { ReactNode } from 'react';

const FlickerSpan = styled(motion.span)`
  display: inline-block;
`;

interface FlickerTextProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

export function FlickerText({ children, intensity = 1, className }: FlickerTextProps) {
  const { theme, prefersReducedMotion } = useEmotionalTheme();
  
  if (!theme.animations.flicker || prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  const flickerVariants = {
    animate: {
      opacity: [1, 0.8, 1, 0.9, 1, 0.85, 1],
      textShadow: [
        theme.typography.textShadow,
        `0 0 ${15 * intensity}px rgba(255, 68, 68, 0.5)`,
        theme.typography.textShadow,
        `0 0 ${8 * intensity}px rgba(255, 68, 68, 0.3)`,
        theme.typography.textShadow,
      ],
      transition: {
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <FlickerSpan
      className={className}
      variants={flickerVariants}
      animate="animate"
    >
      {children}
    </FlickerSpan>
  );
}