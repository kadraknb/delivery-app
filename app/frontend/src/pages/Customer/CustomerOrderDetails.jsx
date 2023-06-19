/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Circles } from 'react-loader-spinner';

import Api from '../../services/api';
import DateOperations from '../../utils/dateOperations';

import NavBar from '../../components/NavBar';
import TableProducts from '../../components/TableProducts';
import DefaultInput from '../../components/stylizedElement/DefaultInput';
import BigButton from '../../components/stylizedElement/BigButton';
import iOrder from '../../images/icons/orderDashboard_order.svg';

function CustomerDetails() {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const zerosLength = 5;

  const retrieveOrder = async () => {
    const data = await Api.getSalesById(id);
    setProducts(data.products);
    setOrder(data.order);
    setSeller(await Api.getSellerById(data.order.sellerId));
  };

  const changeState = async () => {
    const data = await Api.changeStateOrders(order.id, 'Entregue');
    if (data === true) {
      setOrder({ ...order, status: 'Entregue' });
    }
  };

  useEffect(() => {
    try {
      retrieveOrder();
    } catch (error) {
      console.error(error);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    if (products.length) {
      setIsLoading(false);
    }
  }, [products]);

  const createTableHeaders = () => {
    const headers = ['Item', 'Description', 'Quantity', 'Unitary Price', 'Sub-Total'];

    return headers.map((head) => (
      <th
        className="text-default_white font-normal w-40"
        key={ head }
      >
        {head}
      </th>
    ));
  };

  const table = (
    <table className="w-full">
      <thead className="bg-default_black h-20">
        <tr>
          {createTableHeaders()}
        </tr>
      </thead>
      <tbody>
        <TableProducts
          page="orders"
          type="customer_order_details"
          array={ products }
        />
      </tbody>
    </table>
  );

  const mainContent = (
    <div>
      <div
        className="flex flex-col items-start w-9/12 mt-16 mx-auto"
      >
        <div className="flex items-end gap-2 mb-4">
          <img
            src={ iOrder }
            alt="Icone de carrinho"
            className="w-28 -mb-3 ml-[-10px]"
          />
          <h1 className="text-6xl font-extrabold">
            {`ORDER: ${String(order.id).padStart(zerosLength, 0)}`}
          </h1>
        </div>

        {table}
      </div>

      <form
        className="p-6 flex flex-col
        text-default_black  w-[1390px] m-auto rounded-2xl border-[2px]
        border-default_light_gray mb-32 mt-16"
      >
        <div className="flex">
          <div
            className="w-full flex flex-col items-center justify-center"
          >
            <span className="text-3xl font-bold">
              Purchase Details
            </span>

            <div className="flex gap-6 mb-4 mt-8">
              <DefaultInput
                title="Date"
                dataTestId="customer_checkout__input-address-number"
                placeholder={ DateOperations.formatDDMMYYYY(order.saleDate) }
                type="text"
                size="small"
                disabled
              />

              <DefaultInput
                title="Responsible Seller"
                dataTestId="customer_order_details__element-order-details-label-seller-name"
                placeholder={ seller }
                type="text"
                size="small"
                disabled
              />
            </div>

            <div className="flex gap-6 mb-2">
              <DefaultInput
                title="ID"
                dataTestId="customer_order_details__element-order-details-label-order-id"
                placeholder={ `${String(order.id).padStart(zerosLength, 0)}` }
                type="text"
                size="small"
                disabled
              />

              <DefaultInput
                title="Status"
                dataTestId="customer_order_details__element-order-details-label-delivery-status"
                placeholder={ order.status }
                type="text"
                size="small"
                disabled
              />
            </div>
          </div>

          <hr className="h-40 w-1 rounded-full self-center bg-default_light_gray" />

          <div
            className="w-full flex flex-col items-center justify-center
          font-semibold"
          >
            <div
              data-testid="customer_order_details__element-order-total-price"
              className="flex flex-col items-center mb-8"
            >
              <span className="text-2xl"> Total </span>
              <span className="text-4xl">
                R$
                {' '}
                { Number(order.totalPrice).toFixed(2).replace('.', ',')}
              </span>
            </div>
            <BigButton
              content="Mark as Delivered"
              button={ 1 }
              handleOnClick={ changeState }
              disabled={ order.status !== 'Pendente' }
            />
          </div>
        </div>
      </form>
    </div>
  );

  const loadingContent = (
    <div className="flex items-center top-1/3 absolute justify-center w-full mt-16 mx-auto">
      <Circles
        height="80"
        width="80"
        color="#F08080"
        ariaLabel="circles-loading"
        visible
      />
    </div>
  );

  return (
    <div>
      <NavBar type="main" />
      {isLoading ? loadingContent : mainContent}
    </div>
  );
}

export default CustomerDetails;
