import cartService from '@services/cart';
import Cookies from 'js-cookie';

export const getAccessToken = async () => {
  try {
    const { data } = await cartService.getAccessToken();
    const {
      accessToken,
      accessTokenExpired,
      refreshToken,
      refreshTokenExpired,
    } = data;
    Cookies.set('accessToken', accessToken, {
      expires: new Date(accessTokenExpired * 1000),
    });
    Cookies.set('refreshToken', refreshToken, {
      expires: new Date(refreshTokenExpired * 1000),
    });
  } catch (error) {
    throw new Error('error to retrieve access token');
  }
};
