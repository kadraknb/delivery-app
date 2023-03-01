import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CardProduct({ urlImage, name, price, id }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        width={ 100 }
        alt="Product"
      />
      <h2
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </h2>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </p>
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ () => 'add função' }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ () => 'add função' }
        min={ 0 }
        value={ quantity }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ () => 'add função' }
      >
        +
      </button>
    </div>
  );
}

CardProduct.propTypes = {
  urlImage: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number,
}.isRequired;

export default CardProduct;
