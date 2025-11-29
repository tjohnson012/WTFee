/**
 * Offline Banner Component
 * Shows when user loses internet connection
 */
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

const Banner = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.75rem 1rem;
  background: #f44336;
  color: white;
  text-align: center;
  font-weight: 500;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Icon = styled.span`
  font-size: 1.25rem;
`;

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <Banner
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          role="alert"
          aria-live="assertive"
        >
          <Icon>📡</Icon>
          You're offline. Some features may not work until you reconnect.
        </Banner>
      )}
    </AnimatePresence>
  );
};

export default OfflineBanner;
