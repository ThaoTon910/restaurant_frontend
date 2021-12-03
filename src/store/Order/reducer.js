import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getOrderData,
  getOrderId,
  postPromoCode,
  getPaymentInfo,
} from "store/Order/selector";
import { logIn } from "store/auth/reducer";
import orderApi from "store/Order/api";
import { a } from "@aws-amplify/ui";

function getHash(str) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

export const submitOrder = createAsyncThunk(
  "order/submitOrder",
  async (_, { dispatch, getState }) => {
    const orderData = getOrderData(getState());
    const result = await orderApi.postOrder(orderData);
    return result;
  }
);

export const submitCashPaidOrder = createAsyncThunk(
  "order/submitCashPaidOrder",
  async (curentOrderId, { dispatch, getState }) => {
    const id = curentOrderId;
    const result = await orderApi.PayOrderByCash(id);
    // console.log("orderData.id", id);
    return result;
  }
);

export const submitPromoCode = createAsyncThunk(
  "order/submitPromoCode",
  async (_, { dispatch, getState }) => {
    const orderData = getOrderData(getState());
    //console.log("On code submit orderData:", orderData);
    const result = await orderApi.postPromoCode(orderData);
    // console.log(result);
    return result;
  }
);

export const fetchReceiptUrl = createAsyncThunk(
  "order/getReceiptUrl",
  async (_, { dispatch, getState }) => {
    const id = getOrderId(getState());
    let result;
    let counter = 0;
    do {
      result = await orderApi.getOrder(id);
      if (result && result.status === "PayByCash") return "";
      // console.log("id: ", id);
      // console.log(result);
      counter++;
    } while (
      (result === null || result.payment.receiptURL === null) &&
      counter < 10
    );

    return result.payment.receiptURL;
  }
);

const initialState = {
  customerInfo: {
    id: "",
    firstname: "",
    surname: "",
    email: "",
    phone: "",
  },
  paymentInfo: {
    clientSecret: "",
    cardInfo: {},
  },
  delivery: {
    pickup: {
      time: "",
      option: "now",
    },
    merchantId: "",
  },
  items: {},
  tipMultiplier: 0.1,
  taxMultiplier: 0.1,
  receiptUrl: "",
  id: "",
  promoCode: "",
  percent_off: 0.0,
};

export const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: {
      reducer: (state, action) => {
        const {
          orderKey,
          itemId,
          quantity,
          addonIds,
          specialInstruction,
          promoCode,
          imageUrl,
        } = action.payload;
        if (orderKey in state.items) {
          state.items[orderKey].quantity += quantity;
        } else {
          state.items[orderKey] = {
            itemId,
            quantity,
            addonIds,
            specialInstruction,
            imageUrl,
          };
        }
      },

      prepare: ({ item, quantity, addons, specialInstruction }) => {
        const orderKey = getHash(
          [item.id, specialInstruction, ...addons.concat().sort()].join()
        );
        return {
          payload: {
            orderKey,
            itemId: item.id,
            imageUrl: item.imageUrl,
            addonIds: addons,
            quantity,
            specialInstruction,
          },
        };
      },
    },

    changeQuantity: (state, action) => {
      const { orderKey, quantity } = action.payload;
      state.items[orderKey].quantity = parseInt(quantity);
    },

    removeOrderItem: (state, action) => {
      const { orderKey } = action.payload;
      delete state.items[orderKey];
    },
    setTip: (state, action) => {
      state.tipMultiplier = action.payload;
    },
    setID: (state, action) => {
      state.id = action.payload;
    },

    setCustomerInfo: (state, action) => {
      state.customerInfo = action.payload;
    },

    setCardInfo: (state, action) => {
      state.paymentInfo.cardInfo = action.payload;
    },
    setClientSecret: (state, action) => {
      state.paymentInfo.clientSecret = action.payload;
    },

    setPickupTime: (state, action) => {
      state.delivery.pickup.time = action.payload;
    },

    setPickupTimeOption: (state, action) => {
      state.delivery.pickup.option = action.payload;
    },

    setPromoCode: (state, action) => {
      state.promoCode = action.payload;
    },

    resetOrder: (state) => {
      state.customerInfo = initialState.customerInfo;
      state.items = initialState.items;
      state.delivery = initialState.delivery;
      state.paymentInfo = initialState.paymentInfo;
      state.id = initialState.id;
      state.percent_off = initialState.percent_off;
      state.promoCode = initialState.promoCode;
      state.taxMultiplier = initialState.taxMultiplier;
      state.tipMultiplier = initialState.tipMultiplier;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitOrder.fulfilled, (state, action) => {
      state.id = action.payload.id;
    });

    builder.addCase(fetchReceiptUrl.fulfilled, (state, action) => {
      state.receiptUrl = action.payload;
    });

    builder.addCase(logIn().type, (state, action) => {
      const { email, phone_number, sub } = action.payload.user.attributes;
      state.customerInfo.id = sub;
      state.customerInfo.email = email;
      state.customerInfo.phone = phone_number;
    });
    builder.addCase(submitPromoCode.fulfilled, (state, action) => {
      state.percent_off = action.payload.percent_off;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  resetOrder,
  addOrder,
  changeQuantity,
  removeOrderItem,
  setTip,
  setId,
  setCustomerInfo,
  setCardInfo,
  setClientSecret,
  setPickupTime,
  setPickupTimeOption,
  setPromoCode,
} = orderReducer.actions;

export default orderReducer.reducer;
