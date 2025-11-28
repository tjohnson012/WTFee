import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useEmotionalTheme } from '../../theme/EmotionalThemeProvider';
import { useMemo } from 'react';

const GhostContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Ghost = styled(motion.div)<{ $size: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    transparent 70%
  );
  filter: blur(20px);
`;

interface GhostData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export function GhostShapes() {
  const { theme, prefersReducedMotion } = useEmotionalTheme();
  
  const ghosts = useMemo<GhostData[]>(() => {
    if (!theme.effects.ghostShapes) return [];
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 100 + Math.random() * 200,
      duration: 15 + Math.random() * 10,
    }));
  }, [theme.effects.ghostShapes]);

  if (!theme.effects.ghostShapes || ghosts.length === 0) return null;

  return (
    <GhostContainer>
      {ghosts.map((ghost) => (
        <Ghost
          key={ghost.id}
          $size={ghost.size}
          initial={{ 
            x: `${ghost.x}vw`, 
            y: `${ghost.y}vh`,
            opacity: 0 
          }}
          animate={prefersReducedMotion ? {
            opacity: 0.3,
          } : {
            x: [`${ghost.x}vw`, `${ghost.x + 10}vw`, `${ghost.x - 5}vw`, `${ghost.x}vw`],
            y: [`${ghost.y}vh`, `${ghost.y - 15}vh`, `${ghost.y + 5}vh`, `${ghost.y}vh`],
            opacity: [0.2, 0.4, 0.1, 0.2],
          }}
          transition={{
            duration: ghost.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </GhostContainer>
  );
}