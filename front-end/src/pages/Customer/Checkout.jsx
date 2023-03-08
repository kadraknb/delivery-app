import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import api from '../../services/axios';
import LocalStorage from '../../utils/localStorage.utils';

function Checkout() {
  const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem('card')));
  const [address, setAddress] = useState('');
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState('');
  const [number, setNumber] = useState('');

  const navigate = useNavigate();

  const handleRemoveRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
    localStorage.setItem('card', JSON.stringify(newData));
  };

  const getAllSellers = async () => {
    try {
      const { data } = await api.get('/seller');
      setSellers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('card')) || [];
    setTableData(storedItems);
    getAllSellers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authorization = LocalStorage.getToken();
    const Ok = 201;

    const storedUserId = JSON.parse(localStorage.getItem('userId'));
    const productsFilter = tableData.map((element) => {
      const acc = {
        id: element.id,
        name: element.name,
        quantity: element.quantity,
      };
      return acc;
    });
    const totalPriceCalculate = tableData
      .reduce((total, row) => total + Number(row.totalPrice), 0).toFixed(2);

    try {
      const { data, status } = await api.post('/sales', {
        userId: storedUserId,
        sellerId: Number(seller),
        totalPrice: totalPriceCalculate,
        deliveryAddress: address,
        deliveryNumber: number,
        products: productsFilter,
      }, {
        headers: { authorization },
      });
      if (status === Ok) {
        localStorage.removeItem('card');
        navigate(`/customer/orders/${data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <table>
        <thead>
          Finalizar Pedido
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
            <th>Remove Item</th>
          </tr>
        </thead>
        <tbody>
          {tableData && tableData.map((row, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {row.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >

                {row.quantity}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >

                {row.price.replace('.', ',')}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {row.totalPrice.replace('.', ',')}

              </td>
              <td>
                <button
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                  type="button"
                  onClick={ () => handleRemoveRow(index) }
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" style={ { textAlign: 'right' } }>Total:</td>
            <td data-testid="customer_checkout__element-order-total-price">
              {tableData
                .reduce((total, row) => total + Number(row.totalPrice), 0)
                .toFixed(2).replace('.', ',')}
            </td>
          </tr>
        </tfoot>
      </table>
      P. Vendedora Responsável:
      <select
        name="seller"
        data-testid="customer_checkout__select-seller"
        value={ seller }
        onChange={ (e) => setSeller(e.target.value) }
      >
        <option disabled value="">
          Selecione
        </option>
        {sellers.map(({ name, id }) => (
          <option key={ id } value={ id }>{name}</option>
        ))}
      </select>
      Endereço
      <input
        type="text"
        name="address"
        data-testid="customer_checkout__input-address"
        value={ address }
        onChange={ (e) => setAddress(e.target.value) }
      />
      Número
      <input
        type="text"
        name="number"
        data-testid="customer_checkout__input-address-number"
        value={ number }
        onChange={ (e) => setNumber(e.target.value) }
      />
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ handleSubmit }
      >
        FINALIZAR PEDIDO
      </button>
    </div>
  );
}

export default Checkout;
