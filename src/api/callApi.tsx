import axios from 'axios';

import { FieldValues } from 'react-hook-form';

import setupInterceptorsTo from './Interceptiors';

const baseApi = axios.create({
  baseURL: 'https://todowith.shop',
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
  const jsa = await callApi.put('/register/social', nick);
  return jsa;
};

const loginApi = async (data: FieldValues) => {
  const la = await callApi.post('/login', data);
  return la;
};

const userInformApi = async () => {
  const loa = await callApi.get('/user');
  return loa;
};

const nicknameEditApi = async (nick: { nick: string }) => {
  const nea = await callApi.put('/user/nick', nick);
  return nea;
};

const profilePhotoEditApi = async (forms: FormData) => {
  const ppea = await callApi.put('/user/profile', forms);
  return ppea;
};

const friendAddApi = async (nick: { nick: string }) => {
  const faa = await callApi.post('/friend/request', nick);
  return faa;
};

const friendListApi = async () => {
  const fla = await callApi.get('/friend/list');
  return fla;
};

const requestFriendListApi = async () => {
  const rfla = await callApi.get('/friend/request/list');
  return rfla;
};

const allowFriendApi = async (nick: { nick: string }) => {
  const afa = await callApi.post('/friend/accept', nick);
  return afa;
};

const deleteFriendApi = async (nick: { nick: string }) => {
  const dfa = await callApi.delete(`/friend/delete`, { data: nick });
  return dfa;
};

const rejectFriendApi = async (nick: { nick: string }) => {
  const rfa = await callApi.delete(`/friend/reject`, { data: nick });
  return rfa;
};

export const registerApi = {
  joinApi: (data: FieldValues) => joinApi(data),
  emilCertificationApi: (email: { email: string }) => emilCertificationApi(email),
  emilCertificationNumberApi: (data: FieldValues) => emilCertificationNumberApi(data),
  nickCertificationApi: (nick: { nick: string }) => nickCertificationApi(nick),
  loginApi: (data: FieldValues) => loginApi(data),
  joinSocialApi: (nick: { nick: string }) => joinSocialApi(nick),
};

export const userApi = {
  userInformApi: () => userInformApi(),
  nicknameEditApi: (nick: { nick: string }) => nicknameEditApi(nick),
  profilePhotoEditApi: (forms: FormData) => profilePhotoEditApi(forms),
};

export const friendApi = {
  friendAddApi: (nick: { nick: string }) => friendAddApi(nick),
  friendListApi: () => friendListApi(),
  requestFriendListApi: () => requestFriendListApi(),
  allowFriendApi: (nick: { nick: string }) => allowFriendApi(nick),
  deleteFriendApi: (nick: { nick: string }) => deleteFriendApi(nick),
  rejectFriendApi: (nick: { nick: string }) => rejectFriendApi(nick),
};
