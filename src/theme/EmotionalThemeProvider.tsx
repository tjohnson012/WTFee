import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { EmotionalState, ThemeState } from './types';
import { emotionalThemes } from './themes';

interface EmotionalThemeContextValue {
  emotionalState: EmotionalState;
  theme: ThemeState;
  progress: number;
  setEmotionalState: (state: EmotionalState) => void;
  setProgress: (progress: number) => void;
  transitionTo: (state: EmotionalState, duration?: number) => void;
  prefersReducedMotion: boolean;
}

const EmotionalThemeContext = createContext<EmotionalThemeContextValue | undefined>(undefined);

interface EmotionalThemeProviderProps {
  children: ReactNode;
  initialState?: EmotionalState;
}

export function EmotionalThemeProvider({ 
  children, 
  initialState = EmotionalState.HAUNTED 
}: EmotionalThemeProviderProps) {
  const [emotionalState, setEmotionalState] = useState<EmotionalState>(initialState);
  const [progress, setProgress] = useState(0);
  
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Get current theme based on emotional state
  const theme = useMemo(() => emotionalThemes[emotionalState], [emotionalState]);

  // Smooth transition to a new emotional state
  const transitionTo = useCallback((newState: EmotionalState, _duration = 1000) => {
    // For now, immediate transition - can add interpolation later
    setEmotionalState(newState);
  }, []);

  const contextValue = useMemo(() => ({
    emotionalState,
    theme,
    progress,
    setEmotionalState,
    setProgress,
    transitionTo,
    prefersReducedMotion,
  }), [emotionalState, theme, progress, transitionTo, prefersReducedMotion]);

  return (
    <EmotionalThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </EmotionalThemeContext.Provider>
  );
}

export function useEmotionalTheme() {
  const context = useContext(EmotionalThemeContext);
  if (!context) {
    throw new Error('useEmotionalTheme must be used within EmotionalThemeProvider');
  }
  return context;
}