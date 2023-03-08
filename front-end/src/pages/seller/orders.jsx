import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TableOrders from '../../components/TableOrders';
import NavBar from '../../components/NavBar';
import { getOrders } from '../../services/apiOrders';
import LocalStorage from '../../utils/localStorage.utils';

function SellerOrders() {
  const nav = useNavigate();
  const [sellerOrders, setSellerOrders] = useState([]);

  useEffect(() => {
    try {
      const user = LocalStorage.getUser();

      if (!user) throw new Error('logged out user');

      const getOrdersOfApi = async () => {
        const data = await getOrders(user);
        setSellerOrders(data);
      };
      getOrdersOfApi();
    } catch (err) {
      console.error(err);
      nav('/login');
    }
  }, []);

  return (
    <div>
      <NavBar />
      <TableOrders
        arrayOrders={ sellerOrders }
        type="seller"
      />
    </div>
  );
}

export default SellerOrders;
