import axios from 'axios';
import Cookies from 'js-cookie';
import apiConfig from './apiConfig';

const api = axios.create({
  baseURL: apiConfig.baseURL,
});

api.interceptors.request.use((config) => {
  const authToken = Cookies.get('authToken');
  if (authToken) {
    config.headers['X-CSRFToken'] = "feSKEvRaA7kfWh6TGrmGZtCdAC5NGpVQxTtsUUAy5Ri06ZeQPW8GIyoGEBwJxUYF";
    config.headers.Authorization = `token ${authToken}`;
  }
  return config;
});

export default api;
