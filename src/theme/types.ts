// Emotional states for the haunting-to-healing journey
export enum EmotionalState {
  HAUNTED = 'haunted',
  PROCESSING = 'processing',
  UNDERSTANDING = 'understanding',
  RELIEVED = 'relieved',
}

// Theme state for each emotional phase
export interface ThemeState {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    accent: string;
    danger: string;
    success: string;
    fog: string;
    glow: string;
  };
  typography: {
    fontFamily: string;
    fontFamilySpooky: string;
    letterSpacing: string;
    textShadow: string;
  };
  spacing: {
    borderRadius: number;
    shadows: string[];
  };
  animations: {
    duration: number;
    easing: string;
    flicker: boolean;
    float: boolean;
  };
  effects: {
    fogOpacity: number;
    glowIntensity: number;
    shadowMovement: boolean;
    ghostShapes: boolean;
    parchmentTexture: boolean;
  };
}

export interface HauntingEffects {
  fogAnimation: {
    opacity: number;
    movement: 'drift' | 'swirl' | 'fade';
    speed: number;
  };
  flickerEffect: {
    intensity: number;
    frequency: number;
  };
  ghostShapes: {
    count: number;
    opacity: number;
    movement: 'float' | 'drift' | 'fade';
  };
  shadowBehavior: {
    movement: boolean;
    intensity: number;
    color: string;
  };
  documentCurse: {
    parchmentTexture: boolean;
    glowIntensity: number;
    edgeDistortion: number;
  };
}