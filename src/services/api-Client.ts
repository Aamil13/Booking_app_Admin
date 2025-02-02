import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClientRequest, ServerResponse } from '../types/api-client-types';

const isProduction = import.meta.env.VITE_ISPRODUCTION === 'true';
const client = async <T, U>(
  endPoint: string,
  {
    id,
    data,
    headers,
    method,
    customBaseUrl = false,
    ...rest
  }: ClientRequest<U> = {}
): Promise<ServerResponse<T>> => {
  const config: AxiosRequestConfig = {
    url:
      isProduction !== true
        ? `${import.meta.env.VITE_BASE_URL}/${endPoint}`
        : `${import.meta.env.VITE_PRODUCTION_BASE_URL}/${endPoint}`,
    method: method || (data ? 'POST' : 'GET'),
    data: data instanceof FormData ? data : JSON.stringify(data),
    headers: {
      ...headers,
      'Content-Type':
        data instanceof FormData ? 'multipart/form-data' : 'application/json',
    },
    params: {
      id,
    },
    ...rest,
  };

  try {
    const response: AxiosResponse<ServerResponse<T>> = await axios(config);
    const { data: resData } = response;

    return resData;
  } catch (err) {
    return Promise.reject(err);
  }
};

export { client };
