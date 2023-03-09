import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TableOrders from '../../components/TableOrders';
import NavBar from '../../components/NavBar';
import { getOrders } from '../../services/apiOrders';
import { formatOrdersDate } from '../../utils/formatOrdersData';

function SellerOrders() {
  const nav = useNavigate();
  const [sellerOrders, setSellerOrders] = useState([]);
  const id = localStorage.getItem('userId');

  useEffect(() => {
    try {
      const getOrdersOfApi = async () => {
        const data = await getOrders(id);
        formatOrdersDate(data);
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
