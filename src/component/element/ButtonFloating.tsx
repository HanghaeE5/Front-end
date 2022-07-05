import styled from 'styled-components';
import { BsFillPlusCircleFill } from 'react-icons/bs';

const FloatingButton = styled(BsFillPlusCircleFill)`
  width: 2.813rem;
  height: 2.813rem;
  border-radius: 50%;
  background-color: white;
  color: ${({ theme }) => theme.color.grayDark};
  position: fixed;
  bottom: 4.5rem;
  right: 1rem;
  box-sizing: border-box;
  cursor: pointer;
`;

interface ButtonFloatingProps {
  onClick?: () => void;
}

export const ButtonFloating = ({ onClick }: ButtonFloatingProps) => {
  return <FloatingButton onClick={onClick && onClick}> + </FloatingButton>;
};
