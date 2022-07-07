import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mainColor: string;
    color: {
      grayLight: string;
      grayMediumLight: string;
      grayMedium: string;
      grayDark: string;
      grayText: string;
      grayMediumDark: string;
    };
    radius: string;
    inputPadding: string;
  }
}
