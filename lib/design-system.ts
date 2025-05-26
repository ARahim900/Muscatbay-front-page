// Muscat Bay Design System - Color Palette & Theme Configuration
// This file defines the consistent color scheme to be used across the entire application

export const muscatBayColors = {
  // Primary Brand Colors
  primary: {
    50: '#F7F6F8',
    100: '#EFECF0', 
    200: '#DDD8E1',
    300: '#C4BAC7',
    400: '#A59AA8',
    500: '#4E4456',  // Main brand color
    600: '#443C49',
    700: '#3A333E',
    800: '#302B33',
    900: '#1F1C22',
  },
  
  // Secondary Palette
  secondary: {
    50: '#F8F9FA',
    100: '#F1F2F4',
    200: '#E3E5E8',
    300: '#CDD1D6',
    400: '#B0B6BD',
    500: '#6C6A81',  // Secondary brand color
    600: '#5E5C71',
    700: '#4F4D5F',
    800: '#41404E',
    900: '#2A2935',
  },
  
  // Accent Colors - Cool Tones
  accent: {
    50: '#F0F9FA',
    100: '#E1F3F5',
    200: '#C3E7EB',
    300: '#9DD5DC',
    400: '#70C1CB',
    500: '#8DB2BB',  // Cool blue-green
    600: '#7A9FA8',
    700: '#678B94',
    800: '#547781',
    900: '#3F5A62',
  },
  
  // Light Accent - Mint/Sage
  light: {
    50: '#F7FCFC',
    100: '#EFF9F9',
    200: '#DFF3F3',
    300: '#C7EAEA',
    400: '#A9DDDE',
    500: '#A4D2D5',  // Light mint
    600: '#8FC5C8',
    700: '#7AB6BA',
    800: '#65A6AB',
    900: '#4C8B91',
  },
  
  // Neutral Purple-Gray
  neutral: {
    50: '#FAFAFA',
    100: '#F5F4F6',
    200: '#EBEAEC',
    300: '#DDD9DC',
    400: '#CCC7CB',
    500: '#BAB4BD',  // Neutral purple-gray
    600: '#A69FA9',
    700: '#928B95',
    800: '#7E7781',
    900: '#5D5861',
  },
  
  // Supporting Gray-Blue
  support: {
    50: '#F9F9FA',
    100: '#F3F3F5',
    200: '#E7E7EA',
    300: '#D6D6DA',
    400: '#C1C1C7',
    500: '#9597A4',  // Supporting gray-blue
    600: '#85878F',
    700: '#75777B',
    800: '#656767',
    900: '#4A4C4E',
  },
  
  // Functional Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  }
}

// Chart Color Palette using the brand colors
export const chartColors = [
  muscatBayColors.primary[500],   // #4E4456
  muscatBayColors.secondary[500], // #6C6A81
  muscatBayColors.accent[500],    // #8DB2BB
  muscatBayColors.light[500],     // #A4D2D5
  muscatBayColors.neutral[500],   // #BAB4BD
  muscatBayColors.support[500],   // #9597A4
  muscatBayColors.info[500],      // Blue
  muscatBayColors.success[500],   // Green
  muscatBayColors.warning[500],   // Orange
  muscatBayColors.error[500],     // Red
]

// Gradient combinations for modern design
export const gradients = {
  primary: `linear-gradient(135deg, ${muscatBayColors.primary[500]} 0%, ${muscatBayColors.secondary[500]} 100%)`,
  secondary: `linear-gradient(135deg, ${muscatBayColors.secondary[500]} 0%, ${muscatBayColors.accent[500]} 100%)`,
  accent: `linear-gradient(135deg, ${muscatBayColors.accent[500]} 0%, ${muscatBayColors.light[500]} 100%)`,
  neutral: `linear-gradient(135deg, ${muscatBayColors.neutral[500]} 0%, ${muscatBayColors.support[500]} 100%)`,
  success: `linear-gradient(135deg, ${muscatBayColors.success[500]} 0%, ${muscatBayColors.success[600]} 100%)`,
  warning: `linear-gradient(135deg, ${muscatBayColors.warning[500]} 0%, ${muscatBayColors.warning[600]} 100%)`,
  error: `linear-gradient(135deg, ${muscatBayColors.error[500]} 0%, ${muscatBayColors.error[600]} 100%)`,
  info: `linear-gradient(135deg, ${muscatBayColors.info[500]} 0%, ${muscatBayColors.info[600]} 100%)`,
  
  // Special brand gradients
  hero: `linear-gradient(135deg, ${muscatBayColors.primary[500]} 0%, ${muscatBayColors.accent[500]} 50%, ${muscatBayColors.light[500]} 100%)`,
  card: `linear-gradient(135deg, ${muscatBayColors.primary[50]} 0%, ${muscatBayColors.accent[50]} 100%)`,
  background: `linear-gradient(135deg, ${muscatBayColors.primary[25]} 0%, ${muscatBayColors.light[25]} 50%, ${muscatBayColors.accent[25]} 100%)`,
}

// Semantic color mapping for consistent usage
export const semanticColors = {
  // Background colors
  background: {
    primary: muscatBayColors.primary[50],
    secondary: muscatBayColors.accent[50],
    muted: muscatBayColors.neutral[50],
  },
  
  // Text colors
  text: {
    primary: muscatBayColors.primary[500],
    secondary: muscatBayColors.secondary[500],
    muted: muscatBayColors.neutral[400],
    inverse: '#FFFFFF',
  },
  
  // Border colors
  border: {
    primary: muscatBayColors.primary[200],
    secondary: muscatBayColors.accent[200],
    muted: muscatBayColors.neutral[200],
  },
  
  // Interactive states
  interactive: {
    primary: muscatBayColors.primary[500],
    primaryHover: muscatBayColors.primary[600],
    secondary: muscatBayColors.accent[500],
    secondaryHover: muscatBayColors.accent[600],
    disabled: muscatBayColors.neutral[300],
  }
}

// CSS Custom Properties for Tailwind integration
export const cssVariables = `
  :root {
    /* Primary Brand Colors */
    --color-primary-50: ${muscatBayColors.primary[50]};
    --color-primary-100: ${muscatBayColors.primary[100]};
    --color-primary-500: ${muscatBayColors.primary[500]};
    --color-primary-600: ${muscatBayColors.primary[600]};
    --color-primary-900: ${muscatBayColors.primary[900]};
    
    /* Secondary Colors */
    --color-secondary-50: ${muscatBayColors.secondary[50]};
    --color-secondary-500: ${muscatBayColors.secondary[500]};
    --color-secondary-600: ${muscatBayColors.secondary[600]};
    
    /* Accent Colors */
    --color-accent-50: ${muscatBayColors.accent[50]};
    --color-accent-500: ${muscatBayColors.accent[500]};
    --color-accent-600: ${muscatBayColors.accent[600]};
    
    /* Light Colors */
    --color-light-50: ${muscatBayColors.light[50]};
    --color-light-500: ${muscatBayColors.light[500]};
    --color-light-600: ${muscatBayColors.light[600]};
    
    /* Neutral Colors */
    --color-neutral-50: ${muscatBayColors.neutral[50]};
    --color-neutral-500: ${muscatBayColors.neutral[500]};
    --color-neutral-600: ${muscatBayColors.neutral[600]};
    
    /* Support Colors */
    --color-support-50: ${muscatBayColors.support[50]};
    --color-support-500: ${muscatBayColors.support[500]};
    --color-support-600: ${muscatBayColors.support[600]};
  }
`

// Component styling presets
export const componentStyles = {
  card: {
    background: 'bg-white dark:bg-gray-800',
    border: `border border-[${muscatBayColors.primary[200]}]`,
    shadow: 'shadow-lg hover:shadow-xl',
    rounded: 'rounded-xl',
  },
  
  button: {
    primary: `bg-gradient-to-r from-[${muscatBayColors.primary[500]}] to-[${muscatBayColors.secondary[500]}] hover:from-[${muscatBayColors.primary[600]}] hover:to-[${muscatBayColors.secondary[600]}] text-white`,
    secondary: `bg-gradient-to-r from-[${muscatBayColors.accent[500]}] to-[${muscatBayColors.light[500]}] hover:from-[${muscatBayColors.accent[600]}] hover:to-[${muscatBayColors.light[600]}] text-white`,
    outline: `border-2 border-[${muscatBayColors.primary[500]}] text-[${muscatBayColors.primary[500]}] hover:bg-[${muscatBayColors.primary[500]}] hover:text-white`,
  },
  
  header: {
    background: `bg-gradient-to-r from-[${muscatBayColors.primary[500]}] via-[${muscatBayColors.secondary[500]}] to-[${muscatBayColors.accent[500]}]`,
    text: 'text-white',
  }
}

export default muscatBayColors
