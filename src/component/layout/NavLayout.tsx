import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const NavLayout = ({ children }: PropsWithChildren) => {
  console.log(window.location.href);
  return (
    <>
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
    </>
  );
};
