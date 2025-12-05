import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { useEmotionalTheme } from '../../theme/EmotionalThemeProvider';

const driftAnimation = keyframes`
  0% { transform: translateX(-10%) translateY(0) scale(1); }
  25% { transform: translateX(5%) translateY(-5%) scale(1.05); }
  50% { transform: translateX(10%) translateY(5%) scale(1.1); }
  75% { transform: translateX(-5%) translateY(-3%) scale(1.02); }
  100% { transform: translateX(-10%) translateY(0) scale(1); }
`;

const swirlAnimation = keyframes`
  0% { transform: rotate(0deg) scale(1); opacity: 0.4; }
  50% { transform: rotate(180deg) scale(1.2); opacity: 0.6; }
  100% { transform: rotate(360deg) scale(1); opacity: 0.4; }
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
`;

const FogContainer = styled(motion.div)<{ $intensity: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const FogLayer = styled.div<{ 
  $layer: number; 
  $intensity: number;
  $color: string;
}>`
  position: absolute;
  width: 300%;
  height: 300%;
  top: -100%;
  left: -100%;
  background: radial-gradient(
    ellipse 80% 60% at 50% 50%,
    ${({ $color }) => $color} 0%,
    transparent 50%
  );
  opacity: ${({ $layer, $intensity }) => (0.15 + $layer * 0.1) * $intensity};
  animation: ${driftAnimation} ${({ $layer }) => 25 + $layer * 8}s ease-in-out infinite;
  animation-delay: ${({ $layer }) => $layer * -5}s;
  mix-blend-mode: screen;
`;

const DenseFogLayer = styled.div<{ $intensity: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 30, 0.8) 0%,
    transparent 30%,
    transparent 70%,
    rgba(20, 20, 30, 0.6) 100%
  );
  opacity: ${({ $intensity }) => $intensity * 0.7};
`;

const SwirlFog = styled.div<{ $x: number; $y: number; $size: number; $intensity: number }>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: radial-gradient(
    circle,
    rgba(139, 0, 0, 0.3) 0%,
    rgba(50, 50, 70, 0.2) 40%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(30px);
  animation: ${swirlAnimation} ${({ $size }) => 15 + $size / 20}s ease-in-out infinite;
  opacity: ${({ $intensity }) => $intensity * 0.5};
`;

const EdgeGlow = styled.div<{ $intensity: number; $color: string }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  box-shadow: inset 0 0 150px 50px ${({ $color }) => $color};
  opacity: ${({ $intensity }) => $intensity};
  animation: ${pulseAnimation} 4s ease-in-out infinite;
`;

const BottomMist = styled.div<{ $intensity: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(
    to top,
    rgba(30, 30, 40, 0.9) 0%,
    rgba(30, 30, 40, 0.5) 30%,
    transparent 100%
  );
  opacity: ${({ $intensity }) => $intensity};
`;


export function FogEffect() {
  const { theme, prefersReducedMotion } = useEmotionalTheme();
  
  if (theme.effects.fogOpacity === 0 || prefersReducedMotion) return null;
  
  const intensity = theme.effects.fogOpacity;
  const fogColor = theme.colors.fog;
  const glowColor = theme.colors.glow;

  // Generate swirl positions
  const swirls = [
    { x: 10, y: 20, size: 300 },
    { x: 70, y: 60, size: 400 },
    { x: 30, y: 80, size: 250 },
    { x: 85, y: 15, size: 350 },
    { x: 50, y: 40, size: 280 },
  ];

  return (
    <FogContainer
      $intensity={intensity}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      aria-hidden="true"
    >
      {/* Dense fog at top and bottom */}
      <DenseFogLayer $intensity={intensity} />
      
      {/* Multiple drifting fog layers */}
      {[0, 1, 2, 3].map((layer) => (
        <FogLayer
          key={layer}
          $layer={layer}
          $intensity={intensity}
          $color={fogColor}
        />
      ))}
      
      {/* Swirling fog patches */}
      {swirls.map((swirl, i) => (
        <SwirlFog
          key={i}
          $x={swirl.x}
          $y={swirl.y}
          $size={swirl.size}
          $intensity={intensity}
        />
      ))}
      
      {/* Ominous edge glow */}
      <EdgeGlow $intensity={intensity * 0.8} $color={glowColor} />
      
      {/* Bottom mist rising */}
      <BottomMist $intensity={intensity} />
    </FogContainer>
  );
}
