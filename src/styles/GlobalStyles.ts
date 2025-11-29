import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing};
    line-height: 1.6;
    min-height: 100vh;
    transition: background-color 0.8s ease, color 0.8s ease;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    text-shadow: ${({ theme }) => theme.typography.textShadow};
    transition: text-shadow 0.8s ease;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }

  /* Scrollbar styling for haunted theme */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Focus styles for keyboard navigation */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  /* Skip to main content link */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
    padding: 8px 16px;
    z-index: 1000;
    text-decoration: none;
    font-weight: 600;
    
    &:focus {
      top: 0;
    }
  }

  /* Screen reader only content */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    * {
      border-color: currentColor !important;
    }
    
    button, a {
      text-decoration: underline;
    }
  }

  /* Ensure minimum touch target size */
  button, a, input, select, textarea {
    min-height: 44px;
    min-width: 44px;
  }

  /* Better text selection */
  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
  }
`;