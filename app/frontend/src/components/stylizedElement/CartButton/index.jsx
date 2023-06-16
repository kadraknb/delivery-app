import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Context } from '../../../context';
import MathOperations from '../../../utils/mathOperations';
import iCart from '../../../images/icons/cartButton_cart.svg';

function CartButton() {
  const nav = useNavigate();
  const { quantityGlobal, setTotalPricesGlobal, totalPricesGlobal } = useContext(Context);

  useEffect(() => setTotalPricesGlobal(MathOperations.sumTotalPrices()), []);

  useEffect(
    () => setTotalPricesGlobal(MathOperations.sumTotalPrices()),
    [quantityGlobal],
  );

  return (
    <button
      type="button"
      className="fixed flex justify-between
      items-center bottom-6 right-6 bg-default_black
      disabled:bg-default_dark_gray h-16 w-fit rounded-lg"
      data-testid="customer_products__button-cart"
      onClick={ () => nav('/customer/checkout') }
      disabled={ totalPricesGlobal <= 0 }
    >
      <span
        className="pl-4 text-xl text-default_white whitespace-nowrap font-semibold"
        data-testid="customer_products__checkout-bottom-value"
      >
        R$
        {' '}
        { totalPricesGlobal.toFixed(2).replace('.', ',') }
      </span>
      <img className="px-4" src={ iCart } alt="Cart" />
    </button>
  );
}

export default CartButton;
