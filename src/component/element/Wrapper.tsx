import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Div = styled.div<WrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.isColumn ? 'column' : 'row')};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || ''};
  max-height: ${({ maxHeight }) => maxHeight};
  min-height: ${({ minHeight }) => minHeight};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => (padding ? padding : 0)};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : '')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  box-sizing: border-box;
  border: ${({ border }) => border};
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: ${({ isPointer }) => isPointer && 'pointer'};
  position: ${({ position }) => position};
`;

interface WrapperProps {
  isColumn?: boolean;
  width?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  margin?: string;
  padding?: string;
  justifyContent?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'end';
  alignItems?: 'stretch' | 'center' | 'start' | 'end';
  border?: string;
  onClick?: () => void;
  backgroundColor?: string;
  isPointer?: boolean;
  position?: 'relative' | 'absolute' | 'fixed' | 'static';
}

export const Wrapper = ({ children, onClick, ...style }: PropsWithChildren<WrapperProps>) => {
  return (
    <Div {...style} onClick={onClick}>
      {children}
    </Div>
  );
};
