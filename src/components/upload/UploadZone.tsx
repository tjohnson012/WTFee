import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmotionalTheme, EmotionalState } from '../../theme';
import { FlickerText } from '../effects';

// Types
interface UploadZoneProps {
  onFileUpload: (file: File) => void;
  isProcessing?: boolean;
  maxSize?: number; // in bytes, default 10MB
}

interface UploadError {
  type: 'size' | 'type' | 'unknown';
  message: string;
}

// Animations
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 68, 68, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 68, 68, 0.6), inset 0 0 40px rgba(0, 0, 0, 0.7); }
`;

const fogDrift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  96% { opacity: 0.9; }
  97% { opacity: 1; }
`;

const shadowPulse = keyframes`
  0%, 100% { filter: drop-shadow(0 0 8px rgba(139, 0, 0, 0.4)); }
  50% { filter: drop-shadow(0 0 16px rgba(139, 0, 0, 0.7)); }
`;

// Styled Components
const DropzoneWrapper = styled(motion.div)`
  width: 100%;
  max-width: 500px;
`;

const DropzoneContainer = styled.div<{ 
  $isDragActive: boolean; 
  $hasError: boolean;
  $isProcessing: boolean;
  $hasParchment: boolean;
}>`
  position: relative;
  width: 100%;
  max-width: 500px;
  min-height: 300px;
  padding: 2rem;
  border: 3px dashed ${({ theme, $isDragActive, $hasError }) => 
    $hasError ? theme.colors.danger : 
    $isDragActive ? theme.colors.accent : 
    theme.colors.secondary};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  cursor: ${({ $isProcessing }) => $isProcessing ? 'wait' : 'pointer'};
  overflow: hidden;
  transition: all 0.5s ease;
  
  /* Parchment texture background */
  ${({ $hasParchment }) => $hasParchment && css`
    background: 
      /* Aged paper grain */
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(139, 90, 43, 0.04) 2px,
        rgba(139, 90, 43, 0.04) 4px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(139, 90, 43, 0.03) 2px,
        rgba(139, 90, 43, 0.03) 4px
      ),
      /* Stain marks */
      radial-gradient(ellipse 40% 30% at 15% 25%, rgba(100, 60, 30, 0.08) 0%, transparent 70%),
      radial-gradient(ellipse 35% 40% at 80% 75%, rgba(80, 50, 25, 0.06) 0%, transparent 60%),
      /* Base parchment */
      linear-gradient(
        135deg,
        rgba(45, 35, 28, 0.95) 0%,
        rgba(35, 28, 22, 0.98) 50%,
        rgba(42, 34, 26, 0.95) 100%
      );
    box-shadow: 
      inset 0 0 80px rgba(0, 0, 0, 0.6),
      0 0 30px rgba(139, 0, 0, 0.3),
      0 8px 32px rgba(0, 0, 0, 0.5);
  `}
  
  ${({ $hasParchment }) => !$hasParchment && css`
    background: ${({ theme }) => theme.colors.surface};
  `}
  
  ${({ $isDragActive }) => $isDragActive && css`
    animation: ${pulseGlow} 1.5s ease-in-out infinite;
    transform: scale(1.02);
  `}
  
  ${({ theme, $hasParchment }) => theme.animations.flicker && $hasParchment && css`
    animation: ${flicker} 4s ease-in-out infinite;
  `}
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme, $hasParchment }) => $hasParchment 
      ? `inset 0 0 80px rgba(0, 0, 0, 0.6), 0 0 50px rgba(139, 0, 0, 0.5), 0 8px 32px rgba(0, 0, 0, 0.5)`
      : theme.spacing.shadows[1]};
    transform: translateY(-2px);
  }
  
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transform: none !important;
  }
`;

const FogOverlay = styled.div<{ $opacity: number }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${({ $opacity }) => $opacity};
  background: linear-gradient(
    135deg,
    rgba(30, 30, 40, 0.3) 0%,
    transparent 40%,
    rgba(30, 30, 40, 0.2) 60%,
    transparent 100%
  );
  background-size: 200% 200%;
  animation: ${fogDrift} 8s ease-in-out infinite;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: 200px;
`;

const UploadIcon = styled(motion.div)<{ $isProcessing: boolean; $isHaunted: boolean }>`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.accent};
  text-shadow: ${({ theme }) => theme.typography.textShadow};
  filter: ${({ $isHaunted }) => $isHaunted ? 'drop-shadow(0 0 20px rgba(139, 0, 0, 0.6))' : 'none'};
  
  ${({ theme, $isProcessing, $isHaunted }) => !$isProcessing && theme.effects.shadowMovement && $isHaunted && css`
    animation: ${shadowPulse} 2s ease-in-out infinite;
  `}
  
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

const UploadTitle = styled.h3<{ $isHaunted: boolean }>`
  font-size: 1.35rem;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: ${({ theme, $isHaunted }) => $isHaunted 
    ? `${theme.typography.textShadow}, 0 0 20px rgba(139, 0, 0, 0.4)`
    : theme.typography.textShadow};
  margin: 0;
  text-align: center;
  font-family: ${({ theme, $isHaunted }) => $isHaunted 
    ? theme.typography.fontFamilySpooky 
    : theme.typography.fontFamily};
  letter-spacing: ${({ $isHaunted }) => $isHaunted ? '0.05em' : '0'};
`;

const UploadSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  text-align: center;
`;

const AcceptedFormats = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FormatBadge = styled.span`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ErrorMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.875rem;
  text-align: center;
`;

const ProcessingOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const ProcessingSpinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
`;

const ProcessingText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  text-shadow: ${({ theme }) => theme.typography.textShadow};
`;

// Spooky messages for different states
const DRAG_MESSAGES = [
  "Release the cursed document...",
  "Drop your haunted bill here...",
  "Let the exorcism begin...",
];

const PROCESSING_MESSAGES = [
  "Summoning the spirits of clarity...",
  "Deciphering the ancient billing codes...",
  "Exorcising the confusion...",
  "Translating the medical hieroglyphics...",
];

const ERROR_MESSAGES: Record<string, string> = {
  size: "This document is too powerful! Please upload a file under 10MB.",
  type: "Only sacred scrolls (PDF, JPG, PNG) are accepted here.",
  unknown: "The spirits are disturbed. Please try again.",
};

// Component
export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileUpload,
  isProcessing = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
}) => {
  const { theme, emotionalState } = useEmotionalTheme();
  const isHaunted = emotionalState === EmotionalState.HAUNTED || emotionalState === EmotionalState.PROCESSING;
  const [error, setError] = useState<UploadError | null>(null);
  const [dragMessage] = useState(() => 
    DRAG_MESSAGES[Math.floor(Math.random() * DRAG_MESSAGES.length)]
  );
  const [processingMessage] = useState(() =>
    PROCESSING_MESSAGES[Math.floor(Math.random() * PROCESSING_MESSAGES.length)]
  );

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setError(null);
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      const errorCode = rejection.errors[0]?.code;
      
      if (errorCode === 'file-too-large') {
        setError({ type: 'size', message: ERROR_MESSAGES.size });
      } else if (errorCode === 'file-invalid-type') {
        setError({ type: 'type', message: ERROR_MESSAGES.type });
      } else {
        setError({ type: 'unknown', message: ERROR_MESSAGES.unknown });
      }
      return;
    }
    
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
    maxSize,
    multiple: false,
    disabled: isProcessing,
  });

  return (
    <DropzoneWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DropzoneContainer
        {...getRootProps()}
        $isDragActive={isDragActive}
        $hasError={!!error}
        $isProcessing={isProcessing}
        $hasParchment={theme.effects.parchmentTexture}
        role="button"
        aria-label="Upload medical bill. Drag and drop a file here, or click to select. Accepts PDF, JPG, and PNG files up to 10MB."
        tabIndex={0}
      >
        <input 
          {...getInputProps()} 
          aria-label="File upload input"
          aria-describedby="upload-instructions"
        />
        
        <FogOverlay $opacity={theme.effects.fogOpacity} aria-hidden="true" />
        
        {/* Screen reader instructions */}
        <span id="upload-instructions" className="sr-only">
          Upload your medical bill by dragging and dropping a file, or press Enter to open file browser.
          Supported formats: PDF, JPG, PNG. Maximum file size: 10 megabytes.
        </span>
        
        <ContentWrapper>
        <AnimatePresence mode="wait">
          {isDragActive ? (
            <motion.div
              key="drag-active"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{ textAlign: 'center' }}
            >
              <UploadIcon $isProcessing={false} $isHaunted={isHaunted}>📜</UploadIcon>
              <UploadTitle $isHaunted={isHaunted}>
                {isHaunted ? <FlickerText>{dragMessage}</FlickerText> : dragMessage}
              </UploadTitle>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <UploadIcon 
                $isProcessing={isProcessing}
                $isHaunted={isHaunted}
                animate={isHaunted ? { 
                  y: [0, -12, 0],
                  rotate: [0, -3, 3, 0],
                  scale: [1, 1.05, 1]
                } : { y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {isHaunted ? '💀' : '📄'}
              </UploadIcon>
              <UploadTitle $isHaunted={isHaunted}>
                {isHaunted ? (
                  <FlickerText intensity={0.7}>Drop your cursed medical bill here...</FlickerText>
                ) : (
                  'Drop your medical bill here'
                )}
              </UploadTitle>
              <UploadSubtitle>
                {isHaunted ? '...if you dare to face the truth' : 'or click to select a file'}
              </UploadSubtitle>
              <AcceptedFormats>
                <FormatBadge>PDF</FormatBadge>
                <FormatBadge>JPG</FormatBadge>
                <FormatBadge>PNG</FormatBadge>
              </AcceptedFormats>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {error && (
            <ErrorMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              ⚠️ {error.message}
            </ErrorMessage>
          )}
        </AnimatePresence>
      </ContentWrapper>
      
      <AnimatePresence>
        {isProcessing && (
          <ProcessingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProcessingSpinner
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <ProcessingText>{processingMessage}</ProcessingText>
          </ProcessingOverlay>
        )}
      </AnimatePresence>
    </DropzoneContainer>
    </DropzoneWrapper>
  );
};

export default UploadZone;
