import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mainColor: string;
    color: {
      grayLight: string;
      grayMedium: string;
      grayDark: string;
      grayText: string;
    };
    radius: string;
    inputPadding: string;
  }
}
