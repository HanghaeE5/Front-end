import { PropsWithChildren } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import styled from 'styled-components';

const WarningTextWrapper = styled.div`
  color: ${({ theme }) => theme.color.grayDark};
  width: 100%;
  font-weight: 400;
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  font-size: 0.75rem;

  & > svg {
    margin-right: 5px;
  }
`;

export const WarningText = ({ children }: PropsWithChildren) => {
  return (
    <WarningTextWrapper>
      <BiErrorCircle />
      {children}
    </WarningTextWrapper>
  );
};
