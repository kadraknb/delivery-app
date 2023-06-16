export default class LocalStorage {
  static setLogin = async ({ name, email, role, token, id }) => {
    // Saves the user data fetched on LOGIN into the LocalStorage;
    localStorage.setItem('user', JSON.stringify({ name, email, role, token }));

    localStorage.setItem('userId', JSON.stringify(id));
  };

  static logOut = async () => {
    localStorage.clear();
  };

  static getUser = () => {
    const data = localStorage.getItem('user');

    if (!data) {
      return null;
    }

    const { id, name, email, role } = JSON.parse(data);

    return { id, name, email, role };
  };

  static getToken = () => {
    // Checks the user data saved on the LocalStorage;
    const data = localStorage.getItem('user');

    if (!data) {
      return null;
    }

    const { token } = JSON.parse(data);

    return token;
  };

  static getUserID = () => {
    const data = localStorage.getItem('userId');

    if (!data) {
      return null;
    }

    return data;
  };

  static checkOperator(operator, itemQuantity) {
    const operators = {
      '-': () => itemQuantity - 1,
      '+': () => itemQuantity + 1,
    };

    return operators[operator]();
  }

  static setProductIntoCart = (object, operator) => {
    // Array that will receive updated products
    let newCart = [];
    // Array of products the localStorage
    const cart = localStorage.getItem('cart');

    if (cart) {
      const array = JSON.parse(cart);

      // Inserting product into cart the localStorage with the new quantity
      if (array.some(({ id }) => id === object.id)) {
        newCart = array.map((item) => {
          if (item.id === object.id) {
            return {
              ...item,
              // Return the new correct quantity
              quantity: operator
                ? LocalStorage.checkOperator(operator, item.quantity)
                : object.quantity,
            };
          }
          return item;
        });
      } else {
        newCart = [...array, object];
      }

      // Update the quantity if it already exists
      localStorage.setItem('cart', JSON.stringify(newCart));
      return;
    }

    // Inserting product into cart of localStorage if it not already exists
    localStorage.setItem('cart', JSON.stringify([object]));
  };

  static getProductFromCart = () => {
    const data = localStorage.getItem('cart');

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  };

  static removeProductFromCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter((item) => item.id !== product.id);

    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  static removeALLProductsFromCart = () => {
    localStorage.removeItem('cart');
  };
}
