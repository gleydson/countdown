import 'styled-components';

import { ThemeType } from '@configs/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
