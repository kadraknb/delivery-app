import { useState } from 'react';
import NavBar from '../components/NavBar';

function Checkout() {
  const [tableData, setTableData] = useState([
    {
      item: 'Widget A',
      description: 'A sample widget',
      quantity: 2,
      unitPrice: 10.0,
      subtotal: 20.0 },
    {
      item: 'Widget B',
      description: 'Another widget',
      quantity: 1,
      unitPrice: 15.0,
      subtotal: 15.0 },
  ]);
  const handleRemoveRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
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
          {tableData.map((row, index) => (
            <tr key={ index }>
              <td>
                <input
                  data-testid={ `customer_checkout__element-order-table-item-number-
                ${index}` }
                  type="text"
                  value={ row.item }
                />

              </td>
              <td>
                <input
                  data-testid={ `customer_checkout__element-order-table-name-
              ${index}` }
                  type="text"
                  value={ row.description }
                />

              </td>
              <td>
                <input
                  data-testid={ `customer_checkout__element-order-table-quantity-
              ${index}` }
                  type="number"
                  value={ row.quantity }
                />

              </td>
              <td>
                <input
                  data-testid={ `customer_checkout__element-order-table-unit-price-
                ${index}` }
                  type="number"
                  value={ row.unitPrice }
                />

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-
                ${index}` }
              >
                {row.subtotal.toFixed(2)}

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
              {tableData.reduce((total, row) => total + row.subtotal, 0).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
      P. Vendedora Responsável:
      <input
        type="text"
      />
      Endereço
      <input
        type="text"
      />
      Número
      <input
        type="text"
      />
      <button type="button">FINALIZAR PEDIDO</button>
    </div>
  );
}

export default Checkout;
