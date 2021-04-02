import { useContext } from 'react';

import { ThemeContext } from 'styled-components';

import { themes } from '@configs/themes';

export default function useTheme() {
  const theme = useContext(ThemeContext);
  return theme || themes.light;
}
