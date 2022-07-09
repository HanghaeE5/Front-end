export type Category = 'study' | 'excercise' | 'shopping' | 'promise' | 'etc';

export type Access = 'public' | 'freind' | 'private';

export type TodoStatus = 'done-list' | 'doing-list';

export type TodoStatusFilter = TodoStatus | 'all';

export type Sort = 'desc' | 'asc';

export interface TodoParams {
  filter: TodoStatusFilter;
  sort: Sort;
  page: number;
  size: number;
}

// TODO : TodoAddData로 바꿔야겄네
export interface TodoData {
  title: string;
  category: Category;
  date: { [key in string]: null };
}

export interface ITodoItem {
  category: string;
  createdDate: string;
  state: boolean;
  todoContent: string;
  todoDate: string;
  todoId: number;
}
