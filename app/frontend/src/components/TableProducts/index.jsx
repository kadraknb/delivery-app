import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context';
import LocalStorage from '../../utils/localStorage';
import MathOperations from '../../utils/mathOperations';
import iRemove from '../../images/icons/checkout_Remove.svg';

function TableProducts({ array, page, quantity, type }) {
  const { totalPricesGlobal, setTotalPricesGlobal } = useContext(Context);
  const [tableProducts, setTableProducts] = useState([]);
  const [updateCart, setUpdateCart] = useState(false);

  useEffect(() => {
    setTotalPricesGlobal(MathOperations.sumTotalPrices());
  }, [totalPricesGlobal]);

  useEffect(() => {
    if (page === 'checkout') {
      setTableProducts(LocalStorage.getProductFromCart()
        .filter((product) => product.quantity > 0));
      setUpdateCart(false);
    } else {
      setTableProducts(array);
    }
  }, [updateCart, page, array]);

  console.log('🚀 ~ TableProducts ~ tableProducts', tableProducts);
  useEffect(() => {
    console.log('NA PÁGINA', String(page).toUpperCase());
  }, []);

  const maxSizeNumberToRenderWithZero = 2;

  return (
    tableProducts.map((product, index) => (
      <tr
        key={ product.name + index + page }
        className="text-center border-b-[3px] h-14"
      >
        {/* ITEM */}
        <td
          className=""
          data-testid={ `${type}__element-order-table-item-number-${index}` }
        >
          {
            String(index + 1).padStart(maxSizeNumberToRenderWithZero, 0)
          }
        </td>
        {/* DESCRIÇÃO */}
        <td
          data-testid={ `${type}__element-order-table-name-${index}` }
        >
          { product.name }
        </td>
        {/* QUANTIDADE */}
        <td
          data-testid={ `${type}__element-order-table-quantity-${index}` }
        >
          { product.quantity
          || quantity.find((quant) => (quant.productId === product.id)).quantity }
        </td>
        {/* VALOR UNIT */}
        <td
          data-testid={ `${type}__element-order-table-unit-price-${index}` }
        >
          { `R$${Number(product.price).toFixed(2).replace('.', ',')}` }
        </td>
        {/* SUB TOTAL */}
        <td
          data-testid={ `${type}__element-order-table-sub-total-${index}` }
        >
          { `R$${Number(product.price * (product.quantity
          || quantity.find((quant) => quant.productId === product.id).quantity))
            .toFixed(2).replace('.', ',')}` }

        </td>
        {/* REMOVER */}
        {page === 'checkout'
        && (
          <td
            data-testid={ `${type}__element-order-table-remove-${index}` }
          >
            <button
              className="relative top-1"
              type="button"
              onClick={ () => {
                LocalStorage.removeProductFromCart(product);
                setTotalPricesGlobal(
                  totalPricesGlobal - (product.price * product.quantity),
                );
                setUpdateCart(true);
              } }
            >
              <img src={ iRemove } alt="Remove" />
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
