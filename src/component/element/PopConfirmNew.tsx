import { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as WarningIcon } from '../../asset/icons/icon_warning.svg';
import { ReactComponent as Chat } from '../../asset/icons/icon_chat.svg';
import { ReactComponent as WithTodo } from '../../asset/icons/icon_withtodo.svg';

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

const PopupWrapper = styled.div`
  width: 17.85rem;
  border-radius: 12px;
  // height: 11rem;
  background-color: white;
  z-index: 5;
  animation: ${Slide} 0.6s ease;

  & > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid ${({ theme }) => theme.color.grayMedium};
    padding: 1.25rem;

    & > svg {
      margin: 0.5rem;
    }
  }

  & > div:nth-of-type(2) {
    height: 3.125rem;
    display: flex;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
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
  margin: 0.5rem;
`;

const Title = styled.span`
  font-size: 1.063rem;
  font-weight: 700;
  white-space: pre-line;
  text-align: center;
  line-height: 23px;
`;

const Content = styled.span`
  color: ${({ theme }) => theme.color.grayDark};
  margin: 0.25rem;
  font-size: 0.75rem;
  line-height: 1.05rem;
`;

type ConfirmType = 'warning' | 'chat' | 'withTodo';

const confirmIcon: { [key in ConfirmType]: ReactNode } = {
  warning: <WarningIcon />,
  chat: <Chat />,
  withTodo: <WithTodo />,
};

interface PopConfirmProps {
  confirmType?: ConfirmType;
  title: string;
  content?: string;
  rightButton: { text: string; onClick: () => void };
  leftButton?: { text: string; onClick: () => void };
}
export const PopConfirmNew = ({ confirmType, title, content, rightButton, leftButton }: PopConfirmProps) => {
  return (
    <Container>
      <Background />
      <PopupWrapper>
        <div>
          {confirmType && <Icon>{confirmIcon[confirmType]}</Icon>}
          <Title>{title}</Title>
          {content && <Content>{content}</Content>}
        </div>
        <div>
          <span onClick={rightButton.onClick}>{rightButton.text}</span>
          {leftButton && <span onClick={leftButton.onClick}>{leftButton.text}</span>}
        </div>
      </PopupWrapper>
    </Container>
  );
};
