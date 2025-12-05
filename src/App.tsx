import { useState, useCallback, useEffect } from 'react';
import { EmotionalThemeProvider, EmotionalState, useEmotionalTheme } from './theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { AppLayout } from './components/layout';
import { FlickerText } from './components/effects';
import { UploadZone, UploadProgress, DocumentPreview } from './components/upload';
import { BillAnalysis } from './components/analysis';
import { BillSummary } from './components/summary';
import { PrivacyNotice, ErrorBoundary, OfflineBanner } from './components/common';
import { DemoSelector } from './components/demo';
import { uploadAndProcessDocument, ProcessingResponse, isDemoMode, LineItemExplanation, FullBillAnalysis } from './services';
import { sessionManager } from './utils/security';
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

const ErrorDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  color: ${({ theme }) => theme.colors.danger};
`;

const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.danger};
  color: white;
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  font-size: 0.875rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ResultsSummary = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  
  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  
  strong {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const DemoModeBadge = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 100;
`;

function WTFeeApp() {
  const { emotionalState, setEmotionalState } = useEmotionalTheme();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'uploading' | 'processing' | 'complete' | 'error'>('uploading');
  const [processingResult, setProcessingResult] = useState<ProcessingResponse | null>(null);
  const [processingMessage, setProcessingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [explanations, setExplanations] = useState<Record<string, LineItemExplanation>>({});
  const [fullAnalysis, setFullAnalysis] = useState<FullBillAnalysis | undefined>(undefined);
  
  const states = [
    { state: EmotionalState.HAUNTED, label: '👻 Haunted' },
    { state: EmotionalState.PROCESSING, label: '⚡ Processing' },
    { state: EmotionalState.UNDERSTANDING, label: '💡 Understanding' },
    { state: EmotionalState.RELIEVED, label: '😌 Relieved' },
  ];

  // Cleanup session data on unmount or page close
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionManager.clearAll();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      sessionManager.clearAll();
    };
  }, []);

  const handleFileUpload = useCallback(async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setUploadProgress(0);
    setUploadStatus('uploading');
    setError(null);
    setProcessingResult(null);
    
    try {
      // Use the API service (real or mock based on environment)
      const result = await uploadAndProcessDocument(file, (status, progress) => {
        setProcessingMessage(status);
        setUploadProgress(progress);
        
        if (progress < 50) {
          setUploadStatus('uploading');
        } else if (progress < 100) {
          setUploadStatus('processing');
        }
      });
      
      setProcessingResult(result);
      setUploadStatus('complete');
      setIsProcessing(false);
      setEmotionalState(EmotionalState.PROCESSING);
      
      console.log('Document processed:', result);
      console.log(`Found ${result.lineItems.length} line items`);
      console.log(`Total: $${result.metadata.totalAmount?.toFixed(2)}`);
      
    } catch (err: any) {
      console.error('Processing failed:', err);
      setError(err.message || 'Failed to process document');
      setUploadStatus('error');
      setIsProcessing(false);
    }
  }, [setEmotionalState]);

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsProcessing(false);
    setUploadProgress(0);
    setUploadStatus('uploading');
    setProcessingResult(null);
    setError(null);
    setEmotionalState(EmotionalState.HAUNTED);
  };

  const handleAnalyze = () => {
    setShowAnalysis(true);
    setEmotionalState(EmotionalState.PROCESSING);
  };

  const handleAnalysisComplete = (expls: Record<string, LineItemExplanation>, analysis?: FullBillAnalysis) => {
    setExplanations(expls);
    setFullAnalysis(analysis);
    setShowSummary(true);
    setShowAnalysis(false);
    setEmotionalState(EmotionalState.RELIEVED);
  };

  const handleStartOver = () => {
    setUploadedFile(null);
    setIsProcessing(false);
    setUploadProgress(0);
    setUploadStatus('uploading');
    setProcessingResult(null);
    setError(null);
    setShowAnalysis(false);
    setShowSummary(false);
    setExplanations({});
    setFullAnalysis(undefined);
    setEmotionalState(EmotionalState.HAUNTED);
  };

  // Show summary view
  if (showSummary && processingResult) {
    return (
      <DemoContainer style={{ maxWidth: '800px' }}>
        <BillSummary
          result={processingResult}
          explanations={explanations}
          fullAnalysis={fullAnalysis}
          onStartOver={handleStartOver}
        />
      </DemoContainer>
    );
  }

  // Show analysis view
  if (showAnalysis && processingResult) {
    return (
      <DemoContainer style={{ maxWidth: '800px' }}>
        <BillAnalysis 
          result={processingResult} 
          onComplete={handleAnalysisComplete}
        />
        
        <Divider />
        
        <ActionButton
          onClick={handleStartOver}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ background: 'transparent', border: '1px solid', borderColor: 'inherit' }}
        >
          ← Upload Another Bill
        </ActionButton>
      </DemoContainer>
    );
  }

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

      <PrivacyNotice compact />
      
      <UploadSection>
        <AnimatePresence mode="wait">
          {!uploadedFile && !processingResult ? (
            <>
              <UploadZone
                key="upload-zone"
                onFileUpload={handleFileUpload}
                isProcessing={isProcessing}
              />
              {isDemoMode() && (
                <DemoSelector 
                  onSelectDemo={(result) => {
                    setProcessingResult(result);
                    setUploadStatus('complete');
                    setEmotionalState(EmotionalState.PROCESSING);
                  }} 
                />
              )}
            </>
          ) : uploadedFile ? (
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
                  message={processingMessage}
                />
              )}
              
              {error && (
                <ErrorDisplay>
                  ⚠️ {error}
                  <RetryButton onClick={() => handleFileUpload(uploadedFile)}>
                    Try Again
                  </RetryButton>
                </ErrorDisplay>
              )}
              
              {!isProcessing && uploadStatus === 'complete' && processingResult && (
                <>
                  <ResultsSummary>
                    <SummaryItem>
                      <span>📋 Line Items Found</span>
                      <strong>{processingResult.lineItems.length}</strong>
                    </SummaryItem>
                    <SummaryItem>
                      <span>💰 Total Amount</span>
                      <strong>${processingResult.metadata.totalAmount?.toFixed(2) || '0.00'}</strong>
                    </SummaryItem>
                    <SummaryItem>
                      <span>🎯 Confidence</span>
                      <strong>{processingResult.confidence}%</strong>
                    </SummaryItem>
                  </ResultsSummary>
                  <ActionButton
                    onClick={handleAnalyze}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🔮 Begin the Exorcism
                  </ActionButton>
                </>
              )}
            </motion.div>
          ) : processingResult && !uploadedFile ? (
            <motion.div
              key="demo-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <ResultsSummary>
                <SummaryItem>
                  <span>📋 Line Items Found</span>
                  <strong>{processingResult.lineItems.length}</strong>
                </SummaryItem>
                <SummaryItem>
                  <span>💰 Total Amount</span>
                  <strong>${processingResult.metadata.totalAmount?.toFixed(2) || '0.00'}</strong>
                </SummaryItem>
                <SummaryItem>
                  <span>🎯 Confidence</span>
                  <strong>{processingResult.confidence}%</strong>
                </SummaryItem>
              </ResultsSummary>
              <ActionButton
                onClick={handleAnalyze}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔮 Begin the Exorcism
              </ActionButton>
            </motion.div>
          ) : null}
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
    <ErrorBoundary>
      <EmotionalThemeProvider initialState={EmotionalState.HAUNTED}>
        <GlobalStyles />
        <OfflineBanner />
        {isDemoMode() && <DemoModeBadge>🎃 Demo Mode</DemoModeBadge>}
        <AppLayout>
          <WTFeeApp />
        </AppLayout>
      </EmotionalThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
