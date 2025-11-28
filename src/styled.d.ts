import 'styled-components';
import { ThemeState } from './theme/types';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeState {}
}