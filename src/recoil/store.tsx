import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserInfo, FriendInfo } from '../Types/user';
const { persistAtom } = recoilPersist();

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

type friend = {
  id: number;
  userId: string;
  nick: string;
  profileImageUrl: string;
  characterLevel: number;
};

type friendList = friend[];

export const friendListState = atom<friendList>({
  key: 'friendListState',
  default: [],
});

export const requestFriendListState = atom<friendList>({
  key: 'requestFriendListState',
  default: [],
});

type chatting = {
  roomId: string;
  name: string;
  participantList: [{ user: { profileImageUrl: string } }];
};

type chattingList = chatting[];

export const chattingListState = atom<chattingList>({
  key: 'chattingListState',
  default: [],
});

type chat = {
  createdDate: string;
  message: string;
  profileImageUrl: string;
  roomId: string;
  sender: string;
  type: string;
};

type chatList = chat[];

export const chatListState = atom<chatList>({
  key: 'chatListState',
  default: [],
});

export const atomKey = {
  userInfo: 'userInfo',
  friendInfo: 'friendInfo',
};

export const userInfoState = atom<UserInfo>({
  key: atomKey.userInfo,
  default: undefined,
});

export const friendInfoState = atom<FriendInfo>({
  key: atomKey.friendInfo,
  default: undefined,
});

type ConfirmType = 'warning' | 'chat' | 'withTodo' | 'success';

type popNoti = {
  openPopNoti?: boolean;
  informType?: ConfirmType;
  informMsg?: string;
  btnNav?: string;
  btnText?: string;
};

export const popNotiState = atom<popNoti>({
  key: 'popNotiState',
  default: { openPopNoti: false, informMsg: '' },
});

// type todayTodo = {
//   boardId: number;
//   category: string;
//   createdDate: string;
//   state: boolean;
//   todoContent: string;
//   todoDate: string;
//   todoId: number;
// };

// type todayTodoList = todayTodo[];

// export const todayTodoListState = atom<todayTodoList>({
//   key: 'todayTodoListState',
//   default: [],
// });

type modalGather = {
  levelUpModal?: boolean;
  stepUpModal?: boolean;
  editNicknameModal?: boolean;
  notiModal?: boolean;
  editPhotoModal?: boolean;
  profileMenuModal?: boolean;
  friendAddModal?: boolean;
};

export const modalGatherState = atom<modalGather>({
  key: 'modalGatherState',
  default: {
    levelUpModal: false,
    stepUpModal: false,
    editNicknameModal: false,
    notiModal: false,
    editPhotoModal: false,
    profileMenuModal: false,
    friendAddModal: false,
  },
});
