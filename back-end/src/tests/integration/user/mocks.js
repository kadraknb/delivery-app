const userMock = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer'
}

const tokenMock = 'tribo-B-grupo-23';

const loginMock = {
  "id": 3,
  "name": "Cliente Zé Birita",
  "email": "zebirita@email.com",
  "role": "customer",
  "token": "tribo-B-grupo-23"
}

const getUserbyroleSeller = [
  {
    "id": 2,
    "name": "Fulana Pereira",
    "email": "fulana@deliveryapp.com",
    "role": "seller"
  }
]

const getAllUsers = [
  {
    "email": "fulana@deliveryapp.com",
    "id": 2,
    "name": "Fulana Pereira",
    "password": "3c28d2b0881bf46457a853e0b07531c6",
    "role": "seller"
  },
  {
    "email": "zebirita@email.com",
    "id": 3,
    "name": "Cliente Zé Birita",
    "password": "1c37466c159755ce1fa181bd247cb925",
    "role": "customer"
  }
]

const createUserMock = {
  "id": 4,
  "name": "Grupo 23 Tribo B",
  "email": "grupo23@tb.com",
  "role": "customer",
  "token": "tribo-B-grupo-23"
}

const createUserInBdMock = {
  "id": 4,
  "name": "Grupo 23 Tribo B",
  "email": "grupo23@tb.com",
  "role": "customer",
}

module.exports = { userMock, tokenMock, loginMock, getUserbyroleSeller, createUserMock, createUserInBdMock, getAllUsers };