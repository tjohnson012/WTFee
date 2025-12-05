import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { useEmotionalTheme } from '../../theme/EmotionalThemeProvider';
import { useMemo } from 'react';

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(-3deg); }
  75% { transform: translateY(-25px) rotate(2deg); }
`;

const driftAnimation = keyframes`
  0% { transform: translateX(0) translateY(0); }
  33% { transform: translateX(30px) translateY(-20px); }
  66% { transform: translateX(-20px) translateY(10px); }
  100% { transform: translateX(0) translateY(0); }
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.1); }
`;

const GhostContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

// Wispy ghost shape
const WispyGhost = styled(motion.div)<{ 
  $size: number;
  $x: number;
  $y: number;
  $delay: number;
}>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size * 1.5}px;
  background: radial-gradient(
    ellipse 50% 60% at 50% 30%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.08) 30%,
    rgba(200, 200, 220, 0.05) 50%,
    transparent 70%
  );
  filter: blur(8px);
  animation: ${floatAnimation} ${({ $size }) => 8 + $size / 30}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

// Orb-like spirit
const SpiritOrb = styled(motion.div)<{
  $size: number;
  $x: number;
  $y: number;
  $color: string;
}>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    ${({ $color }) => $color} 0%,
    rgba(255, 255, 255, 0.05) 40%,
    transparent 70%
  );
  filter: blur(15px);
  animation: ${driftAnimation} ${({ $size }) => 12 + $size / 20}s ease-in-out infinite;
`;

// Shadowy figure
const ShadowFigure = styled(motion.div)<{
  $x: number;
  $y: number;
  $scale: number;
}>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: 60px;
  height: 120px;
  transform: scale(${({ $scale }) => $scale});
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 30%,
    rgba(0, 0, 0, 0.3) 60%,
    transparent 100%
  );
  border-radius: 30px 30px 0 0;
  filter: blur(20px);
  animation: ${pulseAnimation} 6s ease-in-out infinite;
`;

// Floating particles
const Particle = styled(motion.div)<{
  $x: number;
  $y: number;
  $size: number;
  $duration: number;
}>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  filter: blur(2px);
`;

interface GhostData {
  id: number;
  type: 'wispy' | 'orb' | 'shadow' | 'particle';
  x: number;
  y: number;
  size: number;
  delay: number;
  color?: string;
}


export function GhostShapes() {
  const { theme, prefersReducedMotion } = useEmotionalTheme();
  
  const ghosts = useMemo<GhostData[]>(() => {
    if (!theme.effects.ghostShapes || prefersReducedMotion) return [];
    
    const intensity = theme.effects.glowIntensity;
    const ghostCount = Math.floor(3 + intensity * 5);
    
    return [
      // Wispy ghosts
      ...Array.from({ length: Math.ceil(ghostCount * 0.4) }, (_, i) => ({
        id: i,
        type: 'wispy' as const,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: 80 + Math.random() * 120,
        delay: Math.random() * 5,
      })),
      // Spirit orbs
      ...Array.from({ length: Math.ceil(ghostCount * 0.3) }, (_, i) => ({
        id: 100 + i,
        type: 'orb' as const,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 100 + Math.random() * 150,
        delay: Math.random() * 3,
        color: `rgba(${139 + Math.random() * 50}, ${Math.random() * 50}, ${Math.random() * 50}, 0.2)`,
      })),
      // Shadow figures (only in high intensity)
      ...(intensity > 0.5 ? Array.from({ length: 2 }, (_, i) => ({
        id: 200 + i,
        type: 'shadow' as const,
        x: i === 0 ? 5 + Math.random() * 15 : 80 + Math.random() * 15,
        y: 60 + Math.random() * 30,
        size: 0.8 + Math.random() * 0.4,
        delay: 0,
      })) : []),
      // Floating particles
      ...Array.from({ length: Math.ceil(ghostCount * 0.5) }, (_, i) => ({
        id: 300 + i,
        type: 'particle' as const,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 10,
      })),
    ];
  }, [theme.effects.ghostShapes, theme.effects.glowIntensity, prefersReducedMotion]);

  if (!theme.effects.ghostShapes || ghosts.length === 0 || prefersReducedMotion) {
    return null;
  }

  return (
    <GhostContainer aria-hidden="true">
      {ghosts.map((ghost) => {
        switch (ghost.type) {
          case 'wispy':
            return (
              <WispyGhost
                key={ghost.id}
                $size={ghost.size}
                $x={ghost.x}
                $y={ghost.y}
                $delay={ghost.delay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 2 }}
              />
            );
          case 'orb':
            return (
              <SpiritOrb
                key={ghost.id}
                $size={ghost.size}
                $x={ghost.x}
                $y={ghost.y}
                $color={ghost.color || 'rgba(255, 255, 255, 0.1)'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 3 }}
              />
            );
          case 'shadow':
            return (
              <ShadowFigure
                key={ghost.id}
                $x={ghost.x}
                $y={ghost.y}
                $scale={ghost.size}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 4 }}
              />
            );
          case 'particle':
            return (
              <Particle
                key={ghost.id}
                $x={ghost.x}
                $y={ghost.y}
                $size={ghost.size}
                $duration={ghost.delay}
                initial={{ opacity: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  y: [-20, -100],
                }}
                transition={{
                  duration: 8 + ghost.delay,
                  repeat: Infinity,
                  delay: ghost.delay,
                }}
              />
            );
          default:
            return null;
        }
      })}
    </GhostContainer>
  );
}
