export type Category = 'STUDY' | 'EXERCISE' | 'SHOPPING' | 'PROMISE' | 'ETC';

export type PublicScope = 'ALL' | 'FRIEND' | 'NONE';

export type TodoStatusFilter = 'doingList' | 'doneList' | 'all';

export type Sort = 'desc' | 'asc';

export interface TodoParams {
  filter: TodoStatusFilter;
  sort: Sort;
  page: number;
  size: number;
}

// TODO : TodoAddData로 바꿔야겄네
export interface TodoData {
  content: string;
  category: Category;
  todoDate?: string;
  todoDateList: string[];
  todoId?: number;
}

export interface ITodoItem {
  category: string;
  createdDate?: string;
  state: boolean;
  todoContent: string;
  todoDate: string;
  todoId: number;
  boardId?: number;
}

export interface FetchTodoResponse {
  content: ITodoItem[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export type TodoEvent = (todoData: ITodoItem) => void;

export interface TodoDoneResponse {
  characterInfo: {
    characterName: string;
    characterUrl: string;
    exercise: number;
    expDone: number;
    expNeed: number;
    expPercent: 0;
    level: number;
    levelUp: boolean;
    promise: number;
    shopping: number;
    step: string;
    stepUp: boolean;
    study: number;
    type: string;
    todayDone?: number;
  };
}
