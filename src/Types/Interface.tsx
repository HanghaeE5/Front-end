export interface Post {
  id: number;
  userId: number;
  nickname: string;
  imgUrl: string;
  content: string;
  layoutType: number;
  likes: Array<Likes>;
}

interface Likes {
  userId: number;
}

export interface TokenList {
  exp: number;
  sub: string;
  userid: number;
}
