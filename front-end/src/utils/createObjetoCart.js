const createObjCart = (valuesCart) => {
  const { id, name, price, card, newQty } = valuesCart;
  const totalPrice = (price * newQty).toFixed(2);
  const obj = { id, name, price, quantity: newQty, totalPrice };
  if (newQty > 0) {
    const existItem = card.find((item) => item.name === name);
    if (existItem) {
      const index = card.findIndex((item) => item.name === name);
      card.splice(index, 1);
    }
    return [...card, obj];
  }
};

const removeObjCart = (name, card, setCard) => {
  const removItem = card.filter((item) => item.name !== name);
  setCard(removItem);
  return localStorage.setItem('card', JSON.stringify(removItem));
};

const setObjCartInLocalStorage = (values, newQty) => {
  const { id, setQuantity, name, price, card, setCard } = values;
  setQuantity(Number(newQty));
  const valuesCart = { name, price, newQty, card, id };
  const data = createObjCart(valuesCart);

  if (data === undefined) {
    return removeObjCart(name, card, setCard);
  }

  setCard(data);
  localStorage.setItem('card', JSON.stringify(data));
};

export { createObjCart, removeObjCart, setObjCartInLocalStorage };
