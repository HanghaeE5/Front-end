import { PopConfirmProps } from '../component/element';

export type ConfirmType = 'warning' | 'chat' | 'withTodo' | 'success';

export type popNoti = {
  openPopNoti?: boolean;
  informType?: ConfirmType;
  informMsg?: string;
  btnNav?: string;
  btnText?: string;
};

export type modalGather = {
  levelUpModal?: boolean;
  stepUpModal?: boolean;
  editNicknameModal?: boolean;
  notiModal?: boolean;
  editPhotoModal?: boolean;
  profileMenuModal?: boolean;
  friendAddModal?: boolean;
};

export interface CommonConfirmProps extends Partial<PopConfirmProps> {
  visible: boolean;
  type: 'error' | 'success';
}
