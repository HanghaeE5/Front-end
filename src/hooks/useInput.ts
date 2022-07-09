import { useState } from 'react';
export const useInput = () => {
  const [value, setValue] = useState('');

  const onChangeValue = (inputValue: string) => setValue(inputValue);

  return { value, onChangeValue };
};
