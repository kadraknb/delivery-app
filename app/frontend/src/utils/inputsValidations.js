export default class InputValidations {
  static validateLogin = (email, password) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const minPasswordLength = 6;

    const emailResponse = emailRegex.test(email);
    const passwordResponse = password.length >= minPasswordLength;
    return emailResponse && passwordResponse;
  };

  static validateRegister = (email, password, name) => {
    const minNameLength = 12;

    const nameResponse = name.length >= minNameLength;
    return this.validateLogin(email, password) && nameResponse;
  };

  static validateAddressAndNumber = (address, number) => {
    const minCharactersLength = 5;
    const minNumberLength = 1;

    const addressResponse = address.length >= minCharactersLength;
    const numberResponse = number.length >= minNumberLength;

    return addressResponse && numberResponse;
  };
}
