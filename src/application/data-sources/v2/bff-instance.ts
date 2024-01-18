import axios from 'axios';
import Cookies from 'js-cookie';

const accessToken = Cookies.get('access-token');

export const bffWebInstanceV2 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BFF_WEB_URL}/v2`,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY_BFF_WEB,
  },
});

bffWebInstanceV2.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});
