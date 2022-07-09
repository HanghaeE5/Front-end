import { TodoParams } from '../Types/todo';
import { callApi } from './callApi';

export const todoQueryKey = {
  fetchTodo: 'fetchTodo',
};

export const fetchTodoList = async (params: TodoParams) => {
  console.log('fetchTodo', params);
  const res = await callApi.get('/todo', {
    params,
  });
  return res.data;
};
