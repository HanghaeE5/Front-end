import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  buttonType?: 'primary' | 'default' | 'disable';
  size?: 'small' | 'large';
  isSquare?: boolean;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 700;
  font-family: 'Noto Sans CJK Light KR';
  font-size: ${({ size }) => (size === 'small' ? '0.875rem' : '1rem')};
  padding: 1rem 0;
  color: ${({ buttonType, theme }) => (buttonType === 'default' ? theme.color.grayMediumDark : 'white')};
  border: 1px solid;
  border-color: ${({ buttonType, theme }) => (buttonType === 'default' ? theme.color.grayMediumDark : '')};
  border-radius: ${({ isSquare, theme }) => (isSquare ? '' : theme.radius)};
  background-color: ${({ buttonType, theme }) =>
    buttonType === 'default' ? 'white' : buttonType === 'primary' ? theme.color.grayDark : theme.color.grayMediumLight};
  height: ${({ size }) => (size === 'small' ? '3rem' : '4rem')};
  cursor: ${({ buttonType }) => buttonType && 'disable'};
`;

export const Button = ({
  buttonType = 'primary',
  size = 'small',
  children,
  onClick,
  ...style
}: PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton buttonType={buttonType} size={size} {...style} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
