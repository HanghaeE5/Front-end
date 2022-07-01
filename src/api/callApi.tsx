import axios from 'axios';

import { FieldValues } from 'react-hook-form';

import setupInterceptorsTo from './Interceptiors';

const baseApi = axios.create({
  baseURL: 'http://13.209.96.69',
  timeout: 1000,
});

const callApi = setupInterceptorsTo(baseApi);

const joinApi = async (data: FieldValues) => {
  const ja = await callApi.post('/register', data);
  return ja;
};

const emilCertificationApi = async (email: { email: string }) => {
  const eca = await callApi.post('/register/email', email);
  return eca;
};

const emilCertificationNumberApi = async (data: FieldValues) => {
  const ecna = await callApi.post('/register/email-check', data);
  return ecna;
};

const nickCertificationApi = async (nick: { nick: string }) => {
  const nca = await callApi.post('/register/nick-check', nick);
  return nca;
};

const joinSocialApi = async (nick: { nick: string }) => {
  const jsa = await callApi.put('/register/social', nick, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return jsa;
};

const loginApi = async (data: FieldValues) => {
  const la = await callApi.post('/login', data);
  return la;
};

const logoutApi = async () => {
  const loa = await callApi.get('/logout');
  return loa;
};

const postWriteApi = async (forms: FormData) => {
  // console.log("aa", tokenUse);
  const pwa = await callApi.post('/boards', forms, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return pwa;
};

const deleteApi = async (Id: number) => {
  const da = await callApi.delete(`/boards/${Id}`);
  return da;
};

const editApi = async (Id: number, formData: FormData) => {
  const ea = await callApi.put(`/boards/${Id}`, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return ea;
};

const likeApi = async (Id: number) => {
  const la = await callApi.post(`/boards/${Id}/likes`);
  return la;
};

const unlikeApi = async (Id: number) => {
  const la = await callApi.delete(`/boards/${Id}/likes`);
  return la;
};

export const registerApi = {
  joinApi: (data: FieldValues) => joinApi(data),
  emilCertificationApi: (email: { email: string }) => emilCertificationApi(email),
  emilCertificationNumberApi: (data: FieldValues) => emilCertificationNumberApi(data),
  nickCertificationApi: (nick: { nick: string }) => nickCertificationApi(nick),
  loginApi: (data: FieldValues) => loginApi(data),
  logoutApi: () => logoutApi(),
};

export const boardApi = {
  postWriteApi: (data: FormData) => postWriteApi(data),
  deleteApi: (Id: number) => deleteApi(Id),
  editApi: (Id: number, formData: FormData) => editApi(Id, formData),
  likeApi: (Id: number) => likeApi(Id),
  unlikeApi: (Id: number) => unlikeApi(Id),
};
