import axios from 'axios';
import Cookies from 'js-cookie';

const hasAccessToken = Boolean(Cookies.get('access-token'));
const hasCheckoutAuth = Boolean(Cookies.get('checkoutAuth'));
// const isNotUserLogged = !hasAccessToken && !hasCheckoutAuth;

// const baseURL = `${process.env.NEXT_PUBLIC_BFF_WEB_URL}/${
//   isNotUserLogged ? 'v2' : hasAccessToken ? 'v2' : 'v1.1'
// }`;
const token = Cookies.get('token');
const checkoutAuth = Cookies.get('checkoutAuth');
const accessToken = Cookies.get('access-token');

export const bffWebInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BFF_WEB_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY_BFF_WEB,
  },
});

bffWebInstance.interceptors.request.use(function (config) {
  config.headers.checkoutAuth = hasCheckoutAuth ? checkoutAuth : '';
  config.headers.Authorization = `Bearer ${
    hasAccessToken ? accessToken : token
  }`;
  return config;
});
