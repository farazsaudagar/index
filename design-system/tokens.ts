/**
 * Design Tokens
 * Centralized design values for theming and consistency
 */

// Color Tokens
export const colors = {
  // Base colors
  baseLight: '#F5EFE7',
  neutralSand: '#D8C4B6',
  white: '#FFFFFF',
  
  // Accent colors
  accentBlue: '#3E5879',
  accentDeep: '#213555',
  
  // Surface colors
  shelfColor: '#ebe1d6',
  shelfPlank: '#EBDDCB',
  woodTone: '#AB9076',
  
  // Gradient colors
  gradientTop: '#F6EFE8',
  gradientBottom: '#EDE3D9',
} as const;

// Spacing Tokens
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
} as const;

// Size Tokens
export const sizes = {
  // Book dimensions
  bookWidth: 85, // px
  bookHeight: 134, // px
  bookWidthLarge: 130, // px
  bookHeightLarge: 195, // px
  
  // Button dimensions
  buttonSmall: 32, // px
  buttonMedium: 40, // px
  buttonLarge: 48, // px
  
  // Avatar dimensions
  avatarSmall: 24, // px
  avatarMedium: 32, // px
  avatarLarge: 48, // px
} as const;

// Border Radius Tokens
export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const;

// Shadow Tokens
export const shadows = {
  // Wall cast shadow (behind shelf)
  wallCast: {
    color: 'var(--accent-deep)',
    opacity: 0.1,
    blur: '12px',
  },
  
  // Shelf plank shadow
  shelfPlank: {
    color: 'var(--accent-deep)',
    opacity: 0.1,
    blur: '24px',
    offset: '0 10px',
  },
  
  // Book shadow
  book: {
    color: 'var(--accent-deep)',
    opacity: 0.18,
    blur: '6px',
    offset: '0 3px',
  },
  
  bookHover: {
    color: 'var(--accent-deep)',
    opacity: 0.24,
    blur: '12px',
    offset: '0 8px',
  },
  
  // Button shadow
  button: {
    color: 'var(--accent-deep)',
    opacity: 0.1,
    blur: '8px',
    offset: '0 2px',
  },
  
  // Inner shadow (for book deck)
  innerDeck: {
    top: {
      color: 'var(--accent-deep)',
      opacity: 0.12,
      blur: '8px',
      offset: 'inset 0 2px',
    },
    bottom: {
      color: 'var(--accent-deep)',
      opacity: 0.08,
      blur: '6px',
      offset: 'inset 0 -2px',
    },
    sides: {
      color: 'var(--accent-deep)',
      opacity: 0.10,
      blur: '8px',
      offset: 'inset 4px 0',
    },
  },
} as const;

// Typography Tokens
export const typography = {
  fontFamily: {
    primary: 'var(--font-dm-serif)',
    secondary: 'var(--font-playfair)',
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// Transition Tokens
export const transitions = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  easing: {
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    easeInOut: 'ease-in-out',
  },
} as const;

// Utility Functions
export const colorMix = (color: string, opacity: number) => {
  return `color-mix(in srgb, ${color} ${opacity}%, transparent)`;
};

export const shadowString = (
  color: string,
  opacity: number,
  blur: string,
  offset?: string
) => {
  const offsetStr = offset || '0 0';
  return `${offsetStr} ${blur} ${colorMix(color, opacity * 100)}`;
};

export const innerShadowString = (
  color: string,
  opacity: number,
  blur: string,
  offset: string
) => {
  return `inset ${offset} ${blur} ${colorMix(color, opacity * 100)}`;
};

