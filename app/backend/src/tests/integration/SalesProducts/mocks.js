const salesWithProducts = {
  "id": 1,
  "userId": 3,
  "sellerId": 2,
  "totalPrice": "1200.00",
  "deliveryAddress": "Rua. Dom Pedre",
  "deliveryNumber": "16",
  "saleDate": "2023-03-10T19:11:30.000Z",
  "status": "Pending",
  "products": [
    {
      "id": 1,
      "name": "Skol Lata 250ml",
      "price": "2.20",
      "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg",
      "SalesProducts": {
        "saleId": 1,
        "productId": 1,
        "quantity": 10
      }
    },
    {
      "id": 3,
      "name": "Antarctica Pilsen 300ml",
      "price": "2.49",
      "urlImage": "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
      "SalesProducts": {
        "saleId": 1,
        "productId": 3,
        "quantity": 2
      }
    }
  ]
}

module.exports = { salesWithProducts }