export type Category = 'study' | 'excercise' | 'shopping' | 'promise' | 'etc';

export interface TodoData {
  title: string;
  category: Category;
  date: { [key in string]: null };
}
