import api from './axios';

const getOrders = async (id) => {
  const result = await api.get(`seller/orders/${id}`);

  return result.data;
};

const getSaleDetail = async (id) => {
  const { data } = await api.get(`/sales/products/${id}`);

  return data;
};

const changeStateApiOrders = async (id, token, newStatus) => {
  await api.put(
    `/sales/detail/${id}`,
    { newStatus },
    { headers: { Authorization: token } },
  );
};

export { getOrders, getSaleDetail, changeStateApiOrders };
