import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import api from '../../services/api';


describe('Testa o NavBar do usuário cliente', () => {
  afterEach(() => {
    global.localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Deve sair do aplicativo e redirecionar para tela de login e limpar o localStorage', async () => {
    localStorage.setItem('user', JSON.stringify({ id: 4, name: 'grupo 23', role: 'customer', token: 'grupo23B' }));
    const mockProducts = { data: [
      {
        "id": 1,
        "name": "Skol Lata 250ml",
        "price": "2.20",
        "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
      },
      {
        "id": 2,
        "name": "Heineken 600ml",
        "price": "7.50",
        "urlImage": "http://localhost:3001/images/heineken_600ml.jpg"
      },
    ] }
    jest.spyOn(api,'get').mockResolvedValue(mockProducts)

    const { user } = renderWithRouter(<App />);

    const addCart = screen.getByTestId('customer_products__button-cart');
    expect(addCart).toBeInTheDocument();

    const sairBtn = screen.getByTestId('customer_products__element-navbar-link-logout');
    await user.click(sairBtn)
    const clearLocalStorage = localStorage.getItem('user')

    expect(clearLocalStorage).toBe(null)
  
    await waitFor(async () => {

      const path = window.location.pathname;
      expect(path).toBe('/login')
    }) 
  });
  it('Deve redirecionar para tela de produtos', async () => {
    localStorage.setItem('user', JSON.stringify({ id: 4, name: 'grupo 23', role: 'customer', token: 'grupo23B' }));
    const mockProducts = { data: [
      {
        "id": 1,
        "name": "Skol Lata 250ml",
        "price": "2.20",
        "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
      },
      {
        "id": 2,
        "name": "Heineken 600ml",
        "price": "7.50",
        "urlImage": "http://localhost:3001/images/heineken_600ml.jpg"
      },
    ] }
    jest.spyOn(api,'get').mockResolvedValue(mockProducts)

    const { user } = renderWithRouter(<App />);

    const addCart = screen.getByTestId('customer_products__button-cart');
    expect(addCart).toBeInTheDocument();

    const productsBtn = screen.getByTestId('customer_products__element-navbar-link-products');
    await user.click(productsBtn)
  
    await waitFor(() => {
      const path = window.location.pathname;
      expect(path).toBe('/customer/products')
    })
  });
  it('Deve redirecionar para tela de pedidos do vendedor', async () => {
    localStorage.setItem('user', JSON.stringify({ id: 4, name: 'grupo 23', role: 'seller', token: 'grupo23B' }));
    const mockOrders ={ data: [
      {
        id: 1,
        userId: 3,
        sellerId: 2,
        totalPrice: "11.90",
        deliveryAddress: "Rua gonçalves",
        deliveryNumber: "265",
        saleDate: "2023-03-14T13:12:47.000Z",
        status: "Pendente"
      }
    ] }

    jest.spyOn(api,'get').mockResolvedValue(mockOrders)

    const { user } = renderWithRouter(<App />);

    const ordersText = screen.getByText(/PEDIDOS/);
    expect(ordersText).toBeInTheDocument();

    const orderBtn = screen.getByTestId('customer_products__element-navbar-link-orders');
    await user.click(orderBtn)
  
    await waitFor(() => {
      const path = window.location.pathname;
      expect(path).toBe('/seller/orders')
    })
  });
  it('Deve redirecionar para tela de pedidos do cliente', async () => {
    localStorage.setItem('user', JSON.stringify({ id: 4, name: 'grupo 23', role: 'customer', token: 'grupo23B' }));
    const mockProducts = { data: [
      {
        "id": 1,
        "name": "Skol Lata 250ml",
        "price": "2.20",
        "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
      },
      {
        "id": 2,
        "name": "Heineken 600ml",
        "price": "7.50",
        "urlImage": "http://localhost:3001/images/heineken_600ml.jpg"
      },
    ] }
    const mockOrders ={ data: [
      {
        id: 1,
        userId: 4,
        sellerId: 2,
        totalPrice: "11.90",
        deliveryAddress: "Rua gonçalves",
        deliveryNumber: "265",
        saleDate: "2023-03-14T13:12:47.000Z",
        status: "Pendente"
      }
    ] }

    jest.spyOn(api,'get').mockResolvedValue(mockProducts)

    
    const { user } = renderWithRouter(<App />);
    
    const addCartbtn = screen.getByTestId('customer_products__button-cart');
    expect(addCartbtn).toBeInTheDocument();
    
    const ordersText = screen.getByText(/MEUS PEDIDOS/);
    expect(ordersText).toBeInTheDocument();
    
    const orderBtn = screen.getByTestId('customer_products__element-navbar-link-orders');
    
    jest.spyOn(api,'get').mockResolvedValue(mockOrders)
    await user.click(orderBtn)
  
    await waitFor(() => {
      const path = window.location.pathname;
      expect(path).toBe('/customer/orders')
    })
  });
});
