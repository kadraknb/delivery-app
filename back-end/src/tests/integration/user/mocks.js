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

module.exports = { userMock, tokenMock, loginMock, getUserbyroleSeller };