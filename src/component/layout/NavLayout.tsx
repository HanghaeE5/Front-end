import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const NavLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <nav>탑바</nav>
      <div>{children}</div>
      <footer>앱바</footer>
    </>
  );
};
