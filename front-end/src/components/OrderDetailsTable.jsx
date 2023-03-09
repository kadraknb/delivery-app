import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function OrderDetailsTable({ array, type, removeProduct }) {
  console.log(array);
  let items;
  const genericArray = () => {
    if (array.includes('products')) {
      items = array.products;
      return items;
    }
    items = array;
    return items;
  };
  console.log(items);

  useEffect(() => {
    genericArray();
  }, []);

  return (
    items ? items.map((product, index) => (
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
        <td>
          <button
            data-testid={ `customer_checkout__element-order-table-remove-${index}` }
            type="button"
            onClick={ () => removeProduct(index) }
          >
            Remove
          </button>
        </td>
      </tr>
    )) : null
  );
}

OrderDetailsTable.propTypes = {
  array: PropTypes.arrayOf(),
}.isRequired;

export default OrderDetailsTable;
