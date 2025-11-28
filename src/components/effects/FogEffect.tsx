import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useEmotionalTheme } from '../../theme/EmotionalThemeProvider';

const FogContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const FogLayer = styled(motion.div)<{ $layer: number }>`
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: radial-gradient(
    ellipse at center,
    ${({ theme }) => theme.colors.fog} 0%,
    transparent 70%
  );
  opacity: ${({ $layer }) => 0.3 + $layer * 0.15};
`;

export function FogEffect() {
  const { theme, prefersReducedMotion } = useEmotionalTheme();
  
  if (theme.effects.fogOpacity === 0) return null;
  
  const fogVariants = {
    animate: (layer: number) => ({
      x: prefersReducedMotion ? 0 : [0, 50, -30, 0],
      y: prefersReducedMotion ? 0 : [0, -30, 20, 0],
      scale: prefersReducedMotion ? 1 : [1, 1.1, 0.95, 1],
      transition: {
        duration: 20 + layer * 5,
        repeat: Infinity,
        ease: 'linear',
      },
    }),
  };

  return (
    <FogContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: theme.effects.fogOpacity }}
      transition={{ duration: 1 }}
    >
      {[0, 1, 2].map((layer) => (
        <FogLayer
          key={layer}
          $layer={layer}
          custom={layer}
          variants={fogVariants}
          animate="animate"
        />
      ))}
    </FogContainer>
  );
}