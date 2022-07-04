import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { BottomNavLayout } from './BottomNavBar';
import { TopNavBar } from './TopNavBar';

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 768px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const BodyWrapper = styled.div`
  height: calc(100% - 7rem);
  overflow: hidden;
  top: 3.5rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;

export const NavLayout = ({ children }: PropsWithChildren) => {
  return (
    <LayoutContainer>
      <TopNavBar />
      <BodyWrapper>{children}</BodyWrapper>
      <BottomNavLayout />
    </LayoutContainer>
  );
};
