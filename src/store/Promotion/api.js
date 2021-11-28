import api from "store/api";

export const getPromotion = async () => {
  const resp = await api.get("/promotion");
  return resp.data;
};

export default { getPromotion };
