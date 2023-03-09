import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function OrderDetailsTable({ array, type, removeProduct }) {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const genericArray = () => {
    const t = [array].includes('products');
    if (t) {
      setItems(array.products);
      return setIsLoading(false);
    }
    setItems(array);
    setIsLoading(false);
  };

  useEffect(() => {
    genericArray();
  }, [array]);

  return (
    !isLoading && items.map((product, index) => (
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
          { product.quantity ? product.quantity : product.SalesProducts.quantity }
        </td>
        <td
          data-testid={ `${type}__element-order-table-unit-price-${index}` }
        >
          { Number(product.price).toFixed(2).replace('.', ',') }
        </td>
        <td
          data-testid={ `${type}__element-order-table-sub-total-${index}` }
        >
          { product.quantity ? (product.price * product.quantity)
            .toFixed(2).replace('.', ',') : (
            product.price * product.SalesProducts.quantity)
            .toFixed(2).replace('.', ',')}
        </td>
        { product.quantity && (
          <td>
            <button
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              type="button"
              onClick={ () => removeProduct(index) }
            >
              Remove
            </button>
          </td>)}
      </tr>
    ))
  );
}

OrderDetailsTable.propTypes = {
  array: PropTypes.arrayOf(),
}.isRequired;

export default OrderDetailsTable;
