/**
 * Demo Selector Component
 * Allows quick selection of sample bills for demo presentations
 */
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { sampleBills } from '../../data/sampleBills';
import { ProcessingResponse } from '../../services/api';

interface DemoSelectorProps {
  onSelectDemo: (result: ProcessingResponse) => void;
}

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px dashed ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  margin-top: 1rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const DemoButton = styled(motion.button)`
  padding: 0.75rem 1.25rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 140px;
`;

const ButtonIcon = styled.span`
  font-size: 1.5rem;
`;

const ButtonLabel = styled.span`
  font-size: 0.75rem;
  opacity: 0.9;
`;

export const DemoSelector: React.FC<DemoSelectorProps> = ({ onSelectDemo }) => {
  return (
    <Container
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Title>🎃 Quick Demo - Select a Sample Bill</Title>
      <ButtonGroup>
        <DemoButton
          onClick={() => onSelectDemo(sampleBills['er-visit'])}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ButtonIcon>🏥</ButtonIcon>
          ER Visit
          <ButtonLabel>$5,617 • 6 items</ButtonLabel>
        </DemoButton>
        <DemoButton
          onClick={() => onSelectDemo(sampleBills['routine-checkup'])}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ButtonIcon>🩺</ButtonIcon>
          Routine Checkup
          <ButtonLabel>$1,361 • 7 items</ButtonLabel>
        </DemoButton>
      </ButtonGroup>
    </Container>
  );
};

export default DemoSelector;
