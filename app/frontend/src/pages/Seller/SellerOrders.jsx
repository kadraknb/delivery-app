import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import TableOrders from '../../components/TableOrders';
import LocalStorage from '../../utils/localStorage';
import OrdersImage from '../../images/ordersImage.png';
import Api from '../../services/api';

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [user] = useState(LocalStorage.getUser());

  const retrieveOrders = async () => {
    const data = await Api.getSalesBySellerId();
    setOrders(data);
  };

  useEffect(() => { retrieveOrders(); }, []);

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
        <TableOrders arrayOrders={ orders } type={ user.role } />
      </div>
    </div>
  );
}

export default SellerOrders;
