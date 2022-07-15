import { PropsWithChildren } from 'react';

import styled from 'styled-components';

const BodyWrapper = styled.div`
  height: calc(100%);
  overflow: hidden;
`;

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 768px;
  height: 100%;
  position: relative;
`;

export const NoHeaderPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <LayoutContainer>
      <BodyWrapper>{children}</BodyWrapper>
    </LayoutContainer>
  );
};
