import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';
import { Wrapper } from './Wrapper';

const TextElement = styled.input<StyleProps>`
  height: ${({ inputSize }) => (inputSize === 'small' ? '3rem' : '3.73rem')};
  border-radius: ${(props) => props.theme.radius};
  background-color: ${({ theme, inputType }) => (inputType === 'default' ? 'white' : theme.color.grayLight)};
  border: ${({ theme, inputType }) => (inputType === 'primary' ? `none` : `1px solid ${theme.color.grayMedium}`)};
  padding: ${(props) => props.theme.inputPadding};
  font-size: ${({ inputSize }) => (inputSize === 'small' ? '0.938rem' : '1.063rem')};
  ::placeholder {
    color: ${(props) => props.theme.color.grayMediumDark};
    font-size: ${({ inputSize }) => (inputSize === 'small' ? '0.938rem' : '1.063rem')};
  }

  :focus {
    background-color: #fffbe9;
  }
  width: 100%;
  border: ${({ isValidError }) => isValidError && `1px solid red`};
  text-align: ${({ align }) => align || 'left'};
`;

const SearchButton = styled(BiSearch)`
  position: absolute;
  right: 0.75rem;
  font-size: 1.25rem;
  cursor: pointer;
`;

const TextAreaElement = styled.textarea<{ isValidError?: boolean }>`
  height: 11.25rem;
  font-family: 'Noto Sans KR', sans-serif;
  border-radius: ${(props) => props.theme.radius};
  background-color: white;
  border: 1px solid ${({ theme }) => theme.color.grayMedium};
  padding: ${(props) => props.theme.inputPadding};
  ::placeholder {
    color: ${(props) => props.theme.color.grayMediumDark};
    font-size: 0.875rem;
    font-weight: 400;
  }

  :focus {
    background-color: #fffbe9;
  }
  width: 100%;
  font-weight: 400;
  resize: none;
  border: ${({ isValidError }) => isValidError && `1px solid red`};
`;

interface StyleProps {
  inputSize?: 'small' | 'large';
  inputType?: 'default' | 'primary';
  isValidError?: boolean;
  align?: 'left' | 'right' | 'center';
}

interface TextInputProps {
  type?: 'text' | 'area';
  onChange: (value: string) => void;
  onSearch?: () => void;
  onEnter?: () => void;
  placeholder?: string;
  value: string;
  align?: string;
}

export const TextInput = ({
  type = 'text',
  inputSize = 'large',
  inputType = 'default',
  placeholder,
  value,
  onChange,
  onSearch,
  isValidError = false,
  align,
}: TextInputProps & StyleProps) => {
  const onKeyDown = (key: string) => {
    if (key !== 'Enter' || !onSearch) return;

    onSearch();
  };

  if (type === 'text') {
    return (
      <Wrapper position="relative">
        <TextElement
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onKeyDown={(e) => onKeyDown(e.key)}
          isValidError={isValidError}
          inputSize={inputSize}
          inputType={inputType}
          align={align}
        />
        {!!onSearch && <SearchButton onClick={() => onSearch()} />}
      </Wrapper>
    );
  }

  return (
    <TextAreaElement
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      isValidError={isValidError}
    />
  );
};
