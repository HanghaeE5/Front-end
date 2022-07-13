import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';
import { Wrapper } from './Wrapper';

const TextElement = styled.input<StyleProps>`
  height: ${({ inputSize }) => (inputSize === 'small' ? '3rem' : '3.73rem')};
  border-radius: ${(props) => props.theme.radius};
  background-color: ${({ theme, inputType }) => 'white'};
  border: ${({ theme, inputType }) => (inputType === 'primary' ? `none` : `1px solid ${theme.color.grayMedium}`)};
  padding: ${(props) => props.theme.inputPadding};
  ::placeholder {
    color: ${(props) => props.theme.color.grayMedium};
    font-size: 1.063rem;
  }
  width: 100%;
  border: ${({ isValidError }) => isValidError && `1px solid red`};
`;

const SearchButton = styled(BiSearch)`
  background-color: ${(props) => props.theme.color.grayDark};
  width: 3rem;
  height: 3rem;
  color: white;
  padding: 0.75rem;
  border-radius: ${(props) => props.theme.radius};
  margin-left: 5px;
  cursor: pointer;
`;

const TextAreaElement = styled.textarea<{ isValidError?: boolean }>`
  height: 11.25rem;
  border-radius: ${(props) => props.theme.radius};
  background-color: ${(props) => props.theme.color.grayLight};
  border: none;
  padding: ${(props) => props.theme.inputPadding};
  ::placeholder {
    color: ${(props) => props.theme.color.grayMedium};
    font-size: 0.813rem;
  }
  width: 100%;
  font-family: 'NotoRegu';
  font-weight: 400;
  resize: none;
  border: ${({ isValidError }) => isValidError && `1px solid red`};
`;

interface StyleProps {
  inputSize?: 'small' | 'large';
  inputType?: 'default' | 'primary';
  isValidError?: boolean;
}

interface TextInputProps {
  type?: 'text' | 'area';
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  value: string;
  showSearch?: {
    onSearch: () => void;
  };
}

export const TextInput = ({
  type = 'text',
  inputSize = 'large',
  inputType = 'default',
  placeholder,
  showSearch,
  value,
  onChange,
  isValidError = false,
}: TextInputProps & StyleProps) => {
  if (type === 'text') {
    return (
      <Wrapper>
        <TextElement
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          isValidError={isValidError}
          inputSize={inputSize}
          inputType={inputType}
        />
        {showSearch && <SearchButton onClick={() => showSearch.onSearch()} />}
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
