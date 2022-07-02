import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Div = styled.div<WrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.isColumn ? 'column' : 'row')};
  width: ${({ width }) => (width ? width : '100%')};
`;

interface WrapperProps {
  isColumn?: boolean;
  width?: string;
}

export const Wrapper = ({ children, ...style }: PropsWithChildren<WrapperProps>) => {
  return <Div {...style}>{children}</Div>;
};
