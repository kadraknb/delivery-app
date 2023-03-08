import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function TableProducts({ array, page, quantity, type }) {
  // const {} = useContext(Context);
  const [tableProducts, setTableProducts] = useState([]);
  const [updateCart, setUpdateCart] = useState(false);

  useEffect(() => {
    if (page === 'checkout') {
      // VVVVVVVVVV
      // setTableProducts([].filter((product) => product.quantity > 0));
      setUpdateCart(false);
    } else {
      setTableProducts(array);
    }
  }, [updateCart, page, array]);

  useEffect(() => {
    console.log('NA PÁGINA', String(page).toUpperCase());
  }, []);

  return (
    tableProducts.map((product, index) => (
      <tr key={ product.name + index + page }>
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
          { product.quantity
          || quantity.find((quant) => quant.productId === product.id).quantity }
        </td>
        <td
          data-testid={ `${type}__element-order-table-unit-price-${index}` }
        >
          { `R$${Number(product.price).toFixed(2).replace('.', ',')}` }
        </td>
        <td
          data-testid={ `${type}__element-order-table-sub-total-${index}` }
        >
          { `R$${Number(product.price * (product.quantity
          || quantity.find((quant) => quant.productId === product.id).quantity))
            .toFixed(2).replace('.', ',')}` }

        </td>
        {page === 'checkout'
        && (
          <td
            data-testid={ `${type}__element-order-table-remove-${index}` }
          >
            <button
              type="button"
              onClick={ () => {
                LocalStorage.localRemoveProductFromCart(product);
                setTotalPricesGlobal(
                  totalPricesGlobal - (product.price * product.quantity),
                );
                setUpdateCart(true);
              } }
            >
              Remover
            </button>
          </td>
        )}
      </tr>
    ))
  );
}

TableProducts.propTypes = {
  array: PropTypes.arrayOf(),
}.isRequired;

export default TableProducts;
