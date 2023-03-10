const saleMock = {
  "id": 1,
  "userId": 3,
  "sellerId": 2,
  "totalPrice": 1200,
  "deliveryAddress": "Rua. Dom Pedre",
  "deliveryNumber": "16",
  "saleDate": "2023-03-10T19:11:30.679Z",
  "status": "Pendente"
}

const SalesProductsMock = {
  "saleId": 1,
  "productId": 1,
  "quantity": 3
}

const salesMock = [
  {
    "id": 1,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "1200.00",
    "deliveryAddress": "Rua. Dom Pedre",
    "deliveryNumber": "16",
    "saleDate": "2023-03-10T19:11:30.000Z",
    "status": "Pendente"
  }
]


module.exports = { saleMock, SalesProductsMock, salesMock }