import api from "store/api";

export const getMerchant = async () => {
  const resp = await api.get("/merchant");
  return resp.data;
};

export const postOrder = async (orderData) => {
  const resp = await api.post("/order", orderData);
  return resp.data;
};

export const PayOrderByCash = async (id) => {
  const status = "PayByCash";
  const resp = await api.put(`/order/${id}`, { status: status });
  // console.log(resp.data);
  return resp.data;
};

export const getOrder = async (id) => {
  const resp = await api.get(`/order/${id}`);

  return resp.data;
};

export const getCustomerOrders = async (id) => {
  const resp = await api.get("/order");
  console.log(resp);
  console.log(id);
  if (resp.status !== 200) {
    return [];
  } else {
    return resp.data.filter((order) => order.customer.id === id);
  }
};

export const postPromoCode = async (orderData) => {
  // console.log("Promocode API return BEGIN: ");

  const resp = await api.post("/order/promocode", orderData);
  //console.log("Promocode API return: ", resp);
  return resp.data;
};

export default {
  postOrder,
  getMerchant,
  getOrder,
  postPromoCode,
  PayOrderByCash,
};
