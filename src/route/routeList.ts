import {
  Login,
  LoginWait,
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
  ChooseCharacter,
  CommunitiPostingPage,
  EventPage,
} from '../page';
import { ReactElement } from 'react';
import { MediaType } from '../page/MediaType';
import { OnBoarding } from '../page/OnBoarding';

export interface IRoute {
  id: string;
  path: string;
  page: () => ReactElement;
  children?: IRoute[];
}

export const PATH = {
  COMMUNITY: '/community',
  COMMUNITY_POST: '/community/post',
  MAIN: '/main',
  TODO: '/todo',
  FRIEND: '/friendlist',
  FRIENDMAINPAGE: '/friend/page',
  CHAT: '/chat',
  EVENT: '/event',
};

export const routeList: IRoute[] = [
  {
    id: 'main',
    path: PATH.MAIN,
    page: Main,
  },
  {
    id: 'OnBoarding',
    path: '/onboarding',
    page: OnBoarding,
  },
  {
    id: 'mediaType',
    path: '/',
    page: MediaType,
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
    id: 'loginwait',
    path: '/loginwait',
    page: LoginWait,
  },
  {
    id: 'ChooseCharacter',
    path: '/choosecharacter',
    page: ChooseCharacter,
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
    path: `${PATH.COMMUNITY}/:id`,
    page: CommunityDetailPage,
  },
  {
    id: 'community',
    path: `${PATH.COMMUNITY_POST}/:boardId`,
    page: CommunitiPostingPage,
  },
  {
    id: 'community',
    path: PATH.COMMUNITY_POST,
    page: CommunitiPostingPage,
  },
  {
    id: 'todo',
    path: PATH.TODO,
    page: ToDoPage,
  },
  {
    id: 'friendlist',
    path: PATH.FRIEND,
    page: FriendList,
  },
  {
    id: 'friendpage',
    path: `${PATH.FRIENDMAINPAGE}/:nick`,
    page: FriendPage,
  },
  {
    id: 'chatting',
    path: PATH.CHAT,
    page: Chatting,
  },
  {
    id: 'chattingroom',
    path: `${PATH.CHAT}/room/:roomId`,
    page: ChattingRoom, //뒤에 방번호 넣기
  },
  {
    id: 'event',
    path: PATH.EVENT,
    page: EventPage,
  },
];
