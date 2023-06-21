import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import CartButton from '../../components/Common/CartButton';
import CardProduct from '../../components/CardProduct';
import NavBar from '../../components/NavBar';
import Api from '../../services/api';
import LocalStorage from '../../utils/localStorage';
import imageProducts from '../../images/productsImage.png';

function Products() {
  const [dataProducts, setDataProducts] = useState([]);
  const [localStorageProducts, setLocalStorageProducts] = useState([]);
  const [createCart, setCreateCart] = useState(false);
  const nav = useNavigate();

  const getProductsOnLocalStorage = async () => {
    const products = await LocalStorage.getProductFromCart();

    setLocalStorageProducts(products);
  };

  const getProducts = async () => {
    const authorization = LocalStorage.getToken();

    try {
      const data = await Api.getProducts(authorization);
      if (typeof data !== 'object') {
        throw new Error('Não foi possível carregar os produtos!');
      }
      setDataProducts(data);
      setCreateCart(true);
    } catch (err) {
      console.error(err);
      nav('/login');
    }
  };

  const retrievePersistentQuantity = (product) => {
    const findOnLocal = localStorageProducts.find((item) => item.id === product.id);

    if (localStorageProducts.length && findOnLocal) {
      return findOnLocal.quantity;
    }

    return 0;
  };

  useEffect(() => {
    getProducts();
    getProductsOnLocalStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full flex flex-col select-none">
      <NavBar type="main" />

      <img
        src={ imageProducts }
        alt="Products"
        className="w-80 self-center pb-10 pt-12 pointer-events-none
      select-none"
      />

      <div
        className="flex items-center self-center gap-8 flex-wrap
        justify-between w-[1200px] h-full after:pr-[268px] mb-32"
      >
        {dataProducts.map((product) => (
          <CardProduct
            key={ product.id }
            urlImage={ product.urlImage }
            persistentQuantity={ retrievePersistentQuantity(product) }
            id={ product.id }
            name={ product.name }
            price={ product.price }
            createCart={ createCart }
          />
        ))}
      </div>

      <CartButton />
    </div>
  );
}

export default Products;
