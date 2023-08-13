import {AxiosResponse} from 'axios';

const {axiosClient, axiosClientFile} = require('./axiosClient');
export const GET = (url: string): Promise<AxiosResponse<any, any>> => {
  return axiosClient.get(url);
};

export const POST = (
  url: string,
  body: any,
): Promise<AxiosResponse<any, any>> => {
  return axiosClient.post(url, body);
};

export const PATCH = (
  url: string,
  body: any,
): Promise<AxiosResponse<any, any>> => {
  return axiosClient.patch(url, body);
};

export const PUT = (
  url: string,
  body: any,
): Promise<AxiosResponse<any, any>> => {
  return axiosClient.put(url, body);
};

export const DELETE = (url: string): Promise<AxiosResponse<any, any>> => {
  return axiosClient.delete(url);
};

export const GET_FILE = (
  url: string,
  param: string,
): Promise<AxiosResponse<any, any>> => {
  return axiosClientFile.get(url, param);
};

export default {GET, POST, PATCH, DELETE, GET_FILE};
