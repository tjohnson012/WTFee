import React, { useState, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ExtractedLineItem } from '../../services/api';
import { compareItemCost } from '../../services/costComparisonService';
import { CostComparisonDisplay } from './CostComparison';

interface LineItemProps {
  item: ExtractedLineItem;
  index: number;
  isExplained: boolean;
  explanation?: string;
  onExplain: () => void;
  isLoading?: boolean;
  showCostComparison?: boolean;
}

// Animations
const hauntedPulse = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(139, 0, 0, 0.3); }
  50% { box-shadow: 0 0 20px rgba(139, 0, 0, 0.5); }
`;

// exorcismGlow animation reserved for future use

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const ItemContainer = styled(motion.div)<{ $isExplained: boolean; $isDuplicate?: boolean }>`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  border: 1px solid ${({ theme, $isDuplicate }) => 
    $isDuplicate ? theme.colors.danger : theme.colors.secondary};
  overflow: hidden;
  transition: all 0.5s ease;
  
  ${({ $isExplained }) => !$isExplained && css`
    animation: ${hauntedPulse} 3s ease-in-out infinite;
  `}
  
  ${({ $isExplained }) => $isExplained && css`
    border-color: ${({ theme }) => theme.colors.success};
    box-shadow: 0 0 10px rgba(100, 200, 100, 0.2);
  `}
`;

const ItemHeader = styled.div<{ $isExplained: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary}20;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  text-align: left;
`;

const ItemCode = styled.span<{ $isExplained: boolean }>`
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background: ${({ theme, $isExplained }) => 
    $isExplained ? theme.colors.success + '30' : theme.colors.accent + '30'};
  color: ${({ theme, $isExplained }) => 
    $isExplained ? theme.colors.success : theme.colors.accent};
  border-radius: 4px;
  width: fit-content;
`;

const ItemDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.4;
`;

const ItemAmount = styled.div<{ $isExplained: boolean; $isDuplicate?: boolean }>`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme, $isExplained, $isDuplicate }) => 
    $isDuplicate ? theme.colors.danger :
    $isExplained ? theme.colors.success : theme.colors.accent};
  white-space: nowrap;
  margin-left: 1rem;
`;

const DuplicateBadge = styled.span`
  font-size: 0.65rem;
  padding: 0.125rem 0.375rem;
  background: ${({ theme }) => theme.colors.danger};
  color: white;
  border-radius: 4px;
  margin-left: 0.5rem;
  text-transform: uppercase;
`;

const ExplanationPanel = styled(motion.div)`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const ExplanationText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin: 0;
  text-align: left;
`;

const LoadingBar = styled.div`
  height: 4px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent} 0%,
    ${({ theme }) => theme.colors.primary} 50%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s linear infinite;
`;

const ExplainButton = styled(motion.button)<{ $isExplained: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  background: ${({ theme, $isExplained }) => 
    $isExplained ? theme.colors.success : theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  white-space: nowrap;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConfidenceIndicator = styled.div<{ $confidence: number }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $confidence }) => 
      $confidence >= 90 ? '#4CAF50' :
      $confidence >= 70 ? '#FF9800' : '#f44336'};
  }
`;

export const LineItem: React.FC<LineItemProps> = ({
  item,
  index,
  isExplained,
  explanation,
  onExplain,
  isLoading = false,
  showCostComparison = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate cost comparison
  const costComparison = useMemo(() => compareItemCost(item), [item]);

  const handleClick = () => {
    if (isExplained) {
      setIsExpanded(!isExpanded);
    } else {
      onExplain();
    }
  };

  return (
    <ItemContainer
      $isExplained={isExplained}
      $isDuplicate={item.isDuplicate}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      layout
      role="article"
      aria-label={`Line item: ${item.description || item.rawText}, Amount: $${item.amount?.toFixed(2) || '0.00'}${item.isDuplicate ? ', Warning: Duplicate charge' : ''}`}
    >
      {isLoading && <LoadingBar aria-label="Loading explanation" />}
      
      <ItemHeader 
        $isExplained={isExplained} 
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={isExplained ? 'Click to expand explanation' : 'Click to get explanation'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <ItemInfo>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {item.code && (
              <ItemCode $isExplained={isExplained}>{item.code}</ItemCode>
            )}
            <ConfidenceIndicator $confidence={item.confidence}>
              {item.confidence}%
            </ConfidenceIndicator>
            {item.isDuplicate && <DuplicateBadge>⚠️ Duplicate</DuplicateBadge>}
          </div>
          <ItemDescription>
            {item.description || item.rawText}
          </ItemDescription>
        </ItemInfo>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ItemAmount $isExplained={isExplained} $isDuplicate={item.isDuplicate}>
            ${item.amount?.toFixed(2) || '0.00'}
          </ItemAmount>
          
          <ExplainButton
            $isExplained={isExplained}
            onClick={(e) => {
              e.stopPropagation();
              if (!isExplained) onExplain();
              else setIsExpanded(!isExpanded);
            }}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? '🔮' : isExplained ? (isExpanded ? '▲' : '▼') : '🔮 Explain'}
          </ExplainButton>
        </div>
      </ItemHeader>
      
      <AnimatePresence>
        {isExplained && isExpanded && (
          <ExplanationPanel
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {explanation && <ExplanationText>{explanation}</ExplanationText>}
            
            {showCostComparison && costComparison && (
              <div style={{ marginTop: '1rem' }}>
                <CostComparisonDisplay comparison={costComparison} />
              </div>
            )}
          </ExplanationPanel>
        )}
      </AnimatePresence>
    </ItemContainer>
  );
};

export default LineItem;
