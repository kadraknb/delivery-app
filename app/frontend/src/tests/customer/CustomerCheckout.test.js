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

  it('Deve ADD uma compra ao BD e redirecionar para tela de detalhes de pedido e limpar o localStorage', async () => {
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

    const mockSeller = { data : [{
      email: 'fulana@deliveryapp.com',
      id: 2,
      name: 'Fulana Pereira',
      role: 'seller'
    }]}

    const mockSales = { data : {
      "id": 3,
      "userId": 3,
      "sellerId": 2,
      "totalPrice": 1200,
      "deliveryAddress": "Rua. Dom Pedre",
      "deliveryNumber": "16",
      "saleDate": "2023-03-14T22:32:55.798Z",
      "status": "Pendente"
    },
    status: 201 
    }

    const mockOrdersDetails = { data : {
      "id": 1,
      "userId": 3,
      "sellerId": 2,
      "totalPrice": "11.90",
      "deliveryAddress": "Rua gonçalves",
      "deliveryNumber": "265",
      "saleDate": "2023-03-14T13:12:47.000Z",
      "status": "Pendente",
      "products": [
        {
          "id": 1,
          "name": "Skol Lata 250ml",
          "price": "2.20",
          "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg",
          "SalesProducts": {
            "saleId": 1,
            "productId": 1,
            "quantity": 2
          }
        },
        {
          "id": 2,
          "name": "Heineken 600ml",
          "price": "7.50",
          "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
          "SalesProducts": {
            "saleId": 1,
            "productId": 2,
            "quantity": 1
          }
        }
      ]
    }}
    jest.spyOn(api,'get').mockResolvedValue(mockProducts);
    jest.spyOn(api,'post').mockResolvedValue(mockSales)

    const { user } = renderWithRouter(<App />);

    const addCart = screen.getByTestId('customer_products__button-cart');
    expect(addCart).toBeInTheDocument();
  
    await waitFor(async () => {
      const incrementItems = screen.getByTestId('customer_products__button-card-add-item-1');
      await user.click(incrementItems);
      jest.spyOn(api,'get').mockResolvedValue(mockSeller)
      await user.click(addCart)

      const path = window.location.pathname;
      expect(path).toBe('/customer/checkout')
    })

    const addressInput = screen.getByTestId('customer_checkout__input-address');
    await user.type(addressInput, 'rua grupo 23B');
    expect(addressInput).toHaveProperty('value', 'rua grupo 23B');

    const addressNumberInput = screen.getByTestId('customer_checkout__input-address-number');
    await user.type(addressNumberInput, '23');
    expect(addressNumberInput).toHaveProperty('value', '23');

    const selectSellerInput = screen.getByTestId('customer_checkout__select-seller');
    await user.selectOptions(selectSellerInput, ['Fulana Pereira']);
    expect(selectSellerInput).toHaveValue('2');

    const finalyOrder = screen.getByTestId('customer_checkout__button-submit-order');
    jest.spyOn(api,'get').mockResolvedValue(mockOrdersDetails);

    await user.click(finalyOrder);

    const clearLocalStorage = localStorage.getItem('card')

    expect(clearLocalStorage).toBe(null)

    await waitFor(async () => {
      const path = window.location.pathname;
      expect(path).toBe('/customer/orders/3')
    })
  });
  it('Deve remover um item o localStorage e remover da interface', async () => {
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

    const mockSeller = { data : [{
      email: 'fulana@deliveryapp.com',
      id: 2,
      name: 'Fulana Pereira',
      role: 'seller'
    }]}

    jest.spyOn(api,'get').mockResolvedValue(mockProducts)

    const { user } = renderWithRouter(<App />);

    const addCart = screen.getByTestId('customer_products__button-cart');
    expect(addCart).toBeInTheDocument();

    await waitFor(async () => {
      const incrementItems = screen.getByTestId('customer_products__button-card-add-item-1');
      await user.click(incrementItems);
      jest.spyOn(api,'get').mockResolvedValue(mockSeller)
      await user.click(addCart)

      const path = window.location.pathname;
      expect(path).toBe('/customer/checkout')
    })

    const removBtv = screen.getByTestId('customer_checkout__element-order-table-remove-0');
    expect(removBtv).toBeInTheDocument();
    const productName = screen.getByText(/Skol Lata 250ml/);
    await user.click(removBtv)

    expect(productName).not.toBeInTheDocument();

    const items = JSON.parse(localStorage.getItem('card'));
    expect(items).toStrictEqual([])
  });
  it('Deve dispara um erro na requisição get para buscar um vendedor', async () => {
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

    jest.spyOn(api,'get').mockResolvedValue(mockProducts);

    const { user } = renderWithRouter(<App />);

    const addCart = screen.getByTestId('customer_products__button-cart');
    expect(addCart).toBeInTheDocument();
  
    await waitFor(async () => {
      const incrementItems = screen.getByTestId('customer_products__button-card-add-item-1');
      await user.click(incrementItems);
      jest.spyOn(api,'get').mockRejectedValue(new Error('Erro no teste checkout get'))
      await user.click(addCart)
    })
  });
  /* it('Deve dispara um erro na requisição post para criar uma venda', async () => {
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

    const mockSeller = { data : [{
      email: 'fulana@deliveryapp.com',
      id: 2,
      name: 'Fulana Pereira',
      role: 'seller'
    }]}

    jest.spyOn(api,'get').mockResolvedValue(mockProducts);
    jest.spyOn(api,'post').mockRejectedValue(new Error('Erro no teste na criação de uma venda'));

    const { user } = renderWithRouter(<App />);

    const addCart = screen.getByTestId('customer_products__button-cart');
    expect(addCart).toBeInTheDocument();
  
    await waitFor(async () => {
      const incrementItems = screen.getByTestId('customer_products__button-card-add-item-1');
      await user.click(incrementItems);
      jest.spyOn(api,'get').mockResolvedValue(mockSeller)
      await user.click(addCart)

      const path = window.location.pathname;
      expect(path).toBe('/customer/checkout')
    })

    const addressInput = screen.getByTestId('customer_checkout__input-address');
    await user.type(addressInput, 'rua grupo 23B');
    expect(addressInput).toHaveProperty('value', 'rua grupo 23B');

    const addressNumberInput = screen.getByTestId('customer_checkout__input-address-number');
    await user.type(addressNumberInput, '23');
    expect(addressNumberInput).toHaveProperty('value', '23');

    const selectSellerInput = screen.getByTestId('customer_checkout__select-seller');
    await user.selectOptions(selectSellerInput, ['Fulana Pereira']);
    expect(selectSellerInput).toHaveValue('2');

    const finalyOrder = screen.getByTestId('customer_checkout__button-submit-order');
    await user.click(finalyOrder);
  }); */
});
