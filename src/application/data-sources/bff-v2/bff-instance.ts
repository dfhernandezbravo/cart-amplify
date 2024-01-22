import axios from 'axios';
import Cookies from 'js-cookie';

export const bffWebInstanceV2 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BFF_WEB_URL}/v2`,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY_BFF_WEB,
  },
});

bffWebInstanceV2.interceptors.request.use(function (config) {
  const accessToken = Cookies.get('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});
