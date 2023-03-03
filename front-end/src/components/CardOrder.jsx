import React from 'react';
import PropTypes from 'prop-types';

function CardOrder({ id, status, saleDate, totalPrice }) {
  return (
    <div>
      <button
        type="button"
        onClick={ () => navigate(`/customer/orders/${id}`) }
      >
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
      </button>
    </div>
  );
}

CardOrder.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  saleDate: PropTypes.instanceOf(Date),
  totalPrice: PropTypes.number,
}.isRequired;

export default CardOrder;
