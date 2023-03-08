import React, { useEffect, useState } from 'react';

import { getSaleDetail, changeStateApiOrders } from '../../services/apiOrders';
import TableProducts from '../../components/TableProducts';
import NavBar from '../../components/NavBar';
import LocalStorage from '../../utils/localStorage.utils';

function PersonSallerOrdersDetail() {
  const [seleOrders, setSeleOrders] = useState({});
  const [arrProducts, setArrProducts] = useState([]);
  const id = Number(global.location.pathname.replace('/seller/orders/', ''));
  const token = LocalStorage.localGetToken();

  const saveSaleDetail = async () => {
    const orders = await getSaleDetail(id, token);
    setArrProducts(orders.itSold.map((obj) => ({ ...obj, ...obj.products })));
    setSeleOrders(orders);
  };

  const changeState = async (newStatus) => {
    await changeStateApiOrders(id, token, newStatus);
    await saveSaleDetail();
  };

  useEffect(() => {
    saveSaleDetail();
  }, []);

  console.log('🚀 ~ PersonSallerOrdersDetail ~ seleOrders', seleOrders);
  return (
    <div>
      <NavBar />
      <h3>Detalhe do Pedido</h3>
      <span>
        <p data-testid="seller_order_details__element-order-details-label-order-id">
          PEDIDO
          {' '}
          {seleOrders.id}
        </p>
        <p data-testid="seller_order_details__element-order-details-label-order-date">
          {new Date(seleOrders.saleDate).toLocaleDateString('pt-br')}
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          {seleOrders.status}
        </p>
        <button
          data-testid="seller_order_details__button-preparing-check"
          type="button"
          onClick={ () => changeState('Preparando') }
          disabled={ seleOrders.status !== 'Pendente' }
        >
          PREPARAR PEDIDO
        </button>
        <button
          data-testid="seller_order_details__button-dispatch-check"
          type="button"
          onClick={ () => changeState('Em Trânsito') }
          disabled={ seleOrders.status !== 'Preparando' }
        >
          Pendente
        </button>
      </span>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unitary Price</th>
            <th>Sub-Total</th>
          </tr>
        </thead>
        <tbody>
          <TableProducts array={ arrProducts } />
        </tbody>
      </table>
      <h1 data-testid="seller_order_details__element-order-total-price">
        {Number(seleOrders.totalPrice).toFixed(2).replace('.', ',')}
      </h1>
    </div>
  );
}

export default PersonSallerOrdersDetail;
