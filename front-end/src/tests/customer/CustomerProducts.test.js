import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import api from '../../services/api';


describe('Testa o login do usuário cliente', () => {
  afterEach(() => {
    global.localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Deve adicionar bebidas ao localStorage', async () => {
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
  
    await waitFor(async () => {
      const incrementItems = screen.getByTestId('customer_products__button-card-add-item-1');
      await user.click(incrementItems);
      await user.click(addCart)
      const path = window.location.pathname;
      expect(path).toBe('/customer/checkout')
    })
  });
  it('Deve adicionar bebidas ao localStorage ao colocar a qty no input', async () => {
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
    const mockCart = [{"id": 1, "name": "Skol Lata 250ml", "price": "2.20", "quantity": '1111111111111', "totalPrice": "2444444444444.20"}]
    jest.spyOn(api,'get').mockResolvedValue(mockProducts)

    const { user } = renderWithRouter(<App />);

    const addCart = screen.getByTestId('customer_products__button-cart');
    expect(addCart).toBeInTheDocument();
  
    await waitFor(async () => {
      const inputQty = screen.getByTestId('customer_products__input-card-quantity-1');
      await user.type(inputQty, '1');
      // expect(inputQty).toHaveProperty('value', '1');
      const items = JSON.parse(localStorage.getItem('card'));
      expect(items).toStrictEqual(mockCart)
    })
  });
  it('Deve retirar bebida do localStorage', async () => {
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

    const mockCart = [{"id": 1, "name": "Skol Lata 250ml", "price": "2.20", "quantity": 15, "totalPrice": "33.00"}]
    localStorage.setItem('card', JSON.stringify(mockCart));
    jest.spyOn(api,'get').mockResolvedValue(mockProducts)

    const { user } = renderWithRouter(<App />);

    const addCart = screen.getByTestId('customer_products__button-cart');
    expect(addCart).toBeInTheDocument();
  
    await waitFor(async () => {
      const decrementItems = screen.getByTestId('customer_products__button-card-rm-item-1'); 
      await user.click(decrementItems);

      const items = JSON.parse(localStorage.getItem('card'));
      expect(items).toStrictEqual([])
    })
  });
  it('Deve mostrar uma mensagem de erro', async () => {
    localStorage.setItem('user', JSON.stringify({ id: 4, name: 'grupo 23', role: 'customer', token: 'grupo23B' }));
    jest.spyOn(api,'get').mockRejectedValue(new Error('Erro no teste product'));
    renderWithRouter(<App />);
    const cartTotalValue = screen.getByTestId('customer_products__checkout-bottom-value');
    expect(cartTotalValue).toBeInTheDocument();
  });
});
