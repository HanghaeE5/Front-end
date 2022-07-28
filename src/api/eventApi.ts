import { EventResponse, LuckyBoxResponse } from '../Types/event';
import { callApi } from './callApi';

export const fetchEventFn = async () => {
  const { data } = await callApi.get<EventResponse>('/event');
  return data;
};

export const openLuckyboxFn = async () => {
  const { data } = await callApi.put<LuckyBoxResponse>('/event/open-box');
  return data;
};

export const exchangeCouponFn = async () => {
  const { data } = await callApi.put<EventResponse>('/event/exchange');
  return data;
};

export const enterPhoneFn = async (param: { eventId: number; phone: string }) => {
  // console.log('param', param);
  const { data } = await callApi.put<EventResponse>('/event/phone', param);
  return data;
};
