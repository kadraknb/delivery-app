import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import CardProduct from '../../components/CardProduct';
import NavBar from '../../components/NavBar';
import api from '../../services/axios';
import LocalStorage from '../../utils/localStorage.utils';

function Products() {
  const [dataProducts, setDataProducts] = useState([]);
  const [itsLoading, setLoading] = useState(true);
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

  useEffect(() => {
    getProductsOnDB();
  }, []);

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
          />
        ))}
    </div>
  );
}

export default Products;
