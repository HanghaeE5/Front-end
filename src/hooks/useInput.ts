import { useState } from 'react';
export const useInput = (initialValue?: string) => {
  const [value, setValue] = useState(initialValue || '');

  const onChangeValue = (inputValue: string) => setValue(inputValue);

  return { value, onChangeValue };
};
