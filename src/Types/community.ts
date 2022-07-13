export type PostType = 'DAILY' | 'CHALLENGE';

export type FilterType = 'daily' | 'challenge' | 'my';
export type KeywordFilter = 'title' | 'content' | 'all';

export interface CommunitySearchControl {
  filter: FilterType | undefined;
  keyword: string | undefined;
  sub: KeywordFilter | undefined;
  page: number;
  size: number;
}

export interface Board {
  authorEmail: string;
  authorNick: string;
  authorProfileImageUrl: string;
  boardContent: string;
  boardCreatedDate: string;
  boardId: number;
  category: PostType;
  imageUrl?: string;
  participating: boolean;
  participatingCount: 0;
  title: string;
  todos?: [
    {
      category: string;
      createdDate: Date;
      id: number;
      todoContent: string;
      todoDate: string;
    },
  ];
}

export interface AddBoardData {
  board: {
    category: PostType;
    content: string;
    imageUrl?: string;
    title: string;
  };
  todo?: {
    category: string;
    content: string;
    todoDateList: string[];
  };
}

export interface BoardParam {
  filter: FilterType;
  keyword?: string;
  offset: number;
  pageNumber: number;
  pageSize: number;
  sub: KeywordFilter;
}

export interface FetchBoardResponse {
  content: Board[];
  last: boolean;
  totalElements: number;
}
