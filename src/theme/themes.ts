import { ThemeState, EmotionalState } from './types';

// The cursed, haunted state - when the bill first appears
export const hauntedTheme: ThemeState = {
  colors: {
    primary: '#8B0000',
    secondary: '#4A0E0E',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    text: '#C4C4C4',
    textMuted: '#666666',
    accent: '#FF4444',
    danger: '#FF0000',
    success: '#2D5A27',
    fog: 'rgba(30, 30, 40, 0.6)',
    glow: 'rgba(255, 68, 68, 0.4)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontFamilySpooky: '"Creepster", "Inter", cursive',
    letterSpacing: '0.02em',
    textShadow: '0 0 10px rgba(255, 68, 68, 0.3)',
  },
  spacing: {
    borderRadius: 2,
    shadows: [
      '0 4px 20px rgba(0, 0, 0, 0.8)',
      '0 0 40px rgba(139, 0, 0, 0.3)',
      'inset 0 0 60px rgba(0, 0, 0, 0.5)',
    ],
  },
  animations: {
    duration: 0.3,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    flicker: true,
    float: true,
  },
  effects: {
    fogOpacity: 0.6,
    glowIntensity: 0.8,
    shadowMovement: true,
    ghostShapes: true,
    parchmentTexture: true,
  },
};

// Processing state - exorcising the demons
export const processingTheme: ThemeState = {
  colors: {
    primary: '#7B3F00',
    secondary: '#3D2914',
    background: '#141414',
    surface: '#1F1F1F',
    text: '#D4D4D4',
    textMuted: '#888888',
    accent: '#FF8C00',
    danger: '#FF6B6B',
    success: '#3D7A35',
    fog: 'rgba(40, 35, 30, 0.4)',
    glow: 'rgba(255, 140, 0, 0.3)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontFamilySpooky: '"Creepster", "Inter", cursive',
    letterSpacing: '0.01em',
    textShadow: '0 0 6px rgba(255, 140, 0, 0.2)',
  },
  spacing: {
    borderRadius: 4,
    shadows: [
      '0 4px 16px rgba(0, 0, 0, 0.6)',
      '0 0 30px rgba(123, 63, 0, 0.2)',
    ],
  },
  animations: {
    duration: 0.4,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    flicker: true,
    float: true,
  },
  effects: {
    fogOpacity: 0.4,
    glowIntensity: 0.5,
    shadowMovement: true,
    ghostShapes: true,
    parchmentTexture: true,
  },
};

// Understanding state - light breaking through
export const understandingTheme: ThemeState = {
  colors: {
    primary: '#2E7D32',
    secondary: '#1B4D1E',
    background: '#1A1D1A',
    surface: '#242824',
    text: '#E8E8E8',
    textMuted: '#AAAAAA',
    accent: '#66BB6A',
    danger: '#EF5350',
    success: '#4CAF50',
    fog: 'rgba(46, 125, 50, 0.15)',
    glow: 'rgba(102, 187, 106, 0.2)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontFamilySpooky: '"Inter", -apple-system, sans-serif',
    letterSpacing: '0',
    textShadow: 'none',
  },
  spacing: {
    borderRadius: 8,
    shadows: [
      '0 4px 12px rgba(0, 0, 0, 0.3)',
      '0 0 20px rgba(46, 125, 50, 0.1)',
    ],
  },
  animations: {
    duration: 0.5,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    flicker: false,
    float: false,
  },
  effects: {
    fogOpacity: 0.15,
    glowIntensity: 0.2,
    shadowMovement: false,
    ghostShapes: false,
    parchmentTexture: false,
  },
};

// Relieved state - curse lifted, peaceful resolution
export const relievedTheme: ThemeState = {
  colors: {
    primary: '#1976D2',
    secondary: '#0D47A1',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#212121',
    textMuted: '#757575',
    accent: '#42A5F5',
    danger: '#E53935',
    success: '#43A047',
    fog: 'transparent',
    glow: 'rgba(66, 165, 245, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontFamilySpooky: '"Inter", -apple-system, sans-serif',
    letterSpacing: '0',
    textShadow: 'none',
  },
  spacing: {
    borderRadius: 12,
    shadows: [
      '0 2px 8px rgba(0, 0, 0, 0.1)',
      '0 4px 16px rgba(0, 0, 0, 0.08)',
    ],
  },
  animations: {
    duration: 0.6,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    flicker: false,
    float: false,
  },
  effects: {
    fogOpacity: 0,
    glowIntensity: 0,
    shadowMovement: false,
    ghostShapes: false,
    parchmentTexture: false,
  },
};

// Map emotional states to themes
export const emotionalThemes: Record<EmotionalState, ThemeState> = {
  [EmotionalState.HAUNTED]: hauntedTheme,
  [EmotionalState.PROCESSING]: processingTheme,
  [EmotionalState.UNDERSTANDING]: understandingTheme,
  [EmotionalState.RELIEVED]: relievedTheme,
};