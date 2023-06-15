import LocalStorage from './localStorage';

export default class MathOperations {
  static sumTotalPrices() {
    // Calculate the total price;
    const totalPrice = LocalStorage.getProductFromCart()
      .filter((item) => +item.quantity > 0)
      .reduce((acc, { price, quantity }) => acc + (price * quantity), 0);

    // Set the total price;
    // setTotalPrices(+totalPrice);
    return +totalPrice;
  }
}
