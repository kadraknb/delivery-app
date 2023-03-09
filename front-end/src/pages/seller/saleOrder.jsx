import React, { useEffect, useState } from 'react';

import { getSaleDetail, changeStateApiOrders } from '../../services/apiOrders';
import TableProducts from '../../components/TableProducts';
import NavBar from '../../components/NavBar';

function PersonSallerOrdersDetail() {
  const [seleOrders, setSeleOrders] = useState({});
  const [arrProducts, setArrProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const id = Number(global.location.pathname.replace('/seller/orders/', ''));

  const saveSaleDetail = async () => {
    const orders = await getSaleDetail(id);
    setArrProducts(orders);
    setSeleOrders(orders);
    setIsLoading(false);
  };

  const changeState = async (newStatus) => {
    await changeStateApiOrders(id, token, newStatus);
    await saveSaleDetail();
  };

  useEffect(() => {
    saveSaleDetail();
  }, []);

  const dataName = 'seller_order_details__element-order-details-label-delivery-status';
  return (
    <div>
      <NavBar />
      {!isLoading && (
        <div>
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
              data-testid={ dataName }
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
      )}
    </div>
  );
}

export default PersonSallerOrdersDetail;
