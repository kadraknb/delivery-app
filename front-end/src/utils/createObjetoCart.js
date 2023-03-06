const createObjCart = (name, price, qty, card) => {
  const totalPrice = (price * qty).toFixed(2);
  const obj = { name, price, quantity: qty, totalPrice };
  if (qty > 0) {
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
  const { setQuantity, name, price, card, setCard } = values;
  setQuantity(Number(newQty));
  const data = createObjCart(name, price, newQty, card);

  if (data === undefined) {
    return removeObjCart(name, card, setCard);
  }

  setCard(data);
  localStorage.setItem('card', JSON.stringify(data));
};

export { createObjCart, removeObjCart, setObjCartInLocalStorage };
