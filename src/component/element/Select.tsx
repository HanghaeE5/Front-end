import styled from 'styled-components';

export type SelectOption = {
  label: string;
  value: string;
};

interface SelectStyle {
  type?: 'primary' | 'default';
}

const StyledSelect = styled.select<SelectStyle>`
  height: 3rem;
  width: 100%;
  border: 1px solid black;
  padding: ${({ theme }) => theme.inputPadding};
  border-radius: ${({ theme }) => theme.radius};

  background-color: ${({ type, theme }) => (type === 'primary' ? theme.color.grayLight : 'white')};
  border: ${({ type }) => (type === 'primary' ? 'none ' : '')};

  li {
    padding: 1rem;
  }
`;

interface SelectProps {
  value: string;
  optionList: SelectOption[];
  onChange: (value: string) => void;
}

export const Select = ({ value, optionList, onChange, type = 'primary', ...style }: SelectProps & SelectStyle) => {
  return (
    <StyledSelect
      type={type}
      {...style}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map(({ value, label }) => (
        <option className="option" key={value} value={value}>
          {label}
        </option>
      ))}
    </StyledSelect>
  );
};
