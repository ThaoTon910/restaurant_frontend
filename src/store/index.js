import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "store/auth/reducer";
import orderReducer from "store/Order/reducer";
import foodMenuReducer from "store/FoodMenu/reducer";
import merchantReducer from "store/Merchant/reducer";
import orderListReducer from "store/OrderList/reducer";
import promotionReducer from "store/Promotion/reducer";

const persistConfig = {
  key: "root",
  storage,
};

const baseReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  foodMenu: foodMenuReducer,
  merchant: merchantReducer,
  orderList: orderListReducer,
  promotion: promotionReducer,
});

const persistedRedcer = persistReducer(persistConfig, baseReducer);

export default configureStore({
  reducer: persistedRedcer,
});
