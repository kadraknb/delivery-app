import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import NavBar from '../../components/NavBar';
import api from '../../services/api';
import { formatOrdersDate } from '../../utils/formatOrdersData';
import { changeStateApiOrders } from '../../services/apiOrders';
import OrderDetailsTable from '../../components/OrderDetailsTable';

function OrderDetails() {
  const pathLocation = useLocation();
  const i = -1;
  const saleId = pathLocation.pathname.slice(i);
  const [saleData, setSaleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllSalesProducts = async () => {
    try {
      const { data } = await api.get(`/sales/products/${saleId}`);
      formatOrdersDate([data]);
      setSaleData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const changeState = async (newStatus) => {
    await changeStateApiOrders(saleId, newStatus);
    await getAllSalesProducts();
  };

  useEffect(() => {
    getAllSalesProducts();
  }, []);

  const nameTest = 'customer_order_details__element-order-details-label-delivery-status';

  return (
    <div>
      <NavBar />
      {!isLoading && (
        <div>
          <h1
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            PEDIDO:
            { saleData.id }
          </h1>
          <h1
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            P.Vend: Fulana Pereira
          </h1>
          <p>
            DATA DO PEDIDO:
            <span
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {saleData.saleDate}
            </span>
          </p>
          <h1
            data-testid={ nameTest }
          >
            { saleData.status }
          </h1>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check" // botão de preparação de pedido
            disabled={ saleData.status !== 'Em Trânsito' }
            onClick={ () => changeState('Entregue') }
          >
            MARCAR COMO ENTREGUE
          </button>
          <table>
            <thead>
              Detalhe do Pedido
              <tr>
                <th>Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitario</th>
                <th>Sub-total</th>
              </tr>
            </thead>
            <tbody>
              <OrderDetailsTable
                type="customer_order_details"
                array={ saleData }
              />
            </tbody>
          </table>
          <h4>
            TOTAL :
            <span
              data-testid="customer_order_details__element-order-total-price"
            >
              { saleData.totalPrice.replace('.', ',') }
            </span>
          </h4>
        </div>
      )}

    </div>
  );
}

export default OrderDetails;
