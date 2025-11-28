import { EmotionalThemeProvider, EmotionalState, useEmotionalTheme } from './theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { AppLayout } from './components/layout';
import { FlickerText } from './components/effects';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.8;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const StateButton = styled(motion.button)<{ $active?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  background: ${({ $active, theme }) => 
    $active ? theme.colors.accent : theme.colors.surface};
  color: ${({ $active, theme }) => 
    $active ? theme.colors.background : theme.colors.text};
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.spacing.shadows[0]};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.spacing.shadows[1]};
  }
`;

const CurrentState = styled.div`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.spacing.shadows[0]};
`;

function ThemeDemo() {
  const { emotionalState, setEmotionalState } = useEmotionalTheme();
  
  const states = [
    { state: EmotionalState.HAUNTED, label: '👻 Haunted' },
    { state: EmotionalState.PROCESSING, label: '⚡ Processing' },
    { state: EmotionalState.UNDERSTANDING, label: '💡 Understanding' },
    { state: EmotionalState.RELIEVED, label: '😌 Relieved' },
  ];

  return (
    <DemoContainer>
      <Title>
        <FlickerText>Experience the Emotional Journey</FlickerText>
      </Title>
      
      <Description>
        Watch the interface transform from haunted to peaceful as you progress 
        through understanding your medical bill. Click the buttons below to 
        preview each emotional state.
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
      
      <CurrentState>
        <p>Current State: <strong>{emotionalState}</strong></p>
      </CurrentState>
    </DemoContainer>
  );
}

function App() {
  return (
    <EmotionalThemeProvider initialState={EmotionalState.HAUNTED}>
      <GlobalStyles />
      <AppLayout>
        <ThemeDemo />
      </AppLayout>
    </EmotionalThemeProvider>
  );
}

export default App;