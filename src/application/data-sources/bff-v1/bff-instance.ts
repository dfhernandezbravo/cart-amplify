import axios from 'axios';
import Cookies from 'js-cookie';

export const bffWebInstanceV1 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BFF_WEB_URL}/v1.1`,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY_BFF_WEB,
  },
});

bffWebInstanceV1.interceptors.request.use(function (config) {
  const hasCheckoutAuth = Boolean(Cookies.get('checkoutAuth'));
  const token = Cookies.get('token');
  const checkoutAuth = Cookies.get('checkoutAuth');
  if (hasCheckoutAuth) {
    config.headers.checkoutAuth = checkoutAuth;
    config.headers.Authorization = `Bearer ${token}`;
  }

  const channel = Cookies.get('channel');
  if (channel) config.headers['x-channel'] = channel;
  return config;
});

bffWebInstanceV1.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const errorResponse = error?.response?.data?.errorCode;
    if (errorResponse) {
      if (
        errorResponse?.errorCode === 'MSSC0001' &&
        errorResponse?.message === 'orderform not found' &&
        errorResponse?.statusCode === 400
      ) {
        let iframe = document.getElementById(
          'minicartHybridation',
        ) as HTMLIFrameElement;
        if (iframe) {
          console.info('::: rld mc ::');
          iframe?.contentWindow?.location.reload();
        }
      }
    }
  },
);
