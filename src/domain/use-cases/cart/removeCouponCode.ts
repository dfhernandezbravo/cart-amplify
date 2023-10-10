import { createAsyncThunk } from '@reduxjs/toolkit';
import { CouponCode } from '@entities/cart/cart.entity';
import cartService from '@services/cart';

const removeCouponCode = createAsyncThunk(
  '/cart/removeCoupon',
  async (info: CouponCode ) => {
    try {
      const { data } = await cartService.removeCoupon(info);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
);

export default removeCouponCode;
