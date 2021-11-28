import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import merchantApi from "store/Merchant/api";

export const getMerchant = createAsyncThunk(
  "merchant/getMerchant",
  async () => {
    const result = await merchantApi.getMerchant();
    return result;
  }
);

export const merchantReducer = createSlice({
  name: "merchant",
  initialState: {
    loading: false,
    phone: "",
    id: "",
    name: "",
    hours: [],
    address: "",
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMerchant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMerchant.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.hours = action.payload.hours;
      state.name = action.payload.name;
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { getMerchant } = merchantReducer.actions

export default merchantReducer.reducer;
