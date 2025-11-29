import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ProcessingResponse, ExtractedLineItem } from '../../services/api';
import { useEmotionalTheme, EmotionalState } from '../../theme';
import { LineItem } from './LineItem';
import { getExplanation, formatExplanationText, LineItemExplanation } from '../../services/explanationService';

interface BillAnalysisProps {
  result: ProcessingResponse;
  onComplete: (explanations: Record<string, LineItemExplanation>) => void;
}

// Animations (fogClear reserved for future use)

// Styled Components
const AnalysisContainer = styled(motion.div)`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  text-align: center;
`;

const AnalysisTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamilySpooky};
  text-shadow: ${({ theme }) => theme.typography.textShadow};
  margin-bottom: 0.5rem;
`;

const ProviderInfo = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgressLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.danger} 0%,
    ${({ theme }) => theme.colors.accent} 50%,
    ${({ theme }) => theme.colors.success} 100%
  );
  border-radius: 4px;
`;

const ExorcismMessage = styled(motion.p)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
  font-style: italic;
`;

const LineItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TotalSection = styled(motion.div)<{ $isComplete: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: ${({ theme, $isComplete }) => 
    $isComplete ? theme.colors.success + '20' : theme.colors.surface};
  border: 2px solid ${({ theme, $isComplete }) => 
    $isComplete ? theme.colors.success : theme.colors.accent};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
`;

const TotalLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const TotalAmount = styled.span<{ $isComplete: boolean }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme, $isComplete }) => 
    $isComplete ? theme.colors.success : theme.colors.accent};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  font-weight: 600;
  
  ${({ $variant, theme }) => $variant === 'secondary' ? `
    background: ${theme.colors.surface};
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.secondary};
  ` : `
    background: ${theme.colors.accent};
    color: ${theme.colors.background};
  `}
`;

const DisputeAlert = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.colors.danger}15;
  border: 2px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
`;

const DisputeIcon = styled.span`
  font-size: 2rem;
`;

const DisputeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DisputeTitle = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.danger};
`;

const DisputeText = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`;

const exorcismMessages = [
  "The spirits are revealing the truth...",
  "Decoding the ancient billing runes...",
  "Light breaks through the darkness...",
  "The curse weakens with each revelation...",
  "Understanding dispels the shadows...",
  "The fog of confusion lifts...",
  "Your bill's secrets are exposed...",
  "The exorcism nears completion..."
];

export const BillAnalysis: React.FC<BillAnalysisProps> = ({ result, onComplete }) => {
  const { setEmotionalState } = useEmotionalTheme();
  const [explanations, setExplanations] = useState<Record<string, LineItemExplanation>>({});
  const [formattedExplanations, setFormattedExplanations] = useState<Record<string, string>>({});
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());
  const [currentMessage, setCurrentMessage] = useState(exorcismMessages[0]);
  const [disputeCount, setDisputeCount] = useState(0);
  const [potentialSavings, setPotentialSavings] = useState(0);

  const explainedCount = Object.keys(explanations).length;
  const totalItems = result.lineItems.length;
  const progress = totalItems > 0 ? (explainedCount / totalItems) * 100 : 0;
  const isComplete = explainedCount === totalItems;

  // Update emotional state based on progress
  useEffect(() => {
    if (progress === 0) {
      setEmotionalState(EmotionalState.PROCESSING);
    } else if (progress < 50) {
      setEmotionalState(EmotionalState.PROCESSING);
    } else if (progress < 100) {
      setEmotionalState(EmotionalState.UNDERSTANDING);
    } else {
      setEmotionalState(EmotionalState.RELIEVED);
    }
  }, [progress, setEmotionalState]);

  // Calculate dispute stats when explanations change
  useEffect(() => {
    const disputes = Object.values(explanations).filter(e => e.disputeRecommendation?.shouldDispute);
    setDisputeCount(disputes.length);
    
    // Estimate potential savings (rough estimate based on disputed items)
    const savings = result.lineItems
      .filter(item => explanations[item.id]?.disputeRecommendation?.shouldDispute)
      .reduce((sum, item) => sum + (item.amount || 0) * 0.3, 0); // Assume 30% potential reduction
    setPotentialSavings(savings);
  }, [explanations, result.lineItems]);

  // Rotate exorcism messages
  useEffect(() => {
    if (isComplete) return;
    
    const interval = setInterval(() => {
      const msgIndex = Math.min(
        Math.floor((progress / 100) * exorcismMessages.length),
        exorcismMessages.length - 1
      );
      setCurrentMessage(exorcismMessages[msgIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [progress, isComplete]);

  const handleExplain = useCallback(async (item: ExtractedLineItem) => {
    if (explanations[item.id] || loadingItems.has(item.id)) return;

    setLoadingItems(prev => new Set(prev).add(item.id));

    try {
      // Use the explanation service (real API or mock)
      const explanation = await getExplanation(item, {
        provider: result.metadata.provider,
        serviceDate: result.metadata.serviceDate
      });

      setExplanations(prev => ({ ...prev, [item.id]: explanation }));
      setFormattedExplanations(prev => ({ 
        ...prev, 
        [item.id]: formatExplanationText(explanation) 
      }));
    } catch (error) {
      console.error('Failed to get explanation:', error);
    } finally {
      setLoadingItems(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }
  }, [explanations, loadingItems, result.metadata]);

  const handleExplainAll = useCallback(async () => {
    for (const item of result.lineItems) {
      if (!explanations[item.id]) {
        await handleExplain(item);
      }
    }
  }, [result.lineItems, explanations, handleExplain]);

  return (
    <AnalysisContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <AnalysisTitle>
          {isComplete ? '✨ Curse Lifted!' : '🔮 Exorcising Your Bill'}
        </AnalysisTitle>
        {result.metadata.provider && (
          <ProviderInfo>
            {result.metadata.provider} • {result.metadata.serviceDate}
          </ProviderInfo>
        )}
      </Header>

      <ProgressSection>
        <ProgressHeader>
          <ProgressLabel>
            {isComplete 
              ? 'All charges explained!' 
              : `${explainedCount} of ${totalItems} charges explained`}
          </ProgressLabel>
          <ProgressLabel>{Math.round(progress)}%</ProgressLabel>
        </ProgressHeader>
        <ProgressBar>
          <ProgressFill
            $progress={progress}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </ProgressBar>
      </ProgressSection>

      <AnimatePresence mode="wait">
        {!isComplete && (
          <ExorcismMessage
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {currentMessage}
          </ExorcismMessage>
        )}
      </AnimatePresence>

      <LineItemsContainer>
        {result.lineItems.map((item, index) => (
          <LineItem
            key={item.id}
            item={item}
            index={index}
            isExplained={!!explanations[item.id]}
            explanation={formattedExplanations[item.id]}
            onExplain={() => handleExplain(item)}
            isLoading={loadingItems.has(item.id)}
          />
        ))}
      </LineItemsContainer>

      {isComplete && disputeCount > 0 && (
        <DisputeAlert
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <DisputeIcon>⚠️</DisputeIcon>
          <DisputeInfo>
            <DisputeTitle>Found {disputeCount} charge(s) to review!</DisputeTitle>
            <DisputeText>
              Potential savings: up to ${potentialSavings.toFixed(2)}
            </DisputeText>
          </DisputeInfo>
        </DisputeAlert>
      )}

      <TotalSection $isComplete={isComplete} layout>
        <TotalLabel>
          {isComplete ? '✅ Total Bill' : '💀 Haunted Total'}
        </TotalLabel>
        <TotalAmount $isComplete={isComplete}>
          ${result.metadata.totalAmount?.toFixed(2) || '0.00'}
        </TotalAmount>
      </TotalSection>

      <ActionButtons>
        {!isComplete && (
          <ActionButton
            onClick={handleExplainAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loadingItems.size > 0}
          >
            🔮 Explain All Charges
          </ActionButton>
        )}
        {isComplete && (
          <>
            <ActionButton
              onClick={() => onComplete(explanations)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📋 View Summary
            </ActionButton>
            <ActionButton
              $variant="secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Start Over
            </ActionButton>
          </>
        )}
      </ActionButtons>
    </AnalysisContainer>
  );
};

export default BillAnalysis;
