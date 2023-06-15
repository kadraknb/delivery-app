import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OrderCard from '../../components/OrderCard';
import NavBar from '../../components/NavBar';
import { getOrders } from '../../services/apiOrders';
import formatOrdersDate from '../../utils/formatOrdersData';
import OrdersImage from '../../images/ordersImage.png';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <NavBar type="main" />
      <img
        src={ OrdersImage }
        alt="Orders"
        className="w-[26rem] self-center
      pb-10 pt-14 pointer-events-none select-none"
      />
      {/* <OrderCard arrayOrders={sellerOrders} type="seller" /> */}
      <div className="flex justify-center">
        <OrderCard arrayOrders={ sellerOrders } type="seller" />
      </div>
    </div>
  );
}

export default SellerOrders;
