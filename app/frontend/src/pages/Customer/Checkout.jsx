/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import NavBar from '../../components/NavBar';
import TableProducts from '../../components/TableProducts';
import { Context } from '../../context';
import api from '../../services/api';
import InputValidations from '../../utils/inputsValidations';
import LocalStorage from '../../utils/localStorage';
import iCart from '../../images/icons/iCart.svg';
import iCheckout from '../../images/checkoutImage.png';
import DefaultInput from '../../components/Common/DefaultInput';
import BigButton from '../../components/Common/BigButton';
import DefaultDropDown from '../../components/Common/DefaultDropDown';

function Checkout() {
  const { totalPricesGlobal } = useContext(Context);
  const [addressValue, setAddressValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [orderDisabled, setOrderDisabled] = useState(true);
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(0);
  const [confirmPurchase, setConfirmPurchase] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setOrderDisabled(
      !InputValidations.validateAddressAndNumber(addressValue, numberValue),
    );
  }, [addressValue, numberValue]);

  const handleOrder = async () => {
    const timerSeconds = 1000;

    setConfirmPurchase(true);

    const data = {
      userId: +LocalStorage.getUserID(),
      sellerId: +selectedSeller,
      totalPrice: +totalPricesGlobal.toFixed(2),
      deliveryAddress: addressValue,
      deliveryNumber: numberValue,
      products: LocalStorage.getProductFromCart(),
    };

    try {
      const response = await api.postOrder(data);
      if (typeof response !== 'object') {
        throw new Error('Error in server');
      }

      LocalStorage.removeALLProductsFromCart();

      setTimeout(() => {
        setConfirmPurchase(false);
      }, timerSeconds);

      nav(`/customer/orders/${response.id}`);
    } catch (error) {
      setConfirmPurchase(false);
      console.error(error);
    }
  };

  const retrieveSellers = async () => {
    const data = await api.getAllSeller();
    setSellers(data);
    setSelectedSeller(data[0].id);
  };

  useEffect(() => {
    retrieveSellers();
  }, []);

  const tableHeaders = [
    'Item',
    'Description',
    'Quantity',
    'Unit Price',
    'Sub-Total',
    'Remove Item',
  ];

  const trsTable = (
    <tr>
      {tableHeaders.map((name, index) => {
        if (index > 0) {
          return (
            <th className="text-default_white font-normal" key={ name }>
              {name}
            </th>
          );
        }
        return (
          <th className="text-default_white font-normal w-40" key={ name }>
            {name}
          </th>
        );
      })}
    </tr>
  );

  const thProducts = (
    <TableProducts
      page="checkout"
      type="customer_checkout"
      array={ LocalStorage.getProductFromCart().filter(
        (product) => product.quantity > 0,
      ) }
    />
  );

  const table = (
    <table className="w-full">
      <thead className="h-20 bg-default_black">{trsTable}</thead>
      <tbody>{thProducts}</tbody>
    </table>
  );

  const mainContent = (
    <>
      <div className="flex flex-col items-start w-9/12 mt-16 mx-auto">
        <div className="flex items-end gap-2 mb-4">
          <img
            src={ iCart }
            alt="Icone de carrinho"
            className="w-24 ml-[-10px]"
          />
          <h1 className="text-6xl font-extrabold">CHECKOUT</h1>
        </div>

        {table}
      </div>
      <div
        className="flex w-[1390px] m-auto rounded-2xl border-[2px]
      border-default_light_gray mb-32 mt-16"
      >
        <form className="p-6 flex flex-col w-full text-default_black">
          <span className="text-3xl font-bold mb-8">Delivery Details</span>

          <div className="flex items-center mb-4 gap-8">
            <DefaultInput
              title="Address Number"
              dataTestId="customer_checkout__input-address-number"
              placeholder="nº 563"
              value={ numberValue }
              type="number"
              size="small"
              setState={ setNumberValue }
            />

            <DefaultDropDown
              title="Responsible Seller"
              dataTestId="customer_checkout__select-seller"
              value={ selectedSeller.id }
              type="number"
              valuesArray={ sellers }
              setState={ setSelectedSeller }
            />
          </div>

          <DefaultInput
            title="Address Location"
            dataTestId="customer_checkout__input-address"
            placeholder="Robert Robertson, NW Bobcat Lane, St. Robert"
            value={ addressValue }
            type="text"
            size="large"
            setState={ setAddressValue }
          />
        </form>

        <hr className="h-40 w-1 rounded-full self-center bg-default_light_gray" />

        <div
          className="flex flex-col items-center justify-center
        w-full font-semibold gap-6"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-2xl">Total</span>
            <p
              data-testid="customer_checkout__element-order-total-price"
              className="text-4xl"
            >
              {`R$ ${Number(totalPricesGlobal).toFixed(2).replace('.', ',')}`}
            </p>
          </div>
          <BigButton
            content="Finish Checkout"
            button={ 1 }
            disabled={ orderDisabled }
            handleOnClick={ handleOrder }
          />
        </div>
      </div>
    </>
  );

  const messageContent = (
    <div className="flex flex-col items-center justify-center gap-2 mt-[13%]">
      <img
        src={ iCheckout }
        alt="Checkout"
        className="w-96 pointer-events-none"
      />
      <div className="flex flex-col justify-center items-center">
        <span className="text-default_dark_gray text-xl font-bold">
          Purchase completed successfully!
        </span>
        <hr className="w-2/4 h-1 bg-default_black" />
      </div>
    </div>
  );

  return (
    <div>
      <NavBar type="main" />

      <div>{!confirmPurchase ? mainContent : messageContent}</div>
    </div>
  );
}

export default Checkout;
