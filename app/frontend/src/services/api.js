import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

export default class Api {
  // static get = async () => {
  //   try {
  //     const { data } = await api.;
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  static getAllSeller = async () => {
    try {
      const { data } = await api.get('/seller');
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  static getSellerById = async (sellerId) => {
    try {
      const { data } = await api.get('/seller');

      return data.find((i) => i.id === sellerId).name;
    } catch (error) {
      console.error(error);
    }
  };

  static getSalesProductsById = async (id) => {
    try {
      const { data: { products, ...order } } = await api.get(`/sales/products/${id}`);

      const productsDestructuring = products
        .map(({ SalesProducts, ...rest }) => ({ ...rest, ...SalesProducts }));

      return { products: productsDestructuring, order };
    } catch (error) {
      console.error(error);
    }
  };

  static changeStateOrders = async (id, status) => {
    try {
      const OK = 204;

      const data = await api.patch(
        `/sales/detail/${id}`,
        { status },
      );
      return data.status === OK;
    } catch (error) {
      console.error(error);
    }
  };
}
