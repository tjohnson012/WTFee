import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ProcessingResponse, ExtractedLineItem } from '../../services/api';
import { useEmotionalTheme, EmotionalState } from '../../theme';
import { LineItem } from './LineItem';

interface BillAnalysisProps {
  result: ProcessingResponse;
  onComplete: () => void;
}

// Mock explanations for demo
const mockExplanations: Record<string, string> = {
  '99213': `This is a standard office visit for an established patient. The "Level 3" means moderate complexity - your doctor spent about 15-30 minutes with you discussing symptoms and treatment. This is one of the most common billing codes. Average cost: $100-150. Your charge of $185 is slightly above average but within normal range for hospital-based practices.`,
  '36415': `This is the charge for drawing your blood (venipuncture). A trained phlebotomist inserted a needle into your vein to collect blood samples. This is a routine procedure. Average cost: $20-40. Your charge of $45 is reasonable.`,
  '80053': `The Comprehensive Metabolic Panel tests 14 different things in your blood including glucose, calcium, kidney function, and liver function. It's a standard screening test. Average cost: $100-200. Your charge of $287 is on the higher end - you might want to ask about this.`,
  '85025': `A Complete Blood Count (CBC) measures your red blood cells, white blood cells, and platelets. It helps detect infections, anemia, and other conditions. Average cost: $50-100. Your charge of $156 is above average.`,
  '81001': `This is a basic urinalysis using a dipstick test. It checks for infections, kidney problems, and diabetes. Very routine test. Average cost: $30-50. Your charge of $78 is higher than typical.`,
  'default': `This appears to be a facility or administrative fee. These charges cover the overhead costs of the medical facility including equipment, staff, and building maintenance. While common, facility fees can vary widely and are often negotiable.`
};

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
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());
  const [currentMessage, setCurrentMessage] = useState(exorcismMessages[0]);

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

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Get explanation (mock for demo)
    const explanation = item.code 
      ? mockExplanations[item.code] || mockExplanations['default']
      : mockExplanations['default'];

    setExplanations(prev => ({ ...prev, [item.id]: explanation }));
    setLoadingItems(prev => {
      const next = new Set(prev);
      next.delete(item.id);
      return next;
    });
  }, [explanations, loadingItems]);

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
            explanation={explanations[item.id]}
            onExplain={() => handleExplain(item)}
            isLoading={loadingItems.has(item.id)}
          />
        ))}
      </LineItemsContainer>

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
              onClick={onComplete}
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
