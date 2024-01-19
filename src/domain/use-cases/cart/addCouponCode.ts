import { createAsyncThunk } from '@reduxjs/toolkit';
import { CouponCode } from '@entities/cart/cart.entity';
import cartService from '@services/cart';
import getInstanceHttp from './get-instance-http';

const addCouponCode = createAsyncThunk(
  '/cart/addCoupon',
  async (info: CouponCode) => {
    try {
      const { data } = await cartService(getInstanceHttp()).addCoupon(info);
      return data;
    } catch (error) {
      return new Promise((_resolve, reject) => {
        reject(new Error('throw error'));
      });
    }
  },
);

export default addCouponCode;
