import styled from 'styled-components';
import { HiPlus } from 'react-icons/hi';

const FloatingButton = styled(HiPlus)`
  width: 2.813rem;
  height: 2.813rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.mainColor};
  color: black;
  position: fixed;
  bottom: 4.5rem;
  right: 1rem;
  box-sizing: border-box;
  padding: 0.35rem;

  cursor: pointer;
`;

interface ButtonFloatingProps {
  onClick?: () => void;
}

export const ButtonFloating = ({ onClick }: ButtonFloatingProps) => {
  return <FloatingButton onClick={onClick && onClick}> + </FloatingButton>;
};
