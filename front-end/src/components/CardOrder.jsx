import React from 'react';

function CardOrder({ id, status, saleDate, totalPrice }) {
  return (
    <div>
      <p
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        Pedido
        { id }
      </p>
      <p
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        { status }
      </p>
      <div>
        <p
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          { saleDate }
        </p>
        <p
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          { totalPrice }
        </p>
      </div>
    </div>
  );
}

export default CardOrder;
