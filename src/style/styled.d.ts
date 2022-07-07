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
    button: {
      color: {
        primary: string;
        default: string;
        disable: string;
        dashed: string;
        ghost: string;
      };
      borderColor: {
        primary: string;
        default: string;
        disable: string;
        dashed: string;
        ghost: string;
      };
      backgroundColor: {
        primary: string;
        default: string;
        disable: string;
        dashed: string;
        ghost: string;
      };
    };
  }
}
