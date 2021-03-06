import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  buttonType?: 'primary' | 'default' | 'disable' | 'dashed' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  isSquare?: boolean;
  onClick?: () => void;
  margin?: string;
  width?: string;
}

const StyledButton = styled.button<ButtonProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || '100%'};
  font-size: ${({ size, theme }) => theme.button.font[size || 'medium']};

  font-weight: 500;
  padding: 1rem 0;
  height: ${({ size, theme }) => theme.button.height[size || 'medium']};
  cursor: ${({ buttonType }) => buttonType && 'disable'};
  margin: ${({ margin }) => margin && margin};
  border: 1px ${({ buttonType }) => (buttonType === 'dashed' ? 'dashed' : 'solid')};

  color: ${({ buttonType, theme }) => theme.button.color[buttonType || 'primary']};
  border-color: ${({ buttonType, theme }) => theme.button.borderColor[buttonType || 'primary']};
  background-color: ${({ buttonType, theme }) => theme.button.backgroundColor[buttonType || 'primary']};

  border-radius: ${({ isSquare, theme }) => (isSquare ? '' : theme.radius)};

  cursor: pointer;
`;

export const Button = ({
  buttonType = 'primary',
  size = 'medium',
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
