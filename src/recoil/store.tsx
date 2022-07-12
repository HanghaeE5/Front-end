import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
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
  participantList: [{ profileImgUrl: string }];
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
  roomId: string;
  sender: string;
  type: string;
};

type chatList = chat[];

export const chatListState = atom<chatList>({
  key: 'chatListState',
  default: [],
});
