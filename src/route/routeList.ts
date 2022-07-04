import { ReactElement } from 'react';

import { Login, Main, SignUpEmail, SignUpSNS, CommunityPage, CommunityDetailPage } from './../page';

export interface IRoute {
  id: string;
  path: string;
  page: () => ReactElement;
  children?: IRoute[];
}

export const routeList: IRoute[] = [
  {
    id: 'main',
    path: '/',
    page: Main,
  },
  {
    id: 'signUpEmail',
    path: '/signupemail',
    page: SignUpEmail,
  },
  {
    id: 'signUpSns',
    path: '/signupsns',
    page: SignUpSNS,
  },
  {
    id: 'login',
    path: '/login',
    page: Login,
  },
  {
    id: 'community',
    path: '/community',
    page: CommunityPage,
  },
  {
    // TODO : route outlet 이용하기
    id: 'communityDetail',
    path: '/community/:id',
    page: CommunityDetailPage,
  },
];
