import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useEmotionalTheme } from '../../theme';

interface DocumentPreviewProps {
  file: File;
  onRemove?: () => void;
}

// Animations
const ominousGlow = keyframes`
  0%, 100% { 
    box-shadow: 
      0 0 20px rgba(139, 0, 0, 0.4),
      0 0 40px rgba(139, 0, 0, 0.2),
      inset 0 0 30px rgba(0, 0, 0, 0.3);
  }
  50% { 
    box-shadow: 
      0 0 30px rgba(139, 0, 0, 0.6),
      0 0 60px rgba(139, 0, 0, 0.3),
      inset 0 0 40px rgba(0, 0, 0, 0.4);
  }
`;

const edgeDistortion = keyframes`
  0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
  25% { clip-path: polygon(1% 0, 100% 1%, 99% 100%, 0 99%); }
  50% { clip-path: polygon(0 1%, 99% 0, 100% 99%, 1% 100%); }
  75% { clip-path: polygon(1% 1%, 100% 0, 99% 99%, 0 100%); }
`;

const inkBleed = keyframes`
  0%, 100% { filter: blur(0px) contrast(1); }
  50% { filter: blur(0.3px) contrast(1.05); }
`;

// Styled Components
const PreviewContainer = styled(motion.div)<{ $hauntingLevel: number }>`
  position: relative;
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  overflow: hidden;
  
  ${({ $hauntingLevel }) => $hauntingLevel > 0.5 && css`
    animation: ${ominousGlow} 3s ease-in-out infinite;
  `}
`;

const ParchmentOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${({ $visible }) => $visible ? 0.15 : 0};
  background: 
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
    );
  z-index: 2;
  transition: opacity 0.5s ease;
`;

const AgedEdges = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  background: 
    radial-gradient(ellipse at top left, rgba(139, 69, 19, 0.3) 0%, transparent 30%),
    radial-gradient(ellipse at top right, rgba(139, 69, 19, 0.25) 0%, transparent 25%),
    radial-gradient(ellipse at bottom left, rgba(139, 69, 19, 0.35) 0%, transparent 35%),
    radial-gradient(ellipse at bottom right, rgba(139, 69, 19, 0.3) 0%, transparent 30%);
  z-index: 3;
  transition: opacity 0.5s ease;
`;

const ImageWrapper = styled.div<{ $haunted: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 8.5 / 11;
  overflow: hidden;
  
  ${({ $haunted }) => $haunted && css`
    animation: ${edgeDistortion} 8s ease-in-out infinite;
  `}
`;

const PreviewImage = styled.img<{ $haunted: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #1a1a1a;
  
  ${({ $haunted }) => $haunted && css`
    animation: ${inkBleed} 4s ease-in-out infinite;
    filter: sepia(0.2) contrast(1.1);
  `}
`;

const PDFPlaceholder = styled.div<{ $haunted: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  
  ${({ $haunted }) => $haunted && css`
    animation: ${inkBleed} 4s ease-in-out infinite;
  `}
`;

const PDFIcon = styled.span`
  font-size: 4rem;
  filter: drop-shadow(0 0 10px rgba(139, 0, 0, 0.5));
`;

const PDFName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  text-align: center;
  padding: 0 1rem;
  word-break: break-word;
`;

const RemoveButton = styled(motion.button)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.danger};
  color: white;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const FileInfo = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.primary};
`;

const FileDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileSize = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.75rem;
`;

const CursedLabel = styled(motion.div)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  background: rgba(139, 0, 0, 0.8);
  color: #ff6b6b;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 2px;
  z-index: 10;
  box-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
`;

// Helper functions
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  file,
  onRemove,
}) => {
  const { theme } = useEmotionalTheme();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isImage = file.type.startsWith('image/');
  const isPDF = file.type === 'application/pdf';
  const isHaunted = theme.effects.parchmentTexture;

  useEffect(() => {
    if (isImage) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file, isImage]);

  return (
    <PreviewContainer
      $hauntingLevel={theme.effects.glowIntensity}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <ParchmentOverlay $visible={isHaunted} />
      <AgedEdges $visible={isHaunted} />
      
      {isHaunted && (
        <CursedLabel
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          📜 Cursed Document
        </CursedLabel>
      )}
      
      {onRemove && (
        <RemoveButton
          onClick={onRemove}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Remove document"
        >
          ×
        </RemoveButton>
      )}
      
      <ImageWrapper $haunted={isHaunted}>
        {isImage && previewUrl ? (
          <PreviewImage 
            src={previewUrl} 
            alt="Document preview"
            $haunted={isHaunted}
          />
        ) : isPDF ? (
          <PDFPlaceholder $haunted={isHaunted}>
            <PDFIcon>📄</PDFIcon>
            <PDFName>{file.name}</PDFName>
          </PDFPlaceholder>
        ) : (
          <PDFPlaceholder $haunted={isHaunted}>
            <PDFIcon>📜</PDFIcon>
            <PDFName>{file.name}</PDFName>
          </PDFPlaceholder>
        )}
      </ImageWrapper>
      
      <FileInfo>
        <FileDetails>
          <FileName title={file.name}>{file.name}</FileName>
          <FileSize>{formatFileSize(file.size)}</FileSize>
        </FileDetails>
      </FileInfo>
    </PreviewContainer>
  );
};

export default DocumentPreview;
