import { DeleteItemRequest } from "@entities/cart/cart.request";
import { createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "@services/cart";

const deleteItem = createAsyncThunk(
  "/cart/deleteItem",
  async (dataRequest: DeleteItemRequest) => {
    try {
      const { data } = await cartService.deleteItem(dataRequest);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export default deleteItem;
