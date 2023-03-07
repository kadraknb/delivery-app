export const formatOrdersDate = (orders) => {
  const INDEX_0 = 0;
  const INDEX_4 = 4;
  const INDEX_5 = 5;
  const INDEX_7 = 7;
  const INDEX_8 = 8;
  const INDEX_10 = 10;

  orders.forEach((order) => {
    const getDay = order.saleDate.substring(INDEX_8, INDEX_10);
    const getMonth = order.saleDate.substring(INDEX_5, INDEX_7);
    const getYear = order.saleDate.substring(INDEX_0, INDEX_4);
    order.saleDate = `${getDay}/${getMonth}/${getYear}`;
  });
};
