import axios from "axios";
import { getToken } from './auth';
import enviroment from '../enviroments/enviroment-dev';

const api = axios.create({
  baseURL: enviroment.functions.localApi,
  responseType: 'json',
});

api.interceptors.request.use(async config => {
  
 const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;