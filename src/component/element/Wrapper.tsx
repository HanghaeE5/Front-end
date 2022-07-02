import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Div = styled.div<WrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.isColumn ? 'column' : 'row')};
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '')};
  margin: ${({ margin }) => (margin ? margin : 0)};
  padding: ${({ padding }) => (padding ? padding : 0)};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : '')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')}; ;
`;

interface WrapperProps {
  isColumn?: boolean;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  justifyContent?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'stretch' | 'center' | 'start' | 'end';
}

export const Wrapper = ({ children, ...style }: PropsWithChildren<WrapperProps>) => {
  return <Div {...style}>{children}</Div>;
};
