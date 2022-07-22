import { useRecoilState } from 'recoil';
import { PopConfirmProps } from '../component/element';
import { commonPopConfirmState } from '../recoil/store';

export const useCommonConfirm = () => {
  const [confirmState, setConfirmState] = useRecoilState(commonPopConfirmState);

  const openSuccessConfirm = ({ title, content, button }: Partial<PopConfirmProps>) => {
    setConfirmState({
      visible: true,
      iconType: 'success',
      title: title || '성공했습니다.',
      content: content,
      button: {
        text: button?.text || '확인',
        onClick: () => {
          button?.onClick();
          setConfirmState({ ...confirmState, visible: false });
        },
      },
    });
  };

  const openErrorConfirm = ({ title, content, button }: Partial<PopConfirmProps>) => {
    setConfirmState({
      visible: true,
      iconType: 'warning',
      title: title || '실패했습니다.',
      content: content || '다시 시도해주세요',
      button: {
        text: button?.text || '확인',
        onClick: () => {
          button?.onClick();
          setConfirmState({ ...confirmState, visible: false });
        },
      },
    });
  };

  return { openSuccessConfirm, openErrorConfirm };
};
