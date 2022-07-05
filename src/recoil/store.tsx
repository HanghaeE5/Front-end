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
