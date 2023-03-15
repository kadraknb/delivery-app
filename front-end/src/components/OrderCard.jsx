import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function OrderCard({ arrayOrders, type }) {
  const nav = useNavigate();

  return (
    <div>
      {
        arrayOrders.map(({ id, status, saleDate, totalPrice, deliveryAddress,
          deliveryNumber }) => (
          (
            <div
              data-testid="div click"
              key={ type + id }
              onClick={ () => {
                nav(`/${type}/orders/${id}`);
              } }
              aria-hidden="true"
            >
              <div data-testid={ `${type}_orders__element-order-id-${id}` }>
                {id}
              </div>
              <div
                data-testid={ `${type}_orders__element-delivery-status-${id}` }
              >
                {status}
              </div>
              <div data-testid={ `${type}_orders__element-order-date-${id}` }>
                {saleDate}
              </div>
              <div data-testid={ `${type}_orders__element-card-price-${id}` }>
                {totalPrice.replace('.', ',')}
              </div>
              {type === 'seller' && (
                <div data-testid={ `${type}_orders__element-card-address-${id}` }>
                  {`${deliveryAddress}, ${deliveryNumber}`}
                </div>
              )}
            </div>
          )))
      }
    </div>
  );
}

OrderCard.propTypes = {
  arrayOrders: PropTypes.arrayOf(),
}.isRequired;

export default OrderCard;
