import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Div = styled.div<WrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.isColumn ? 'column' : 'row')};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || ''};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => (padding ? padding : 0)};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : '')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  box-sizing: border-box;
  border: ${({ border }) => border};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

interface WrapperProps {
  isColumn?: boolean;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  justifyContent?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'end';
  alignItems?: 'stretch' | 'center' | 'start' | 'end';
  border?: string;
  onClick?: () => void;
  backgroundColor?: string;
}

export const Wrapper = ({ children, onClick, ...style }: PropsWithChildren<WrapperProps>) => {
  return (
    <Div {...style} onClick={onClick}>
      {children}
    </Div>
  );
};
