import styled from 'styled-components';
import { HiPlus } from 'react-icons/hi';
import { ReactComponent as TopButton } from '../../asset/icons/topButton.svg';
import { ReactComponent as plusBtn } from '../../asset/icons/plusBtn.svg';

const AddButton = styled(plusBtn)`
  width: 2.813rem;
  height: 2.813rem;
  cursor: pointer;
`;

const FloatingTopButton = styled(TopButton)`
  width: 2.813rem;
  height: 2.813rem;
  cursor: pointer;
`;

const FloatingWrapper = styled.div<{ isDobleButton?: boolean }>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  height: 7em;
  justify-content: ${({ isDobleButton }) => (isDobleButton ? 'space-between' : 'end')};
`;

interface ButtonFloatingProps {
  onClick?: () => void;
  scrollTop?: () => void;
}

export const ButtonFloating = ({ onClick, scrollTop }: ButtonFloatingProps) => {
  return (
    <FloatingWrapper isDobleButton={!!scrollTop}>
      {scrollTop && <FloatingTopButton onClick={() => scrollTop()} />}
      <AddButton onClick={onClick && onClick} />
    </FloatingWrapper>
  );
};
