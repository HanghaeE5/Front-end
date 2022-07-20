import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { chatList, chattingList } from '../Types/chat';
import { modalGather, popNoti } from '../Types/modal';
import { UserInfo, FriendInfo, friendList, atomKey } from '../Types/user';
const { persistAtom } = recoilPersist();

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const friendListState = atom<friendList>({
  key: 'friendListState',
  default: [],
});

export const chattingListState = atom<chattingList>({
  key: 'chattingListState',
  default: [],
});

export const userInfoState = atom<UserInfo>({
  key: atomKey.userInfo,
  default: undefined,
});

export const popNotiState = atom<popNoti>({
  key: 'popNotiState',
  default: { openPopNoti: false, informMsg: '' },
});

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
