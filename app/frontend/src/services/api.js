import axios from 'axios';
import LocalStorage from '../utils/localStorage';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

const authorization = LocalStorage.getToken();
const userId = LocalStorage.getUserID();

export default class Api {
  // static get = async () => {
  //   try {
  //     const { data } = await api.;
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  static login = async (email, password) => {
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  static getAdm = async () => {
    try {
      const { data } = await api.get('admin/manage');
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  static postAdm = async ({
    name,
    email,
    password,
    role,
  }) => {
    await api.post('/admin/manage', {
      name,
      email,
      password,
      role,
    }, { headers: { authorization } });
  };

  static postRegister = async ({ name, email, password }) => {
    const response = await api.post('/register', {
      name,
      email,
      password,
    });
    return response;
  };

  static getAllSeller = async () => {
    try {
      const { data } = await api.get('/seller');
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  static getSellerBySellerId = async (sellerId) => {
    try {
      const { data } = await api.get('/seller');

      return data.find((i) => i.id === sellerId).name;
    } catch (error) {
      console.error(error);
    }
  };

  static getSalesByUserId = async () => {
    try {
      const { data } = await api.get(`/customer/orders/${userId}`);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  static getProducts = async () => {
    try {
      const { data } = await api.get(
        '/customer/products',
        { headers: { authorization } },
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  static postOrder = async (order) => {
    try {
      const { data } = await api.post('/sales', order, {
        headers: { authorization },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  static getSalesById = async (id) => {
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
