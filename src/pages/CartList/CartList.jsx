import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';
import { ActionTypes } from '../../ActionTypes/ActionTypes';
import { useContext } from 'react';
import './CartList.scss';

export default function CartList(props) {
  const { cartItems } = props;
  const { dispatch: ctxDispatch } = useContext(Store);

  const onDecreaseItem = (_id, size, color) => {
    ctxDispatch({
      type: ActionTypes.CART_DECREASE_ITEM,
      payload: { _id, size, color },
    });
  };

  const onIncreaseItem = (_id, size, color) => {
    ctxDispatch({
      type: ActionTypes.CART_INCREASE_ITEM,
      payload: { _id, size, color },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: ActionTypes.CART_REMOVE_ITEM, payload: item });
  };

  return (
    <ListGroup>
      <ListGroup.Item>
        <div className="flex_wrap_spacebetween_align-center">
          <Col md={2}>Наименование</Col>
          <Col md={2}>Размер</Col>
          <Col md={1}>Цвет</Col>
          <Col md={1}>Длинна</Col>
          <Col md={1}>Кол-во</Col>
          <Col md={2}>Цена</Col>
          <Col md={1}>Удалить</Col>
        </div>
      </ListGroup.Item>
      {cartItems.map((item) => (
        <ListGroup.Item key={item._id}>
          <div className="flex_wrap_spacebetween_align-center">
            <Col md={2}>
              <img
                src={`http://localhost:5000/static/images/products/${item.image[0]}.jpg`}
                alt={item.name}
                className="img-fluid rounded img-thumbnail"
              />
              <Link to={`/product/${item.slug}`}>{item.name}</Link>
            </Col>
            <Col md={2}>{item.size}</Col>
            <Col md={1}>{item.color}</Col>

            <Col md={1}>{item.length}</Col>
            <Col md={1}>
              <Button
                variant="light"
                onClick={() => onDecreaseItem(item._id, item.size, item.color)}
                disabled={item.quantity === 1}
              >
                <i className="fas fa-minus-circle">-</i>
              </Button>
              <span>{item.quantity}</span>
              <Button
                variant="light"
                onClick={() => onIncreaseItem(item._id, item.size, item.color)}
                disabled={item.quantity === 10}
              >
                <i className="fas fa-plus-circle">+</i>
              </Button>
            </Col>
            <Col md={2}>{item.price} рублей</Col>
            <Col md={1}>
              <Button onClick={() => removeItemHandler(item)} variant="light">
                <i className="fas fa-trash">Удалить</i>
              </Button>
            </Col>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
