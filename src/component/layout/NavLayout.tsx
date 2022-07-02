import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { BottomNavLayout } from './BottomNavLayout';
import { TopNavLayout } from './TopNavLayout';

const BodyWrapper = styled.div`
  height: calc(100% - 3.75rem - 3.75rem);
  background-color: yellow;
`;

const Body = ({ children }: PropsWithChildren) => {
  return <BodyWrapper>{children}</BodyWrapper>;
};

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 768px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NavLayout = ({ children }: PropsWithChildren) => {
  return (
    <LayoutContainer>
      <nav>
        <TopNavLayout />
      </nav>
      <NavLayout.Body>{children}</NavLayout.Body>
      <footer>
        <BottomNavLayout />
      </footer>
    </LayoutContainer>
  );
};

NavLayout.Body = Body;
