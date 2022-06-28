import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const ResponseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.mainColor};

  div {
    background-color: skyblue;
    width: 100%;
    height: 100%;
  }
`;

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ResponseContainer>
      <nav>탑바</nav>
      <div>{children}</div>
      <footer>앱바</footer>
    </ResponseContainer>
  );
};
