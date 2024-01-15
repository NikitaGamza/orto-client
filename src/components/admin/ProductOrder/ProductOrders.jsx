import React, { useEffect, useState } from 'react';
import './ProductOrder.scss';

export default function ProductOrders() {
  const [orderList, setOrderList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(true);

  async function deleteOrder(id) {
    await fetch(`/api/orders/${id}`, {
      method: 'DELETE',
    });
    onUpdate();
  }

  useEffect(() => {
    if (isUpdate) {
      fetchOrders();
      setIsUpdate(false);
    }
  }, [isUpdate]);

  function onUpdate() {
    setIsUpdate(true);
  }
  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setOrderList(data);
      return await response.json();
    } catch (error) {
      // alert(error);
      console.log(error);
    }
  };
  async function doneOrder(id) {
    const order = orderList.find((order) => order._id === id);
    const madeOrder = {
      ...order,
      isDone: !order.isDone,
    };
    try {
      const response = await fetch('/api/orders/done', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(madeOrder),
      });
      onUpdate();
    } catch (error) {
      // alert(error);
      console.log(error);
    }
  }
  async function takeOrder(id) {
    const order = orderList.find((order) => order._id === id);
    const takeOrder = {
      ...order,
      isTaken: !order.isTaken,
    };
    try {
      const response = await fetch('/api/orders/take', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(takeOrder),
      });
      onUpdate();
    } catch (error) {
      // alert(error);
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Заказы</h1>
      {orderList.map((item) => (
        <div className="order">
          <div className="order__client">
            <span>{item.clientFIO}</span>
            <span>{item.clientCountry}</span>
            <span>{item.clientCity}</span>
            <span>{item.clientAddress}</span>
            <span>{item.clientPostalCode}</span>
            <span>{item.clientEmail}</span>
            <span>{item.clientPhone}</span>
          </div>
          {item.orderList.map((productItem) => (
            <div className="order__product">
              <span>{productItem.name}</span>
              <span>{productItem.size}</span>
              <span>{productItem.length}</span>
              <span>{productItem.color}</span>
              <span>{productItem.articul}</span>
              <span>{productItem.price}</span>
              <span>{productItem.quantity}</span>
              <span>{productItem.slug}</span>
            </div>
          ))}
          <div className="order__settings">
            <span>
              <input
                onChange={() => takeOrder(item._id)}
                type="checkbox"
                checked={item.isTaken}
              />
              <label>
                {item.isTaken
                  ? 'Взят на рассмотрение'
                  : 'Не взят на рассмотрение'}
              </label>
            </span>
            <span>
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={() => doneOrder(item._id)}
              />
              <label>{item.isDone ? 'Выполнен' : 'Не выполнен'}</label>
            </span>
            <button
              onClick={() => deleteOrder(item._id)}
              className="order__settings__delete"
            >
              Удалить
            </button>
          </div>
          {/* <OrderItem item={item} /> */}
        </div>
      ))}
    </div>
  );
}
