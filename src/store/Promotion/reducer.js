import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import promotionApi from "store/Promotion/api";

export const getPromotion = createAsyncThunk(
  "promotion/getPromotion",
  async () => {
    const result = await promotionApi.getPromotion();
    // console.log("REDUCER API", result);
    return result;
  }
);

export const promotionReducer = createSlice({
  name: "promotion",
  initialState: {
    loading: false,
    promotions: [],
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPromotion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPromotion.fulfilled, (state, action) => {
      state.promotions = action.payload;
    });
  },
});

export default promotionReducer.reducer;
