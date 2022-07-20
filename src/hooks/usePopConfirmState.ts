import { useState } from 'react';
import { PopConfirmProps } from '../component/element';

interface usePopConfirmStateProps extends PopConfirmProps {
  visible: boolean;
}

export const usePopConfirmState = (initalState: usePopConfirmStateProps) => {
  const [confirmState, setConfirmState] = useState<PopConfirmProps>(initalState);

  return { confirmState, setConfirmState };
};
