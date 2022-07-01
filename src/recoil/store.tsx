import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// export const layoutState = atom<string | number>({
//   key: 'layoutState',
//   default: 0,
// });

// type Post = {
//   id: number;
//   userId: number;
//   nickname: string;
//   imgUrl: string;
//   content: string;
//   layoutType: number;
//   likes: any;
// };

// type postList = Post[];

// export const postListState = atom<postList>({
//   key: 'postListState',
//   default: [],
// });

const { persistAtom } = recoilPersist();

export const tokenState = atom({
  key: 'tokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
