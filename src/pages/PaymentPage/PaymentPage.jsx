import React, { useEffect, useLayoutEffect } from 'react';
import { useContext } from 'react';
import { Store } from '../../Store';
import { ActionTypes } from '../../ActionTypes/ActionTypes';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems, shippingAddress },
  } = state;
  const navigate = useNavigate();
  const addOrderFetch = async () => {
    const completeOrder = {};
    completeOrder.orderList = [...cartItems];
    completeOrder.clientFIO = shippingAddress.fullName;
    completeOrder.clientAddress = shippingAddress.address;
    completeOrder.clientCity = shippingAddress.city;
    completeOrder.clientCountry = shippingAddress.country;
    completeOrder.clientPostalCode = shippingAddress.postalCode;
    completeOrder.clientEmail = shippingAddress.email;
    completeOrder.clientPhone = shippingAddress.phoneNumber;
    completeOrder.isTaken = false;
    completeOrder.isDone = false;
    const body = JSON.stringify(completeOrder);
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    localStorage.removeItem('cartItems');
    ctxDispatch({ type: ActionTypes.CLEAR_CART });
    alert('Ваш заказ успешно оформлен');
    navigate('/');
    return await response.json();
  };

  useEffect(() => {
    const completeOrder = {};
    completeOrder.orderList = cartItems;
    completeOrder.clientFIO = shippingAddress.fullName;
    completeOrder.clientAddress = shippingAddress.address;
    completeOrder.clientCity = shippingAddress.city;
    completeOrder.clientCountry = shippingAddress.country;
    completeOrder.clientPostalCode = shippingAddress.postalCode;
  });

  return (
    <div>
      <h3>Оформление заказа</h3>

      <div className="flex_wrap_spacebetween_align-center">
        <div>
          <p>ФИО</p>
          <p>{shippingAddress.fullName}</p>
        </div>
        <div>
          <p>Адрес</p>
          <p>{shippingAddress.address}</p>
        </div>
        <div>
          <p>Город</p>
          <p>{shippingAddress.city}</p>
        </div>
        <div>
          <p>Область</p>
          <p>{shippingAddress.country}</p>
        </div>
        <div>
          <p>Индекс</p>
          <p>{shippingAddress.postalCode}</p>
        </div>
        <div>
          <p>email</p>
          <p>{shippingAddress.email}</p>
        </div>
        <div>
          <p>Телефон</p>
          <p>{shippingAddress.phoneNumber}</p>
        </div>
      </div>
      <h6>Детали заказа</h6>
      {cartItems.map((item) => (
        <div className="flex_wrap_spacebetween_align-center">
          <p>{item.name}</p>
          <p>{item.color}</p>
          <p>{item.size}</p>
          <p>{item.length}</p>
          <p>{item.quantity}</p>
        </div>
      ))}
      <button onClick={async () => await addOrderFetch()}>
        Оформить заказ
      </button>
    </div>
  );
}
