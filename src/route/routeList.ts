import { CommunitiPostingPage } from './../page/CommunityPostingPage';
import { ReactElement } from 'react';

import {
  Login,
  Main,
  SignUpEmail,
  SignUpSNS,
  CommunityPage,
  CommunityDetailPage,
  ToDoPage,
  FriendList,
  Chatting,
  ChattingRoom,
  EditPassword,
  FriendPage,
} from './../page';

export interface IRoute {
  id: string;
  path: string;
  page: () => ReactElement;
  children?: IRoute[];
}

export const PATH = {
  COMMUNITY: '/community',
  communityPosting: '/community/post',
};

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
    id: 'editPassword',
    path: '/editpassword',
    page: EditPassword,
  },
  {
    id: 'community',
    path: PATH.COMMUNITY,
    page: CommunityPage,
  },
  {
    // TODO : route outlet 이용하기
    id: 'communityDetail',
    path: '/community/:id',
    page: CommunityDetailPage,
  },
  {
    id: 'community',
    path: `${PATH.communityPosting}/:boardId`,
    page: CommunitiPostingPage,
  },
  {
    id: 'community',
    path: PATH.communityPosting,
    page: CommunitiPostingPage,
  },
  {
    id: 'todo',
    path: '/todo',
    page: ToDoPage,
  },
  {
    id: 'friendlist',
    path: '/friendlist',
    page: FriendList,
  },
  {
    id: 'friendpage',
    path: '/friend/page/:nick',
    page: FriendPage,
  },
  {
    id: 'chatting',
    path: '/chatting',
    page: Chatting,
  },
  {
    id: 'chattingroom',
    path: '/chat/room/:roomId',
    page: ChattingRoom, //뒤에 방번호 넣기
  },
];
