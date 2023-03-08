import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import NavBar from '../../components/NavBar';
import api from '../../services/axios';
// import formatOrdersData from '../../utils/formatOrdersData';

// import PropTypes from 'prop-types';

function OrdersDatails() {
  const pathLocation = useLocation();
  const i = -1;
  const saleId = pathLocation.pathname.slice(i);
  const [saleData, setSaleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllSalesProducts = async () => {
    try {
      const { data } = await api.get(`/sales/products/${saleId}`);

      setIsLoading(false);

      // formatOrdersDate(data);
      // formatOrdersTotalPrice(data);

      setSaleData(data);
      console.log('testes', data);
      console.log('te', data.products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllSalesProducts();
  }, []);

  return (
    <div>
      <NavBar />
      {!isLoading && (
        <div>
          <h1
            data-testid="customer_order_details__element-order-details-label-order-id"
            width={ 277 }
          >
            PEDIDO:
            { saleData.id }
          </h1>
          <h1
            data-testid="customer_order_details__element-order-details-label-seller-name"
            width={ 277 }
          >
            P.Vend: Fulana Pereira
          </h1>
          <h1
            data-testid="customer_order_details__element-order-details-label-order-date" // data do pedido nescessaria
            width={ 216 } // arrumar a DATA
          >
            DATA DO PEDIDO: 06/12/2012
          </h1>
          <h1
            data-
            testid="customer_order_details__element-order-details-label-delivery-status"
            width={ 216 }
          >
            { saleData.status }
          </h1>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check" // botão de preparação de pedido
            width={ 332 }
            onClick={ () => 'add função' }
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
              {saleData.products.map((row, index) => (
                <tr key={ index }>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-item-number-${index}`
                    }
                  >
                    { index + 1 }
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-name-${index}`
                    }
                  >
                    { row.name }
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    { row.SalesProducts.quantity }
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    { row.price }
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    { (row.price * row.SalesProducts.quantity)
                      .toFixed(2).replace('.', ',') }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4
            data-testid="customer_order_details__element-order-total-price"
          >
            TOTAL :
            { saleData.totalPrice }
          </h4>
        </div>
      )}

    </div>
  );
}

export default OrdersDatails;
