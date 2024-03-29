import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { PopConfirmProps } from '../component/element';
import { chattingList } from '../Types/chat';
import { modalGather, popNoti } from '../Types/modal';
import { notificationList } from '../Types/notification';
import { UserInfo, friendList } from '../Types/user';
const { persistAtom } = recoilPersist();

export const atomKey = {
  USER_INFO: 'userInfo',
  FRIEND_INFO: 'friendInfo',
  COMMON_POP_CONFIRM: 'commonPopConfirm',
};

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const snsSignupNickname = atom<boolean | undefined>({
  key: 'snsSignupNicknameState',
  default: undefined,
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
  key: atomKey.USER_INFO,
  default: undefined,
});

export const popNotiState = atom<popNoti>({
  key: 'popNotiState',
  default: { openPopNoti: false, informMsg: '' },
});

export const notificationListState = atom<notificationList>({
  key: 'notificationListState',
  default: [],
});

export const alarmOnState = atom<boolean>({
  key: 'alarmOnState',
  default: false,
});

export const modalGatherState = atom<modalGather>({
  key: 'modalGatherState',
  default: {
    levelUpModal: false,
    stepUpModal: false,
    editNicknameModal: false,
    editPhotoModal: false,
    profileMenuModal: false,
    friendAddModal: false,
    explainModal: false,
    researchPopup: false,
  },
});

export const commonPopConfirmState = atom<PopConfirmProps & { visible: boolean }>({
  key: atomKey.COMMON_POP_CONFIRM,
  default: {
    visible: false,
    iconType: 'success',
    title: '',
    content: '',
    button: { text: '확인', onClick: () => console.log('확인') },
  },
});
