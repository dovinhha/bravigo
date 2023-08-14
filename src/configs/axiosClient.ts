import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import queryString from 'query-string';
import urls from './urls';
// import refreshTokens from 'sagas/refreshToken';

const axiosClient: AxiosInstance = axios.create({
  baseURL: urls.BASE_URL,
  timeout: 5 * 60 * 1000,
  paramsSerializer: {
    serialize: params => queryString.stringify(params, {sort: false}),
  },
});

axiosClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig<any>,
  ): Promise<InternalAxiosRequestConfig> => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTRiMTgyYTcxZTFiOTAwMTIwNDVhZTUiLCJpYXQiOjE2OTE5OTgyMjEsImV4cCI6MTY5MjAwMDAyMSwidHlwZSI6ImFjY2VzcyJ9.bThBch4gJqzP4UpJ-uqr9PCU2Km5k_VihyI2HnNAEvU';
    // JSON.parse(localStorage.getItem('access-token') ?? '""');

    config.headers.authorization = `Bearer ${token}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response): AxiosResponse<any, any> {
    return response;
  },
  async function (error) {
    // const {config} = error;

    // const refreshtoken = localStorage.getItem('refresh-token');
    // let token = localStorage.getItem('access-token');

    // if (
    //   error?.response?.status === 401 &&
    //   !!refreshtoken &&
    //   !!token &&
    //   (config.retry || 0) < 4
    // ) {
    //   if (config.retry === 3) {
    //     localStorage.removeItem('access-token');
    //     localStorage.removeItem('refresh-token');
    //     localStorage.removeItem('contestant');
    //     window.history.pushState('', '', '/auth/login');
    //     window.location.reload();
    //   } else {
    //     // config.retry = config.retry ? config.retry + 1 : 1;
    //     // token = await refreshTokens();
    //     // if (token) {
    //     //   localStorage.setItem('access-token', JSON.stringify(token));
    //     // }
    //     return axiosClient(config);
    //   }
    // }
    return Promise.reject(error);
  },
);

const axiosClientFile = axios.create({
  baseURL: urls.BASE_URL,
  timeout: 900000,
  paramsSerializer: {
    serialize: params => queryString.stringify(params, {sort: false}),
  },
});

axiosClientFile.interceptors.request.use(
  async config => {
    // config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    config.responseType = 'arraybuffer';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClientFile.interceptors.response.use(
  function (response: AxiosResponse<any, any>): AxiosResponse<any, any> {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  },
);

const custom = async (
  url: string,
  body: any,
  method: string,
  host: string,
): Promise<AxiosInstance> => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // responseType: 'blob',
  };
  return axiosClient({
    baseURL: host,
    url: url,
    data: method === 'get' ? undefined : body,
    method: method,
    ...config,
  }).then(
    response => {
      return response.data;
    },
    error => {
      return Promise.reject(error);
    },
  );
};

export {axiosClient, axiosClientFile, custom};
