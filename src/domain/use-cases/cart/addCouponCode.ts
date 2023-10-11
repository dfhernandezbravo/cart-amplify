import { createAsyncThunk } from '@reduxjs/toolkit';
import { CouponCode } from '@entities/cart/cart.entity';
import cartService from '@services/cart';

const addCouponCode = createAsyncThunk(
  '/cart/addCoupon',
  async (info: CouponCode ) => {
    try {
      const { data } = await cartService.addCoupon(info);
      return data;
    } catch (error) {
      return new Promise((_resolve, reject) => {
        reject(new Error('throw error'));
      });
    }
  },
);

export default addCouponCode;
