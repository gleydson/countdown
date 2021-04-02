import { ms } from 'react-native-size-matters';

const factor = 0.3;

const fontSize = {
  xs: ms(10, factor),
  sm: ms(12, factor),
  md: ms(14, factor),
  lg: ms(16, factor),
  xl: ms(18, factor),
  '2xl': ms(20, factor),
  '3xl': ms(22, factor),
  '4xl': ms(24, factor),
  '5xl': ms(28, factor),
  '6xl': ms(32, factor),
};

const spacing = {
  none: 0,
  xs: ms(4, factor),
  sm: ms(6, factor),
  md: ms(8, factor),
  xm: ms(16, factor),
  lg: ms(20, factor),
  xl: ms(24, factor),
  '2xl': ms(32, factor),
  '3xl': ms(64, factor),
  '-xs': ms(-4, factor),
  '-sm': ms(-6, factor),
  '-md': ms(-8, factor),
  '-lg': ms(-12, factor),
  '-xl': ms(-24, factor),
  '-2xl': ms(-32, factor),
  '-3xl': ms(-64, factor),
};

const borderRadius = {
  none: 0,
  xs: ms(2),
  sm: ms(4),
  md: ms(6),
  lg: ms(8),
  xl: ms(12),
  '2xl': ms(16),
  circle: ms(10000),
};

const grayColors = {
  gray100: '#f7fafc',
  gray200: '#edf2f7',
  gray300: '#e2e8f0',
  gray400: '#cbd5e0',
  gray500: '#a0aec0',
  gray600: '#718096',
  gray700: '#4a5568',
  gray800: '#2d3748',
  gray900: '#1a202c',
};

export const themes = {
  light: {
    colors: {
      primary: '#F4EDDB',
      secondary: '#E7626C',
      tertiary: '#232B55',

      white: '#FFF',
      black: '#000',
      transparent: 'rgba(0, 0, 0, 0)',

      ...grayColors,
    },

    fontSize,

    spacing,

    borderRadius,

    factor,
  },

  dark: {
    colors: {
      primary: '#F4EDDB',
      secondary: '#E7626C',
      tertiary: '#232B55',

      white: '#FFF',
      black: '#000',
      transparent: 'rgba(0, 0, 0, 0)',

      ...grayColors,
    },

    fontSize,

    spacing,

    borderRadius,

    factor,
  },
};

export type ThemeName = keyof typeof themes;
export type ThemeType = typeof themes.light;
