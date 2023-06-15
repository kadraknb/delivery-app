import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import LocalStorage from '../utils/localStorage';
import { Context } from '../context';

function CardProduct({ urlImage, name, price, id, createCart, persistentQuantity }) {
  const { setQuantityGlobal, quantityGlobal } = useContext(Context);
  const [quantity, setQuantity] = useState(0);
  const [operator, setOperator] = useState('');

  const handleMinQuantity = (type) => {
    if (type === 0 && quantity > 0) {
      setOperator('-');
      setQuantity(+quantity - 1);
      return;
    }
    if (type === 1) {
      setOperator('+');
      setQuantity(+quantity + 1);
    }
  };

  useEffect(() => {
    setQuantity(persistentQuantity);
  }, []);

  useEffect(() => {
    if (createCart) {
      LocalStorage
        .setProductIntoCart({ id, name, price, urlImage, quantity }, operator);
    }
    setQuantityGlobal(quantityGlobal + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  return (
    <div
      className="card-product rounded-2xl border-2 border-default_light_gray
    w-[270px] h-[450px] flex flex-col items-center justify-between"
    >
      <div
        className="w-full h-60 flex justify-center items-center mt-2
      bg-default_white rounded-2xl"
      >
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          className="h-48"
          alt="Product"
        />
      </div>

      <div
        className="bg-default_black h-48 w-full flex
      flex-col justify-between rounded-b-2xl"
      >
        <h2
          data-testid={ `customer_products__element-card-title-${id}` }
          className="text-default_white text-xl font-medium
          h-18 w-full break-words py-2 px-3"
        >
          { name }
        </h2>

        <div className="h-28 w-full flex flex-col justify-between items-end">
          <p
            className="font-bold text-default_dark_accent pr-4"
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            R$
            {' '}
            { price.replace('.', ',') }
          </p>

          <div
            className="flex justify-center items-center w-2/4 h-2/5 mb-4 self-center
            rounded-lg border-2"
          >
            <button
              className="w-1/3 h-full text-white text-3xl text-center"
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              onClick={ () => handleMinQuantity(0) }
            >
              -
            </button>

            <input
              type="number"
              className="w-1/3 h-full text-center appearance-none text-2xl
              text-default_white font-bold bg-transparent outline-none"
              data-testid={ `customer_products__input-card-quantity-${id}` }
              onChange={ ({ target: { value } }) => {
                setOperator('');
                setQuantity(+value);
              } }
              min={ 0 }
              value={ quantity }
            />

            <button
              className="w-1/3 h-full text-white text-3xl text-center"
              type="button"
              data-testid={ `customer_products__button-card-add-item-${id}` }
              onClick={ () => handleMinQuantity(1) }
            >
              +
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  img: PropTypes.string,
  productName: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number,
  operator: PropTypes.string,
}.isRequired;

export default CardProduct;
