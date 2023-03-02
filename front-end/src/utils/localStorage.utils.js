export default class LocalStorage {
  static setLogin = async ({ name, email, role, token }) => {
    // Saves the user data fetched on LOGIN into the LocalStorage;
    localStorage.setItem('user', JSON.stringify({ name, email, role, token }));

    localStorage.setItem('userId', JSON.stringify(params.id));
  };

  static logOut = async () => {
    localStorage.removeItem('user');
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
}
