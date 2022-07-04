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
