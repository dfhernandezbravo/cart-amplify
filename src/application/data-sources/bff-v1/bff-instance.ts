import axios from 'axios';
import Cookies from 'js-cookie';

const hasCheckoutAuth = Boolean(Cookies.get('checkoutAuth'));
const token = Cookies.get('token');
const checkoutAuth = Cookies.get('checkoutAuth');

export const bffWebInstanceV1 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BFF_WEB_URL}/v1.1`,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY_BFF_WEB,
  },
});

bffWebInstanceV1.interceptors.request.use(function (config) {
  config.headers.checkoutAuth = hasCheckoutAuth ? checkoutAuth : '';
  config.headers.Authorization = `Bearer ${token}`;

  const channel = Cookies.get('channel');
  if (channel) config.headers['x-channel'] = channel;
  return config;
});
