import { PropsWithChildren, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

// TODO : Modal 중복많아서 하나도 빼보기
const Slide = keyframes`
    0% {
        transform: translateY(20%);
    }

    100% {
        transform: translateY(0);
    }
`;

const Container = styled.div`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
  z-index: 4;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  background-color: black;
  opacity: 0.65;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const PopupWrapper = styled.div<{ visible: boolean }>`
  width: 17.85rem;
  border-radius: ${({ theme }) => theme.radius};
  height: 11rem;
  background-color: white;
  z-index: 5;
  animation: ${Slide} 0.6s ease;

  & > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(100% - 3.125rem);
    border-bottom: 1px solid ${({ theme }) => theme.color.grayMedium};
  }

  & > div:nth-of-type(2) {
    height: 3.125rem;
    display: flex;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      cursor: pointer;
      font-weight: 400;
    }

    & > span {
      border-left: 1px solid ${({ theme }) => theme.color.grayMedium};
    }
  }
`;

const Icon = styled.span`
  font-size: 2rem;
  margin: 0.75rem;
`;

const Message = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

interface PopConfirmProps {
  icon?: ReactNode;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
export const PopConfirm = ({ icon, visible, onConfirm, onCancel, children }: PropsWithChildren<PopConfirmProps>) => {
  if (!visible) {
    return <></>;
  }
  return (
    <Container>
      <Background />
      <PopupWrapper visible={visible}>
        <div>
          {icon && <Icon>{icon}</Icon>}
          <Message>{children}</Message>
        </div>
        <div>
          <span onClick={onConfirm}>네</span>
          <span onClick={onCancel}>아니요</span>
        </div>
      </PopupWrapper>
    </Container>
  );
};
