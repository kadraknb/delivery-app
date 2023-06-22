import React, { useState, useEffect } from 'react';

import NavBar from '../../components/NavBar';
import OrderCard from '../../components/TableOrders';
import Api from '../../services/api';
import dateOperations from '../../utils/dateOperations';
import LocalStorage from '../../utils/localStorage';
import OrdersImage from '../../images/ordersImage.png';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const user = LocalStorage.getUser();

  const getAllSales = async () => {
    try {
      const data = await Api.getSalesByUserId(user.id);
      console.log('🚀 ~ getAllSales ~ data:', data);
      dateOperations.formatDDMMYYYY(data);

      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { getAllSales(); }, []);

  return (
    <div className="flex flex-col">
      <NavBar type="main" />
      <img
        src={ OrdersImage }
        alt="Orders"
        className="w-[26rem] self-center
      pb-10 pt-14 pointer-events-none select-none"
      />
      <div className="flex justify-center">
        <OrderCard arrayOrders={ orders } type={ user.role } />
      </div>
    </div>
  );
}

export default CustomerOrders;
