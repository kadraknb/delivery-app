import React from 'react';
import PropTypes from 'prop-types';

function TableProducts({ array, type }) {
  return (
    array.products.map((product, index) => (
      <tr key={ product.name }>
        <td
          data-testid={ `${type}__element-order-table-item-number-${index}` }
        >
          { index + 1 }
        </td>
        <td
          data-testid={ `${type}__element-order-table-name-${index}` }
        >
          { product.name }
        </td>
        <td
          data-testid={ `${type}__element-order-table-quantity-${index}` }
        >
          { product.SalesProducts.quantity }
        </td>
        <td
          data-testid={ `${type}__element-order-table-unit-price-${index}` }
        >
          { Number(product.price).toFixed(2).replace('.', ',') }
        </td>
        <td
          data-testid={ `${type}__element-order-table-sub-total-${index}` }
        >
          { (product.price * product.SalesProducts.quantity)
            .toFixed(2).replace('.', ',') }

        </td>
      </tr>
    ))
  );
}

TableProducts.propTypes = {
  array: PropTypes.arrayOf(),
}.isRequired;

export default TableProducts;
