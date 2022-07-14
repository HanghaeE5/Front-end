import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const SteyledTypo = styled.span<TypographyProps>`
  font-size: ${({ size }) => `${size}rem`};
  color: ${({ color }) => color};
  font-weight: ${({ weight }) => weight};
  cursor: ${({ isPointer }) => (isPointer ? 'pointer' : '')};
  text-decoration: ${({ underline }) => underline && 'underline'};
  font-family: NotoLight;
`;

interface TypographyProps {
  size?: number;
  color?: string;
  weight?: number;
  onClick?: () => void;
  isPointer?: boolean;
  underline?: boolean;
}

export const Typography = ({ onClick, children, ...style }: PropsWithChildren<TypographyProps>) => {
  return (
    <SteyledTypo onClick={onClick} {...style}>
      {children}
    </SteyledTypo>
  );
};
