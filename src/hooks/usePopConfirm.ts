import { useState } from 'react';
export const usePopConfirm = () => {
  const [visible, setVisible] = useState(false);

  const openConfirm = () => {
    setVisible(true);
  };

  const closeConfirm = () => {
    setVisible(false);
  };

  return {
    visible,
    openConfirm,
    closeConfirm,
  };
};
