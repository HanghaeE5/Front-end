import { PropsWithChildren, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as WarningIcon } from '../../asset/icons/icon_warning.svg';
import { ReactComponent as Chat } from '../../asset/icons/icon_chat.svg';
import { ReactComponent as WithTodo } from '../../asset/icons/icon_withtodo.svg';
import { ReactComponent as Success } from '../../asset/icons/icon_success.svg';
import { useRecoilState } from 'recoil';
import { popNotiState } from '../../recoil/store';
import { useNavigate } from 'react-router';

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
  margin: 0.75rem;
`;

const Message = styled.span`
  padding: 0 10px 10px 10px;
  font-size: 1rem;
  font-weight: 700;
  line-height: 23px;
`;

type ConfirmType = 'warning' | 'chat' | 'withTodo' | 'success';

const confirmIcon: { [key in ConfirmType]: ReactNode } = {
  warning: <WarningIcon />,
  chat: <Chat />,
  withTodo: <WithTodo />,
  success: <Success />,
};

interface PopConfirmProps {
  confirmType?: ConfirmType | undefined;
  icon?: ReactNode;
  visible?: boolean;
  oneButton: { text: string; onClick: () => void; nav: string };
  msg: string | undefined;
  quitOk?: boolean;
  nav?: void | null;
}

export const PopNoti = ({ quitOk, confirmType, visible, oneButton, msg, nav }: PopConfirmProps) => {
  const [popNoti, setPopNoti] = useRecoilState(popNotiState);
  const navi = useNavigate();
  if (!visible) {
    return <></>;
  }
  return (
    <Container onClick={() => setPopNoti(false)}>
      <Background />
      <PopupWrapper visible={visible}>
        <div>
          {confirmType && <Icon>{confirmIcon[confirmType]}</Icon>}

          <Message>{msg}</Message>
        </div>
        <div>
          <span
            onClick={
              !quitOk
                ? () => {
                    oneButton.onClick;
                  }
                : () => {
                    oneButton.onClick;
                    navi(oneButton.nav);
                  }
            }
          >
            {oneButton.text}
          </span>
        </div>
      </PopupWrapper>
    </Container>
  );
};
