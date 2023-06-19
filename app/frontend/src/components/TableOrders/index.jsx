import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import DateOperations from '../../utils/dateOperations';
import iOrder from '../../images/icons/orderDashboard_order.svg';

function TableOrders({ arrayOrders, type }) {
  const orderStringLength = 5;
  const nav = useNavigate();

  return (
    <div className="flex gap-8 w-[1200px] flex-wrap">
      {arrayOrders.map((order) => (
        <div
          key={ type + order.id }
          onClick={ () => {
            nav(`/${type}/orders/${order.id}`);
          } }
          aria-hidden="true"
          className="w-[576px] h-72  border-4
          border-default_light_gray rounded-3xl flex justify-start"
        >
          <div
            data-testid={ `${type}_orders__element-delivery-status-${order.id}` }
            className="bg-default_black rounded-l-3xl w-1/4 flex items-center
            justify-center h-[102.5%] -left-1 -top-1 relative"
          >
            <span
              className="text-default_white text-4xl font-bold uppercase flex text-center
            -rotate-90"
            >
              {order.status}
            </span>
          </div>
          <div className="flex flex-col w-full pl-2 pt-2">
            <div
              data-testid={ `${type}_orders__element-order-id-${order.id}` }
              className="flex items-center "
            >
              <img src={ iOrder } alt="Order" className="w-10" />
              <span className="font-semibold text-default_black text-3xl">
                ORDER
                {' '}
                {String(order.id).padStart(orderStringLength, 0)}
              </span>
            </div>
            <div
              data-testid={ `${type}_orders__element-order-date-${order.id}` }
              className="px-1 font-medium text-default_dark_accent"
            >
              {DateOperations.formatDDMMYYYY(order.saleDate)}
              {type === 'seller' && (
                <div
                  data-testid={ `${type}_orders__element-card-address-${order.id}` }
                  className="text-default_dark_gray uppercase"
                >
                  {`${order.deliveryAddress}, ${order.deliveryNumber}`}
                </div>
              )}
            </div>
            <div
              data-testid={ `${type}_orders__element-card-price-${order.id}` }
              className="mt-20 flex flex-col items-center justify-center gap-2"
            >
              <span className="text-4xl font-semibold text-default_black">
                Total
              </span>
              <span className="text-5xl font-semibold text-default_black">
                R$
                {' '}
                {order.totalPrice.replace('.', ',')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

TableOrders.propTypes = {
  arrayOrders: PropTypes.arrayOf(),
}.isRequired;

export default TableOrders;
