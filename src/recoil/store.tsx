import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserInfo, FriendInfo } from '../Types/user';
const { persistAtom } = recoilPersist();

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const refreshTokenState = atom({
  key: 'refreshTokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const editNicknameModalState = atom({
  key: 'nicknameModalState',
  default: false,
});

export const editPasswordModalState = atom({
  key: 'editPasswordModalState',
  default: false,
});

export const notiModalState = atom({
  key: 'notiModalState',
  default: false,
});

export const editPhotoModalState = atom({
  key: 'editPhotoModalState',
  default: false,
});

export const profileMenuModalState = atom({
  key: 'profileMenuModalState',
  default: false,
});

export const userNicknameState = atom({
  key: 'userNicknameState',
  default: '',
});

export const userChatacterTypeState = atom({
  key: 'userChatacterTypeState',
  default: '',
});

export const friendAddModalState = atom({
  key: 'friendAddModalState',
  default: false,
});

export const friendNicknameState = atom({
  key: 'friendNicknameState',
  default: '',
});

type Img = {
  img_show: string;
  img_file: File | string | Blob;
};

export const userprofilephotoState = atom<Img>({
  key: 'userprofilephotoState',
  default: {
    img_show: '',
    img_file: '',
  },
});

export const userPhotoWaitState = atom<Img>({
  key: 'userPhotoWaitState',
  default: {
    img_show: '',
    img_file: '',
  },
});

type friend = {
  id: number;
  userId: string;
  nick: string;
  level: number;
  profileImageUrl: string;
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

export const userJoinTypeState = atom({
  key: 'userJoinTypeState',
  default: false,
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

export const popNotiState = atom({
  key: 'popNotiState',
  default: false,
});

type todayTodo = {
  boardId: number;
  category: string;
  createdDate: string;
  state: boolean;
  todoContent: string;
  todoDate: string;
  todoId: number;
};

type todayTodoList = todayTodo[];

export const todayTodoListState = atom<todayTodoList>({
  key: 'todayTodoListState',
  default: [],
});

export const levelUpModalState = atom({
  key: 'levelUpModalState',
  default: false,
});

export const stepUpModalState = atom({
  key: 'stepUpModalState',
  default: false,
});
