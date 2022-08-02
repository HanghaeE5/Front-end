import { PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { commonPopConfirmState } from '../../recoil/store';
import { PopConfirmNew } from '../element';
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
  position: relative;
`;

const BodyWrapper = styled.div`
  height: calc(100% - 8.75rem);
  overflow: hidden;
  top: 3.5rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const NavLayout = ({ children }: PropsWithChildren) => {
  const confirmState = useRecoilValue(commonPopConfirmState);
  return (
    <LayoutContainer>
      <TopNavBar />
      {confirmState.visible && <PopConfirmNew {...confirmState} />}
      <BodyWrapper>{children}</BodyWrapper>
      <BottomNavLayout />
    </LayoutContainer>
  );
};
