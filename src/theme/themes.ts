import { ThemeState, EmotionalState } from './types';

// The cursed, haunted state - when the bill first appears
// MAXIMUM SPOOKINESS - genuinely unsettling
export const hauntedTheme: ThemeState = {
  colors: {
    primary: '#8B0000',
    secondary: '#3D0A0A',
    background: '#080808',
    surface: '#121212',
    text: '#B8B8B8',
    textMuted: '#555555',
    accent: '#FF3333',
    danger: '#FF0000',
    success: '#2D5A27',
    fog: 'rgba(20, 15, 25, 0.8)',
    glow: 'rgba(255, 50, 50, 0.5)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontFamilySpooky: '"Creepster", "Inter", cursive',
    letterSpacing: '0.03em',
    textShadow: '0 0 15px rgba(255, 50, 50, 0.5), 0 0 30px rgba(139, 0, 0, 0.3)',
  },
  spacing: {
    borderRadius: 0,
    shadows: [
      '0 4px 30px rgba(0, 0, 0, 0.9)',
      '0 0 60px rgba(139, 0, 0, 0.4)',
      'inset 0 0 80px rgba(0, 0, 0, 0.6)',
    ],
  },
  animations: {
    duration: 0.3,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    flicker: true,
    float: true,
  },
  effects: {
    fogOpacity: 0.85,
    glowIntensity: 1.0,
    shadowMovement: true,
    ghostShapes: true,
    parchmentTexture: true,
  },
};

// Processing state - exorcising the demons
// Fog thickens, tension builds, but hope emerges
export const processingTheme: ThemeState = {
  colors: {
    primary: '#8B4513',
    secondary: '#4A2810',
    background: '#0A0A0A',
    surface: '#161616',
    text: '#CCCCCC',
    textMuted: '#777777',
    accent: '#FF6600',
    danger: '#FF5555',
    success: '#3D7A35',
    fog: 'rgba(30, 25, 20, 0.7)',
    glow: 'rgba(255, 100, 0, 0.4)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontFamilySpooky: '"Creepster", "Inter", cursive',
    letterSpacing: '0.02em',
    textShadow: '0 0 10px rgba(255, 100, 0, 0.4), 0 0 20px rgba(139, 69, 19, 0.2)',
  },
  spacing: {
    borderRadius: 2,
    shadows: [
      '0 4px 24px rgba(0, 0, 0, 0.7)',
      '0 0 40px rgba(139, 69, 19, 0.3)',
    ],
  },
  animations: {
    duration: 0.4,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    flicker: true,
    float: true,
  },
  effects: {
    fogOpacity: 0.6,
    glowIntensity: 0.7,
    shadowMovement: true,
    ghostShapes: true,
    parchmentTexture: true,
  },
};

// Understanding state - light breaking through
// Fog fades, colors warm, hope grows
export const understandingTheme: ThemeState = {
  colors: {
    primary: '#2E7D32',
    secondary: '#1B5E20',
    background: '#141816',
    surface: '#1E2420',
    text: '#E0E0E0',
    textMuted: '#9E9E9E',
    accent: '#4CAF50',
    danger: '#EF5350',
    success: '#66BB6A',
    fog: 'rgba(46, 125, 50, 0.1)',
    glow: 'rgba(76, 175, 80, 0.15)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontFamilySpooky: '"Inter", -apple-system, sans-serif',
    letterSpacing: '0',
    textShadow: '0 0 5px rgba(76, 175, 80, 0.2)',
  },
  spacing: {
    borderRadius: 8,
    shadows: [
      '0 4px 16px rgba(0, 0, 0, 0.25)',
      '0 0 25px rgba(76, 175, 80, 0.1)',
    ],
  },
  animations: {
    duration: 0.5,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    flicker: false,
    float: false,
  },
  effects: {
    fogOpacity: 0.1,
    glowIntensity: 0.15,
    shadowMovement: false,
    ghostShapes: false,
    parchmentTexture: false,
  },
};

// Relieved state - curse lifted, peaceful resolution
// Clean, calm, trustworthy - complete transformation
export const relievedTheme: ThemeState = {
  colors: {
    primary: '#1565C0',
    secondary: '#E3F2FD',
    background: '#F8FAFE',
    surface: '#FFFFFF',
    text: '#1A237E',
    textMuted: '#5C6BC0',
    accent: '#2196F3',
    danger: '#E53935',
    success: '#43A047',
    fog: 'transparent',
    glow: 'rgba(33, 150, 243, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontFamilySpooky: '"Inter", -apple-system, sans-serif',
    letterSpacing: '-0.01em',
    textShadow: 'none',
  },
  spacing: {
    borderRadius: 16,
    shadows: [
      '0 2px 12px rgba(21, 101, 192, 0.08)',
      '0 8px 32px rgba(21, 101, 192, 0.12)',
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