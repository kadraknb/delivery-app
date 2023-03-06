import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';

function Checkout() {
  const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem('card')));
  const [address, setAddress] = useState('');
  const [seller, setSeller] = useState('');
  const [number, setNumber] = useState('');

  const handleRemoveRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
    localStorage.setItem('card', JSON.stringify(newData));
  };
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('card')) || [];
    setTableData(storedItems);
    console.log(tableData);
  }, []);

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
                data-testid={ `customer_checkout__element-order-table-item-number-
                ${index}` }
              >
                {index}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-
              ${index}` }
              >
                {row.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-
              ${index}` }
              >

                {row.quantity}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-
                ${index}` }
              >

                {row.price}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-
                ${index}` }
              >
                {row.totalPrice}

              </td>
              <td>
                <button
                  data-testid={ `customer_checkout__element-order-table-remove-
                ${index}` }
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
                .reduce((total, row) => total + Number(row.totalPrice), 0).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
      P. Vendedora Responsável:
      <input
        type="text"
        name="seller"
        value={ seller }
        onChange={ (e) => setSeller(e.target.value) }
      />
      Endereço
      <input
        type="text"
        name="address"
        value={ address }
        onChange={ (e) => setAddress(e.target.value) }
      />
      Número
      <input
        type="text"
        name="number"
        value={ number }
        onChange={ (e) => setNumber(e.target.value) }
      />
      <button type="button">FINALIZAR PEDIDO</button>
    </div>
  );
}

export default Checkout;
