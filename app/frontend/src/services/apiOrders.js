import api from './api';

export const getOrders = async (id) => {
  const result = await api.get(`seller/orders/${id}`);

  return result.data;
};

export const getSaleDetail = async (id) => {
  const { data } = await api.get(`/sales/products/${id}`);

  return data;
};

export const changeStateApiOrders = async (id, status) => {
  await api.patch(
    `/sales/detail/${id}`,
    { status },
  );
};
