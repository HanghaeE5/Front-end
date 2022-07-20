import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const SteyledTypo = styled.span<TypographyProps>`
  font-size: ${({ size }) => `${size}rem`};
  color: ${({ color }) => color};
  font-weight: ${({ weight }) => weight};
  cursor: ${({ isPointer }) => (isPointer ? 'pointer' : '')};
  text-decoration: ${({ underline }) => underline && 'underline'};
  font-family: ${({ isBold }) => (isBold ? 'NotoBold' : 'NotoLight')};
  white-space: pre-line;
  text-align: ${({ align }) => align || 'left'};
  line-height: ${({ lineHeight }) => `${lineHeight}rem`}; ;
`;

interface TypographyProps {
  size?: number;
  color?: string;
  weight?: number;
  onClick?: () => void;
  isPointer?: boolean;
  underline?: boolean;
  isBold?: boolean;
  align?: 'left' | 'center' | 'right';
  lineHeight?: number;
}

export const Typography = ({ onClick, children, ...style }: PropsWithChildren<TypographyProps>) => {
  return (
    <SteyledTypo onClick={onClick} {...style}>
      {children}
    </SteyledTypo>
  );
};
