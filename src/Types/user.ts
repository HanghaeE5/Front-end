import { PublicScope } from './todo';

export interface UserInfo {
  characterInfo: {
    characterName: string;
    characterUrl: string;
    expPercent: number;
    level: number;
    levelUp: boolean;
    step: string;
    stepUp: boolean;
    type: string;
    promise: number;
    shopping: number;
    exercise: number;
    study: number;
  };
  createdDate: string;
  email: string;
  id: number;
  modifiedDate: string;
  nick: string;
  profileImageUrl: string;
  providerType: string;
  publicScope: PublicScope;
  roleType: string;
  userId: string;
  todayTodoList: [
    {
      boardId: number;
      category: string;
      createdDate: string;
      state: true;
      todoContent: string;
      todoDate: string;
      todoId: number;
    },
  ];
}

export interface FriendInfo {
  characterInfo: {
    characterName: string;
    characterUrl: string;
    expPercent: number;
    level: number;
    levelUp: boolean;
    step: string;
    stepUp: boolean;
    type: string;
    promise: number;
    shopping: number;
    exercise: number;
    study: number;
  };
  createdDate: string;
  email: string;
  id: number;
  modifiedDate: string;
  nick: string;
  profileImageUrl: string;
  providerType: string;
  publicScope: PublicScope;
  roleType: string;
  userId: string;
  todoList: [
    {
      boardId: number;
      category: string;
      createdDate: string;
      state: true;
      todoContent: string;
      todoDate: string;
      todoId: number;
    },
  ];
}

type friend = {
  id: number;
  userId: string;
  nick: string;
  profileImageUrl: string;
  characterLevel: number;
};

export type friendList = friend[];
