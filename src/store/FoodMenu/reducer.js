import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import foodMenuApi from "store/FoodMenu/api";
import { isMobile } from "react-device-detect";

export const fetchCategories = createAsyncThunk(
  "foodmenu/fetchCategories",
  foodMenuApi.fetchCategories
);

export const fetchFoodMenuItems = createAsyncThunk(
  "foodmenu/fetchFoodMenuItems",
  foodMenuApi.fetchFoodMenuItems
);

export const fetchMenu = createAsyncThunk(
  "foodmenu/fetchMenu",
  foodMenuApi.fetchMenu
);

export const foodMenuReducer = createSlice({
  name: "foodmenu",
  initialState: {
    loading: true,
    displayingItem: null,
    categoryIndex: 0,
    showCategory: false,
    categories: [],
    addonGroups: [],
    items: [],
  },
  reducers: {
    displayItem: (state, action) => {
      state.displayingItem = action.payload;
    },

    hideItem: (state) => {
      state.displayingItem = null;
    },
    setCategoryMenu: (state, action) => {
      state.showCategory = action.payload;
    },

    setCategoryIndex: (state, action) => {
      const newIndex = action.payload;
      if (
        Number.isInteger(newIndex) &&
        newIndex < state.categories.length &&
        newIndex >= 0
      ) {
        state.categoryIndex = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMenu.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
      state.addonGroups = action.payload.addonGroups;
    });
  },
});

// Action creators are generated for each case reducer function
export const { displayItem, hideItem, setCategoryIndex, setCategoryMenu } =
  foodMenuReducer.actions;

export default foodMenuReducer.reducer;
