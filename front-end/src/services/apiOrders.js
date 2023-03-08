import api from './axios';

const getOrders = async ({ email, token }) => {
  const result = await api.get('/sales', {
    headers: { Authorization: token },
    params: { email },
  });

  return result.data;
};

const getSaleDetail = async (id, token) => {
  const { data } = await api.get('/sales/detail', {
    headers: { Authorization: token },
    params: { id },
  });

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
