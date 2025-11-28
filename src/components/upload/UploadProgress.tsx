import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useEmotionalTheme } from '../../theme';

interface UploadProgressProps {
  progress: number; // 0-100
  fileName: string;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  errorMessage?: string;
  message?: string; // Custom status message from API
}

// Animations
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(255, 140, 0, 0.3); }
  50% { box-shadow: 0 0 25px rgba(255, 140, 0, 0.6); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const fogWave = keyframes`
  0%, 100% { opacity: 0.3; transform: translateX(-5%); }
  50% { opacity: 0.5; transform: translateX(5%); }
`;

// Styled Components
const ProgressContainer = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.spacing.shadows[0]};
  position: relative;
  overflow: hidden;
`;

const FogLayer = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({ theme }) => theme.colors.fog} 50%,
    transparent 100%
  );
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  animation: ${fogWave} 3s ease-in-out infinite;
  pointer-events: none;
  transition: opacity 0.5s ease;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FileIcon = styled.span`
  font-size: 1.5rem;
`;

const FileName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${({ $status, theme }) => {
    switch ($status) {
      case 'uploading':
        return css`
          background: ${theme.colors.secondary};
          color: ${theme.colors.accent};
        `;
      case 'processing':
        return css`
          background: rgba(255, 140, 0, 0.2);
          color: ${theme.colors.accent};
          animation: ${pulseGlow} 1.5s ease-in-out infinite;
        `;
      case 'complete':
        return css`
          background: rgba(76, 175, 80, 0.2);
          color: ${theme.colors.success};
        `;
      case 'error':
        return css`
          background: rgba(255, 0, 0, 0.2);
          color: ${theme.colors.danger};
        `;
      default:
        return '';
    }
  }}
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const ProgressBarFill = styled(motion.div)<{ $status: string }>`
  height: 100%;
  border-radius: 4px;
  position: relative;
  
  ${({ $status, theme }) => {
    switch ($status) {
      case 'uploading':
      case 'processing':
        return css`
          background: linear-gradient(
            90deg,
            ${theme.colors.accent} 0%,
            ${theme.colors.primary} 50%,
            ${theme.colors.accent} 100%
          );
          background-size: 200% 100%;
          animation: ${shimmer} 2s linear infinite;
        `;
      case 'complete':
        return css`
          background: ${theme.colors.success};
        `;
      case 'error':
        return css`
          background: ${theme.colors.danger};
        `;
      default:
        return css`
          background: ${theme.colors.accent};
        `;
    }
  }}
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  position: relative;
  z-index: 1;
`;

const StatusMessage = styled(motion.p)<{ $isError?: boolean }>`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: ${({ theme, $isError }) => $isError ? theme.colors.danger : theme.colors.textMuted};
  text-align: center;
  position: relative;
  z-index: 1;
`;

// Status messages
const STATUS_MESSAGES: Record<string, string[]> = {
  uploading: [
    "Transferring the cursed document...",
    "Channeling the bill through the void...",
    "Summoning your medical mysteries...",
  ],
  processing: [
    "The spirits are analyzing your bill...",
    "Decoding the ancient medical runes...",
    "Exorcising the billing demons...",
    "Translating the healthcare hieroglyphics...",
  ],
  complete: [
    "The curse has been revealed!",
    "Your bill's secrets are exposed!",
    "The spirits have spoken!",
  ],
  error: [
    "The spirits are disturbed...",
    "A dark force blocks our path...",
    "The ritual has failed...",
  ],
};

const getRandomMessage = (status: string): string => {
  const messages = STATUS_MESSAGES[status] || STATUS_MESSAGES.uploading;
  return messages[Math.floor(Math.random() * messages.length)];
};

export const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  fileName,
  status,
  errorMessage,
  message,
}) => {
  const { theme } = useEmotionalTheme();
  const [fallbackMessage] = React.useState(() => getRandomMessage(status));
  const statusMessage = message || fallbackMessage;
  
  const getFileIcon = () => {
    if (fileName.toLowerCase().endsWith('.pdf')) return '📄';
    if (fileName.toLowerCase().match(/\.(jpg|jpeg|png)$/)) return '🖼️';
    return '📜';
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'uploading': return 'Uploading';
      case 'processing': return 'Processing';
      case 'complete': return 'Complete';
      case 'error': return 'Error';
      default: return status;
    }
  };

  return (
    <ProgressContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <FogLayer $visible={theme.effects.fogOpacity > 0 && status !== 'complete'} />
      
      <Header>
        <FileInfo>
          <FileIcon>{getFileIcon()}</FileIcon>
          <FileName title={fileName}>{fileName}</FileName>
        </FileInfo>
        <StatusBadge $status={status}>{getStatusLabel()}</StatusBadge>
      </Header>
      
      <ProgressBarContainer>
        <ProgressBarFill
          $status={status}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </ProgressBarContainer>
      
      <ProgressText>
        <span>{status === 'complete' ? 'Done' : statusMessage}</span>
        <span>{progress}%</span>
      </ProgressText>
      
      {status === 'error' && errorMessage && (
        <StatusMessage
          $isError
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ⚠️ {errorMessage}
        </StatusMessage>
      )}
    </ProgressContainer>
  );
};

export default UploadProgress;
