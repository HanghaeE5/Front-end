import { ReactNode } from 'react';
import styled from 'styled-components';
import { ReactComponent as WarningIcon } from '../../asset/icons/icon_warning.svg';
import { ReactComponent as Chat } from '../../asset/icons/icon_chat.svg';
import { ReactComponent as WithTodo } from '../../asset/icons/icon_withtodo.svg';
import { ReactComponent as Success } from '../../asset/icons/icon_success.svg';
import { SliderPopUp } from './SliderPopUp';
import { useRecoilState } from 'recoil';
import { commonPopConfirmState } from '../../recoil/store';

const PopupWrapper = styled.div`
  width: 17.85rem;
  border-radius: 12px;
  background-color: white;
  z-index: 10;
  overflow: hidden;
  /* position: absolute; */

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

type ConfirmIconType = 'warning' | 'chat' | 'withTodo' | 'success';

const confirmIcon: { [key in ConfirmIconType]: ReactNode } = {
  warning: <WarningIcon />,
  success: <Success />,
  chat: <Chat />,
  withTodo: <WithTodo />,
};

export interface PopConfirmProps {
  iconType?: ConfirmIconType;
  title: string;
  content?: string;
  button: { text: string; onClick: () => void };
  optionalButton?: { text: string; onClick: () => void };
}
export const PopConfirmNew = ({ iconType, title, content, button, optionalButton }: PopConfirmProps) => {
  const [confirmState, setConfirmState] = useRecoilState(commonPopConfirmState);
  return (
    <SliderPopUp onClickBackground={!optionalButton ? () => button.onClick() : undefined}>
      <PopupWrapper>
        <div>
          {iconType && <Icon>{confirmIcon[iconType]}</Icon>}
          <Title>{title}</Title>
          {content && <Content>{content}</Content>}
        </div>
        <div>
          <span onClick={button.onClick}>{button.text}</span>
          {optionalButton && <span onClick={optionalButton.onClick}>{optionalButton.text}</span>}
        </div>
      </PopupWrapper>
    </SliderPopUp>
  );
};
