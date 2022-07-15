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
