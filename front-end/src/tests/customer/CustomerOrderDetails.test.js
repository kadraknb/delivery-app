import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import api from '../../services/api';


describe('Testa o Mudança de status do usuário cliente', () => {
  afterEach(() => {
    global.localStorage.clear();
    jest.restoreAllMocks();
  });
  it('Deve atualizar o status da venda para Entrgue', async () => {
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

    const mockOrdersDetails = { data : {
      "id": 1,
      "userId": 3,
      "sellerId": 2,
      "totalPrice": "11.90",
      "deliveryAddress": "Rua gonçalves",
      "deliveryNumber": "265",
      "saleDate": "2023-03-14T13:12:47.000Z",
      "status": "Em Trânsito",
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

    const btnOrder = screen.getByTestId('div click');
    expect(btnOrder).toBeInTheDocument();
    jest.spyOn(api,'get').mockResolvedValue(mockOrdersDetails);
    await user.click(btnOrder)

    await waitFor(async () => {
      const path = window.location.pathname;
      expect(path).toBe('/customer/orders/1')
    })

    const btnUpState = screen.getByTestId('customer_order_details__button-delivery-check');
    expect(btnUpState).toBeInTheDocument()
    expect(btnUpState).not.toBeDisabled()

    const mockOrdersDetailsUp = { data : {
      "id": 1,
      "userId": 3,
      "sellerId": 2,
      "totalPrice": "11.90",
      "deliveryAddress": "Rua gonçalves",
      "deliveryNumber": "265",
      "saleDate": "2023-03-14T13:12:47.000Z",
      "status": "Entregue",
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
    jest.spyOn(api, 'get').mockResolvedValue(mockOrdersDetailsUp);
    jest.spyOn(api, 'patch').mockResolvedValue();

    await user.click(btnUpState);

    const status = screen.getByText(/Entregue/);
    expect(status).toBeInTheDocument();


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
