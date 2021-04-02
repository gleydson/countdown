import React from 'react';
import { useColorScheme, StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components/native';

import { themes } from '@configs/themes';
import Home from '@screens/Home';

const App = () => {
  const theme = useColorScheme() || 'light';

  const currentTheme = themes[theme];

  return (
    <ThemeProvider theme={currentTheme}>
      <StatusBar
        backgroundColor={currentTheme.colors.primary}
        barStyle="dark-content"
      />
      <Home />
    </ThemeProvider>
  );
};

export default App;
