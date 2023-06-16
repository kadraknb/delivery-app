/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context';
import LocalStorage from '../../utils/localStorage';
import MathOperations from '../../utils/mathOperations';
import iRemove from '../../images/icons/checkout_Remove.svg';

function TableProducts({ array, page, type }) {
  const { totalPricesGlobal, setTotalPricesGlobal } = useContext(Context);
  const [tableProducts, setTableProducts] = useState([]);
  const [updateCart, setUpdateCart] = useState(false);
  const maxSizeNumberToRenderWithZero = 2;

  useEffect(() => {
    setTotalPricesGlobal(MathOperations.sumTotalPrices());
  }, [totalPricesGlobal]);

  useEffect(() => {
    if (page === 'checkout') {
      setTableProducts(
        LocalStorage.getProductFromCart().filter(
          (product) => product.quantity > 0,
        ),
      );
      setUpdateCart(false);
    } else {
      setTableProducts(array);
    }
  }, [updateCart, page, array]);

  return tableProducts.map((product, index) => (
    <tr
      key={ product.name + product.id }
      className="text-center border-b-[3px] h-14"
    >
      <td
        className=""
        data-testid={ `${type}__element-order-table-item-number-${index}` }
      >
        {String(index + 1).padStart(maxSizeNumberToRenderWithZero, 0)}
      </td>
      <td data-testid={ `${type}__element-order-table-name-${index}` }>
        {product.name}
      </td>
      <td data-testid={ `${type}__element-order-table-quantity-${index}` }>
        {product.quantity}
      </td>
      <td data-testid={ `${type}__element-order-table-unit-price-${index}` }>
        {`R$${Number(product.price).toFixed(2).replace('.', ',')}`}
      </td>
      <td data-testid={ `${type}__element-order-table-sub-total-${index}` }>
        {`R$${Number(product.price * product.quantity)
          .toFixed(2)
          .replace('.', ',')}`}
      </td>
      {page === 'checkout' && (
        <td data-testid={ `${type}__element-order-table-remove-${index}` }>
          <button
            className="relative top-1"
            type="button"
            onClick={ () => {
              LocalStorage.removeProductFromCart(product);
              setTotalPricesGlobal(
                totalPricesGlobal - product.price * product.quantity,
              );
              setUpdateCart(true);
            } }
          >
            <img src={ iRemove } alt="Remove" />
          </button>
        </td>
      )}
    </tr>
  ));
}

TableProducts.propTypes = {
  array: PropTypes.arrayOf(),
}.isRequired;

export default TableProducts;
