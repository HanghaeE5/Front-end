import { ReactElement } from 'react';

import { Login, Main, SignIn } from './../page';
interface Route {
  id: string;
  path: string;
  page: () => ReactElement;
}

export const routeList: Route[] = [
  {
    id: 'main',
    path: '/',
    page: Main,
  },
  {
    id: 'main',
    path: '/signIn',
    page: SignIn,
  },
  {
    id: 'main',
    path: '/login',
    page: Login,
  },
];
