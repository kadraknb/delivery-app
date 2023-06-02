import api from './api';

const getOrders = async (id) => {
  const result = await api.get(`seller/orders/${id}`);

  return result.data;
};

const getSaleDetail = async (id) => {
  const { data } = await api.get(`/sales/products/${id}`);

  return data;
};

const changeStateApiOrders = async (id, status) => {
  await api.patch(
    `/sales/detail/${id}`,
    { status },
  );
};

export { getOrders, getSaleDetail, changeStateApiOrders };
