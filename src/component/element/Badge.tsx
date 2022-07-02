import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledBadge = styled.div`
  display: flex;
  align-items: center;
  height: 1.75rem;
  font-size: 14px;
  font-weight: 500;
  border-radius: 50px 50px;
  border: 1px solid black;
  padding: 0.25rem 0.75rem;
  text-align: center;
  font-size: 0.875rem;
`;

export const Badge = ({ children }: PropsWithChildren) => {
  return <StyledBadge>{children}</StyledBadge>;
};
