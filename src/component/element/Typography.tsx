import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const SteyledTypo = styled.span<TypographyProps>`
  font-size: ${({ size }) => `${size}rem`};
  color: ${({ color }) => color};
  font-weight: ${({ weight }) => weight};
`;

interface TypographyProps {
  size?: number;
  color?: string;
  weight?: number;
}

export const Typography = ({ children, ...style }: PropsWithChildren<TypographyProps>) => {
  return <SteyledTypo {...style}>{children}</SteyledTypo>;
};
