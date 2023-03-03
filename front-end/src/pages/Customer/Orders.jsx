import React, { useState, useEffect } from 'react';

import NavBar from '../../components/NavBar';
import api from '../../services/axios';

function Orders() {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllSales = async () => {
    try {
      const { data } = await api.get('/customer/orders');

      setSalesData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllSales();
  }, []);

  return (
    <div>
      <NavBar />
    </div>
  );
}

export default Orders;
