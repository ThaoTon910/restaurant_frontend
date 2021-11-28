import api, { apiGetOrders } from "store/api";

export const getCustomerOrders = async (id) => {
  const resp = await apiGetOrders.get("/order");
  if (resp.status !== 200) {
    return [];
  } else {
    return resp.data.filter((order) => order.customer.id === id);
  }
};

export default { getCustomerOrders };
