type chat = {
  createdDate: string;
  message: string;
  profileImageUrl: string;
  roomId: string;
  sender: string;
  type: string;
};

export type chatList = chat[];

type chatting = {
  roomId: string;
  name: string;
  participantList: [{ user: { profileImageUrl: string } }];
};

export type chattingList = chatting[];
