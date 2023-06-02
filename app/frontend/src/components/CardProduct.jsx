import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { setObjCartInLocalStorage } from '../utils/createObjetoCart';

function CardProduct({ urlImage, name, price, id, card, setCard }) {
  const [quantity, setQuantity] = useState(0);
  const values = { setQuantity, name, price, card, setCard, id };

  const getQuantityLocalStorage = () => {
    const items = JSON.parse(localStorage.getItem('card'));
    if (items) {
      setCard(items);
      items.filter((obj) => obj.name === name).map((item) => setQuantity(item.quantity));
    }
  };

  const incrementItems = () => {
    const newQty = quantity + 1;
    setObjCartInLocalStorage(values, newQty);
  };

  const decrementItems = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setObjCartInLocalStorage(values, newQty);
    }
  };

  const handleChange = (e) => {
    const newQty = e.target.value;
    setObjCartInLocalStorage(values, newQty);
  };

  useEffect(() => {
    getQuantityLocalStorage();
  }, []);

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
        onClick={ decrementItems }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ handleChange }
        min={ 0 }
        value={ quantity }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ incrementItems }
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
