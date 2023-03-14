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

    /* act(async () => {
     
    }); */

    

    
    await waitFor(async () => {
      const incrementItems = screen.getByTestId('customer_products__button-card-add-item-1');
      await user.click(incrementItems);
      await user.click(addCart)
      const path = window.location.pathname;
      expect(path).toBe('/customer/checkout')
    })
    
    

   
  });
  it('Deve mostrar uma mensagem de erro e voltar para a tela de login', async () => {
    localStorage.setItem('user', JSON.stringify({ id: 4, name: 'grupo 23', role: 'customer', token: 'grupo23B' }));
    jest.spyOn(api,'get').mockRejectedValue(new Error('Erro no teste product'));
    renderWithRouter(<App />);
    const cartTotalValue = screen.getByTestId('customer_products__checkout-bottom-value');
    expect(cartTotalValue).toBeInTheDocument();
  });
});
