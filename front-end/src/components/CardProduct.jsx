import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function CardProduct({ urlImage, name, price, id, card, setCard }) {
  const [quantity, setQuantity] = useState(0);

  const createObjCard = (qty) => {
    const totalPrice = (price * qty).toFixed(2);
    const obj = { name, price, quantity: qty, totalPrice, id };
    if (qty > 0) {
      const existItem = card.find((item) => item.name === name);
      if (existItem) {
        const index = card.findIndex((item) => item.name === name);
        card.splice(index, 1);
      }
      return [...card, obj];
    }
  };

  const quantityLocalStorage = () => {
    const items = JSON.parse(localStorage.getItem('card'));
    if (items) {
      setCard(items);
      items.filter((obj) => obj.name === name).map((item) => setQuantity(item.quantity));
    }
  };

  const incrementItems = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    const data = createObjCard(newQty);
    setCard(data);
    localStorage.setItem('card', JSON.stringify(data));
  };

  const decrementItems = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      const data = createObjCard(newQty);
      if (data === undefined) {
        const removItem = card.filter((item) => item.name !== name);
        setCard(removItem);
        return localStorage.setItem('card', JSON.stringify(removItem));
      }
      setCard(data);
      localStorage.setItem('card', JSON.stringify(data));
    }
  };

  const handleChange = (e) => {
    const newQty = e.target.value;
    setQuantity(newQty);
    const data = createObjCard(newQty);
    if (data === undefined) {
      const removItem = card.filter((item) => item.name !== name);
      setCard(removItem);
      return localStorage.setItem('card', JSON.stringify(removItem));
    }
    setCard(data);
    localStorage.setItem('card', JSON.stringify(data));
  };

  useEffect(() => {
    quantityLocalStorage();
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
