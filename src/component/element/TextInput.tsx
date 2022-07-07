import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { Wrapper } from './Wrapper';

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

const TextElement = styled.input`
  height: 3rem;
  border-radius: ${(props) => props.theme.radius};
  background-color: ${(props) => props.theme.color.grayLight};
  border: none;
  padding: ${(props) => props.theme.inputPadding};
  ::placeholder {
    color: ${(props) => props.theme.color.grayMedium};
  }
  width: 100%;
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

const TextAreaElement = styled.textarea`
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
`;

export const TextInput = ({ type = 'text', placeholder, showSearch, value, onChange }: TextInputProps) => {
  if (type === 'text') {
    return (
      <Wrapper>
        <TextElement
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
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
    />
  );
};
