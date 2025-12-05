import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  CostComparison as CostComparisonType,
  getPriceRatingColor,
  getPriceRatingLabel,
  formatCurrency
} from '../../services/costComparisonService';

interface CostComparisonProps {
  comparison: CostComparisonType;
}

const Container = styled(motion.div)`
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const RatingBadge = styled.span<{ $color: string }>`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: ${({ $color }) => $color}20;
  color: ${({ $color }) => $color};
  font-weight: 600;
`;

const PriceBar = styled.div`
  position: relative;
  height: 24px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const PriceRange = styled.div<{ $left: number; $width: number }>`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: ${({ $left }) => $left}%;
  width: ${({ $width }) => $width}%;
  background: linear-gradient(90deg, #4CAF50, #FF9800);
  border-radius: 2px;
  opacity: 0.6;
`;

const PriceMarker = styled.div<{ $position: number; $color: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $position }) => $position}%;
  width: 3px;
  background: ${({ $color }) => $color};
  
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    width: 11px;
    height: 11px;
    background: ${({ $color }) => $color};
    border-radius: 50%;
  }
`;

const PriceLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const PriceLabel = styled.span<{ $highlight?: boolean; $color?: string }>`
  ${({ $highlight, $color }) => $highlight && `
    font-weight: 600;
    color: ${$color || 'inherit'};
  `}
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ComparisonItem = styled.div`
  text-align: center;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 4px;
`;

const ComparisonLabel = styled.div`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.25rem;
`;

const ComparisonValue = styled.div<{ $color?: string }>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ $color, theme }) => $color || theme.colors.text};
`;

export const CostComparisonDisplay: React.FC<CostComparisonProps> = ({ comparison }) => {
  const ratingColor = getPriceRatingColor(comparison.priceRating);
  const ratingLabel = getPriceRatingLabel(comparison.priceRating);

  // Calculate positions for the price bar (0-100%)
  const maxPrice = Math.max(comparison.chargedAmount, comparison.highCost) * 1.2;
  const lowPos = (comparison.lowCost / maxPrice) * 100;
  const highPos = (comparison.highCost / maxPrice) * 100;
  const avgPos = (comparison.avgCost / maxPrice) * 100;
  const chargedPos = Math.min((comparison.chargedAmount / maxPrice) * 100, 98);

  return (
    <Container
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <Header>
        <Title>💰 Cost Analysis</Title>
        <RatingBadge $color={ratingColor}>{ratingLabel}</RatingBadge>
      </Header>

      <PriceBar>
        <PriceRange $left={lowPos} $width={highPos - lowPos} />
        <PriceMarker $position={avgPos} $color="#4CAF50" title="Average" />
        <PriceMarker $position={chargedPos} $color={ratingColor} title="Your charge" />
      </PriceBar>

      <PriceLabels>
        <PriceLabel>Low: {formatCurrency(comparison.lowCost)}</PriceLabel>
        <PriceLabel $highlight $color="#4CAF50">Avg: {formatCurrency(comparison.avgCost)}</PriceLabel>
        <PriceLabel>High: {formatCurrency(comparison.highCost)}</PriceLabel>
      </PriceLabels>

      <ComparisonGrid>
        <ComparisonItem>
          <ComparisonLabel>Your Charge</ComparisonLabel>
          <ComparisonValue $color={ratingColor}>
            {formatCurrency(comparison.chargedAmount)}
          </ComparisonValue>
        </ComparisonItem>
        <ComparisonItem>
          <ComparisonLabel>Medicare Rate</ComparisonLabel>
          <ComparisonValue>
            {formatCurrency(comparison.medicareRate)}
          </ComparisonValue>
        </ComparisonItem>
        <ComparisonItem>
          <ComparisonLabel>vs Average</ComparisonLabel>
          <ComparisonValue $color={comparison.percentAboveAvg > 0 ? ratingColor : '#4CAF50'}>
            {comparison.percentAboveAvg > 0 ? '+' : ''}{comparison.percentAboveAvg}%
          </ComparisonValue>
        </ComparisonItem>
      </ComparisonGrid>
    </Container>
  );
};

export default CostComparisonDisplay;
