import { GetCartRequest } from "@entities/cart/cart.request";
import { createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "@services/cart";

const getCart = createAsyncThunk(
  "/cart/getCart",
  async (dataRequest: GetCartRequest) => {
    try {
      const { data } = await cartService.getCart(dataRequest);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export default getCart;
