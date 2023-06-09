import React, { useState, useEffect } from 'react';

import NavBar from '../../components/NavBar';
import OrderCard from '../../components/OrderCard';
import api from '../../services/api';
import formatOrdersDate from '../../utils/formatOrdersData';

function CustomerOrders() {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const id = localStorage.getItem('userId');

  const getAllSales = async () => {
    try {
      const { data } = await api.get(`/customer/orders/${id}`);
      formatOrdersDate(data);

      setSalesData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllSales();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar type="main" />
      {!isLoading
        && <OrderCard
          arrayOrders={ salesData }
          type="customer"
        />}
    </>
  );
}

export default CustomerOrders;
