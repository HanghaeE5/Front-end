type PostType = 'challange' | 'daily' | 'all';

export interface CommunitySearchControl {
  category: string;
  keyword: string;
  type: PostType;
}

export interface Post {
  id: number;
  userId: number;
  userImg?: string;
  userName: string;
  imgUrl?: string;
  title: string;
  content: string;
  type: PostType;
  gather: number;
}

export interface PostDetail extends Post {
  postNumber: number;
  date: string;
}
