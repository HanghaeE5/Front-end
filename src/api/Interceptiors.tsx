import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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
        Refresh: toto.refreshTokenState || 0 || false,
        'Content-Type': 'application/json',
      };
    }
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // console.error(`[request error] [${JSON.stringify(error)}]`);
  if (error.message === 'Request failed with status code 401') {
    const localToken = localStorage.getItem('recoil-persist');

    if (localToken) {
      const toto = JSON.parse(localToken);
      const accessToken = toto.accessTokenState;
      const refreshToken = toto.refreshTokenState;

      axios
        .get('https://todowith.shop/refresh', {
          headers: {
            Authorization: accessToken,
            Refresh: refreshToken,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          localStorage.setItem(
            'recoil-persist',
            JSON.stringify({
              accessTokenState: res.headers.authorization,
              refreshTokenState: res.headers.refresh,
            }),
          );
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

  if (error.message === 'Request failed with status code 401') {
    const localToken = localStorage.getItem('recoil-persist');

    if (localToken) {
      const toto = JSON.parse(localToken);
      const accessToken = toto.accessTokenState;
      const refreshToken = toto.refreshTokenState;

      axios
        .get('https://todowith.shop/refresh', {
          headers: {
            Authorization: accessToken,
            Refresh: refreshToken,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem(
            'recoil-persist',
            JSON.stringify({
              accessTokenState: res.headers.authorization,
              refreshTokenState: res.headers.refresh,
            }),
          );
        })
        .catch();
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
