import { Board } from './../Types/community';
import { AddBoardData, CommunitySearchControl, FetchBoardResponse } from '../Types/community';
import { TodoData, TodoParams } from '../Types/todo';
import { callApi } from './callApi';

const COMMUNITY_URL = '/board';

export const communityQueryKey = {
  fetchBoard: 'fetchBoard',
  fetchBoardDetail: 'fetchBoardDetail',
};

export const fetchBoardFn = async (params: CommunitySearchControl) => {
  const { data } = await callApi.get<FetchBoardResponse>(COMMUNITY_URL, {
    params,
  });
  return data;
};

export const fetchBoardDetailFn = async (id: number) => {
  const { data } = await callApi.get<Board>(`${COMMUNITY_URL}/${id}`);
  return data;
};

export const uploadImageFn = async (file: FormData) => {
  const { data } = await callApi.post(`${COMMUNITY_URL}/image`, file);
  return data;
};

export const postCummunityFn = async (post: AddBoardData) => {
  const { data } = await callApi.post(COMMUNITY_URL, post);
  return data;
};

export const updateBoardFn = async ({ boardId, params }: { boardId: number; params: AddBoardData }) => {
  const { data } = await callApi.put(`${COMMUNITY_URL}/${boardId}`, {
    params,
  });
  return data;
};

export const deleteBoardFn = async (boardId: number) => {
  const { data } = await callApi.delete(`${COMMUNITY_URL}/${boardId}`);
  return data;
};

export const joinChallengeFn = async (boardId: number) => {
  const { data } = await callApi.post(`${COMMUNITY_URL}/${boardId}/challenge`);
  return data;
};

export const exitChallengeFn = async (boardId: number) => {
  const { data } = await callApi.put(`${COMMUNITY_URL}/${boardId}/challenge`);
  return data;
};
