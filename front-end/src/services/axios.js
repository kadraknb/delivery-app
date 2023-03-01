import axios from 'axios';

const defaultPort = 3001;

// Create connection with the DB
const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || defaultPort}/`,
});

// example: await api.get('/products', { headers: { authorization } });
export default api;
