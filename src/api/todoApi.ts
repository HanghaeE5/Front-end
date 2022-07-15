import { ITodoItem, TodoDoneResponse } from './../Types/todo';
import { FetchTodoResponse, TodoData, TodoParams } from '../Types/todo';
import { callApi } from './callApi';

export const todoQueryKey = {
  fetchTodo: 'fetchTodo',
};

export const fetchTodoList = async (params: TodoParams) => {
  const { data } = await callApi.get<FetchTodoResponse>('/todo', {
    params,
  });
  return data;
};

export const createTodo = async (params: TodoData) => {
  const { data } = await callApi.post('/todo', params);
  return data;
};

export const updateTodoFn = async ({ todoId, params }: { todoId: number; params: Partial<ITodoItem> }) => {
  const { data } = await callApi.put(`/todo/${todoId}`, params);
  return data;
};

export const updateDoneTodo = async (todoId: number) => {
  const { data } = await callApi.post<TodoDoneResponse>(`/todo/${todoId}`);
  return data;
};

export const deleteTodoFn = async (todoId: number) => {
  const { data } = await callApi.delete(`/todo/${todoId}`);
  return data;
};

export const updateTodoScope = async (publicScope: string) => {
  const { data } = await callApi.put(`/todo/scope`, { publicScope });
  return data;
};
