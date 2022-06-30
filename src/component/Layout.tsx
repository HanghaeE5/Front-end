import { match } from 'assert';
import { PropsWithChildren } from 'react';
import { parseMutationArgs } from 'react-query/types/core/utils';
import styled from 'styled-components';

const ResponseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.mainColor};
  box-sizing: border-box;
  font-family: 'NotoMed';
  div {
    /* background-color: #c9e6f1; */
    /* width: 90%;
    height: 100%; */
  }
`;

export const Layout = ({ children }: PropsWithChildren) => {
  console.log(window.location.href);
  return (
    <ResponseContainer>
      {window.location.href.includes('login') ||
      window.location.href.includes('register') ||
      window.location.href.includes('Login') ||
      window.location.href.includes('Register') ||
      window.location.href.includes('Sign') ||
      window.location.href.includes('sign') ? (
        <div>{children}</div>
      ) : (
        <>
          <nav>탑바</nav>
          <div>{children}</div>
          <footer>앱바</footer>
        </>
      )}
    </ResponseContainer>
  );
};
