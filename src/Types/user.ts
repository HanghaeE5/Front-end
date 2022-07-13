export interface UserInfo {
  characterInfo: {
    exp: number;
    level: number;
    levelUp: boolean;
    step: string;
    stepUp: boolean;
    type: string;
  };
  createdDate: string;
  email: string;
  id: number;
  modifiedDate: string;
  nick: string;
  profileImageUrl: string;
  providerType: string;
  roleType: string;
  userId: string;
}
