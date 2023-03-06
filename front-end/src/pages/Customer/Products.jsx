import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import CardProduct from '../../components/CardProduct';
import NavBar from '../../components/NavBar';
import api from '../../services/axios';
import LocalStorage from '../../utils/localStorage.utils';

function Products() {
  const [dataProducts, setDataProducts] = useState([]);
  const [itsLoading, setLoading] = useState(true);
  const [cart, setCart] = useState(0);
  const [card, setCard] = useState([]);
  const nav = useNavigate();

  const getProductsOnDB = async () => {
    const authorization = LocalStorage.getToken();
    console.log(authorization);

    try {
      const { data } = await api.get('/customer/products', {
        headers: { authorization },
      });

      setDataProducts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      nav('/login');
    }
  };

  const getCartLocalStorage = () => {
    const soma = 0;
    const items = JSON.parse(localStorage.getItem('card'));
    if (items) {
      const totalPrice = items.reduce((acc, cur) => acc + Number(cur.totalPrice), soma);
      setCart(totalPrice.toFixed(2));
    }
  };

  useEffect(() => {
    getProductsOnDB();
    getCartLocalStorage();
  }, [card]);

  return (
    <div>
      <NavBar />
      {!itsLoading
        && dataProducts.map((product) => (
          <CardProduct
            key={ product.id }
            urlImage={ product.urlImage }
            id={ product.id }
            name={ product.name }
            price={ product.price }
            card={ card }
            setCard={ setCard }
          />
        ))}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ cart === 0 }
        onClick={ () => nav('/customer/checkout') }
      >
        Ver Carrinho: R$
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {String(cart).replace('.', ',')}
        </span>
      </button>
    </div>
  );
}

export default Products;
