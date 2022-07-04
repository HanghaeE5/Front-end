import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const tokenState = atom({
  key: 'tokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const editNicknameModalState = atom({
  key: 'nicknameModalState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const editPasswordModalState = atom({
  key: 'editPasswordModalState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const notiModalState = atom({
  key: 'notiModalState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const editPhotoModalState = atom({
  key: 'editPhotoModalState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const profileMenuModalState = atom({
  key: 'profileMenuModalState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
