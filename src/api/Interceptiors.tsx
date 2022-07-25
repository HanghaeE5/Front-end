import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router';
import { useCommonConfirm } from '../hooks/useCommonConfirm';

// axios.defaults.withCredentials = true;
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // console.info(`[request] [${JSON.stringify(config)}]`);

  const localToken = localStorage.getItem('recoil-persist');

  if (localToken) {
    const toto = JSON.parse(localToken);

    // console.log(toto.tokenState);
    if (toto) {
      // console.log(config);
      config.headers = {
        Authorization: toto.accessTokenState || 0 || false,
        // Refresh: toto.refreshTokenState || 0 || false,
        'Content-Type': 'application/json',
      };
    }
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  const nav = useNavigate();

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();
  // console.error(`[request error] [${JSON.stringify(error)}]`);
  if (error.message === 'Request failed with status code 401') {
    const localToken = localStorage.getItem('recoil-persist');

    if (localToken) {
      const toto = JSON.parse(localToken);
      const accessToken = toto.accessTokenState;
      // const refreshToken = toto.refreshTokenState;

      axios
        .get('https://todowith.shop/refresh', {
          headers: {
            Authorization: accessToken,
            // Refresh: refreshToken,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          localStorage.setItem(
            'recoil-persist',
            JSON.stringify({
              accessTokenState: res.headers.authorization,
              // refreshTokenState: res.headers.refresh,
            }),
          );
        })
        .catch((error) => {
          console.log('refesh 토큰 못 받아옴');
          openErrorConfirm({
            title: '🙅🏻‍♀️로그인 시간이 만료되었습니다🙅🏻‍♀️',
            content: '다시 로그인 해주세요.',
            button: {
              text: '확인',
              onClick: () => {
                localStorage.clear();
                nav('/login');
              },
            },
          });
        });
    }

    return Promise.reject(error);
  }
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  const nav = useNavigate();

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  if (error.message === 'Request failed with status code 401') {
    const localToken = localStorage.getItem('recoil-persist');

    if (localToken) {
      const toto = JSON.parse(localToken);
      const accessToken = toto.accessTokenState;
      // const refreshToken = toto.refreshTokenState;

      axios
        .get('https://todowith.shop/refresh', {
          headers: {
            Authorization: accessToken,
            // Refresh: refreshToken,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem(
            'recoil-persist',
            JSON.stringify({
              accessTokenState: res.headers.authorization,
              // refreshTokenState: res.headers.refresh,
            }),
          );
        })
        .catch((error) => {
          console.log('refesh 토큰 못 받아옴');
          openErrorConfirm({
            title: '🙅🏻‍♀️로그인 시간이 만료되었습니다🙅🏻‍♀️',
            content: '다시 로그인 해주세요.',
            button: {
              text: '확인',
              onClick: () => {
                localStorage.clear();
                nav('/login');
              },
            },
          });
        });
    }
    return Promise.reject(error);
  }
  return Promise.reject(error);
};
export default function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
