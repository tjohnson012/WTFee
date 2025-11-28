import { useState } from 'react';
import { EmotionalThemeProvider, EmotionalState, useEmotionalTheme } from './theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { AppLayout } from './components/layout';
import { FlickerText } from './components/effects';
import { UploadZone, UploadProgress, DocumentPreview } from './components/upload';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const DemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamilySpooky};
  text-shadow: ${({ theme }) => theme.typography.textShadow};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: normal;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.8;
  max-width: 500px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1rem;
`;

const StateButton = styled(motion.button)<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  background: ${({ $active, theme }) => 
    $active ? theme.colors.accent : theme.colors.surface};
  color: ${({ $active, theme }) => 
    $active ? theme.colors.background : theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.spacing.shadows[0]};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.spacing.shadows[1]};
  }
`;

const UploadSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ActionButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.spacing.shadows[0]};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.spacing.shadows[1]};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.secondary};
  margin: 1rem 0;
`;

function WTFeeApp() {
  const { emotionalState, setEmotionalState } = useEmotionalTheme();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'uploading' | 'processing' | 'complete' | 'error'>('uploading');
  
  const states = [
    { state: EmotionalState.HAUNTED, label: '👻 Haunted' },
    { state: EmotionalState.PROCESSING, label: '⚡ Processing' },
    { state: EmotionalState.UNDERSTANDING, label: '💡 Understanding' },
    { state: EmotionalState.RELIEVED, label: '😌 Relieved' },
  ];

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setUploadProgress(0);
    setUploadStatus('uploading');
    
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploadStatus('processing');
          
          // Simulate processing
          setTimeout(() => {
            setUploadStatus('complete');
            setIsProcessing(false);
            setEmotionalState(EmotionalState.PROCESSING);
          }, 2000);
          
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsProcessing(false);
    setUploadProgress(0);
    setUploadStatus('uploading');
    setEmotionalState(EmotionalState.HAUNTED);
  };

  const handleAnalyze = () => {
    setEmotionalState(EmotionalState.UNDERSTANDING);
    // This would trigger the actual analysis in a real app
  };

  return (
    <DemoContainer>
      <div>
        <Title>
          <FlickerText>WTFee</FlickerText>
        </Title>
        <Subtitle>What The Fee - Medical Bill Decoder</Subtitle>
      </div>
      
      <Description>
        Upload your haunted medical bill and let us exorcise the confusion. 
        We'll translate the cryptic codes and reveal what you're really being charged for.
      </Description>
      
      <UploadSection>
        <AnimatePresence mode="wait">
          {!uploadedFile ? (
            <UploadZone
              key="upload-zone"
              onFileUpload={handleFileUpload}
              isProcessing={isProcessing}
            />
          ) : (
            <motion.div
              key="file-preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <DocumentPreview 
                file={uploadedFile} 
                onRemove={handleRemoveFile}
              />
              
              {isProcessing && (
                <UploadProgress
                  progress={Math.min(uploadProgress, 100)}
                  fileName={uploadedFile.name}
                  status={uploadStatus}
                />
              )}
              
              {!isProcessing && uploadStatus === 'complete' && (
                <ActionButton
                  onClick={handleAnalyze}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔮 Begin the Exorcism
                </ActionButton>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </UploadSection>
      
      <Divider />
      
      <div>
        <Description style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
          Preview emotional states:
        </Description>
        <ButtonGroup>
          {states.map(({ state, label }) => (
            <StateButton
              key={state}
              $active={emotionalState === state}
              onClick={() => setEmotionalState(state)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </StateButton>
          ))}
        </ButtonGroup>
      </div>
    </DemoContainer>
  );
}

function App() {
  return (
    <EmotionalThemeProvider initialState={EmotionalState.HAUNTED}>
      <GlobalStyles />
      <AppLayout>
        <WTFeeApp />
      </AppLayout>
    </EmotionalThemeProvider>
  );
}

export default App;
