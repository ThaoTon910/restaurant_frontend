import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import orderListApi from "store/OrderList/api";
import { submitOrder } from "store/Order/reducer";

export const getCustomerOrders = createAsyncThunk(
  "orderList/getCustomerOrders",
  async (id) => {
    const result = await orderListApi.getCustomerOrders(id);
    // console.log("getCustomerOrders", result);
    return result;
  }
);

export const orderListReducer = createSlice({
  name: "orderList",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });

    builder.addCase(getCustomerOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { addOrder } = orderListReducer.actions;

export default orderListReducer.reducer;
