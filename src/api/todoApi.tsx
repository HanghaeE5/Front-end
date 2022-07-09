import { TodoData, TodoParams } from '../Types/todo';
import { callApi } from './callApi';

export const todoQueryKey = {
  fetchTodo: 'fetchTodo',
};

export const fetchTodoList = async (params: TodoParams) => {
  const { data } = await callApi.get('/todo', {
    params,
  });
  return data;
};

export const createTodo = async (params: TodoData) => {
  const { data } = await callApi.post('/todo', {
    params,
  });
  return data;
};

export const updateTodo = async (todoId: number, params: TodoData) => {
  const { data } = await callApi.put(`/todo/${todoId}`, {
    params,
  });
  return data;
};

export const updateDoneTodo = async (todoId: number) => {
  const { data } = await callApi.post(`/todo/${todoId}`);
  return data;
};

export const deleteTodo = async (todoId: number) => {
  const { data } = await callApi.delete(`/todo/${todoId}`);
  return data;
};
