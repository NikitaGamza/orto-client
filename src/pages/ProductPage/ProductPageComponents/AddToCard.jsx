import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ActionTypes } from '../../../ActionTypes/ActionTypes';
import { Store } from '../../../Store';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddToCard(_id) {
  const { image, articul, name, price, size, color, slug, length } = _id;
  const navigate = useNavigate();
  const { dispatch: ctxDispatch } = useContext(Store);
  const addToCartHandler = async (_id) => {
    ctxDispatch({
      type: ActionTypes.CART_ADD_ITEM,
      payload: {
        _id,
        image,
        name,
        articul,
        size: price.size,
        price: price.price,
        color,
        slug,
        length,
      },
    });
    // console.log(
    //   image,
    //   articul,
    //   name,
    //   price.price,
    //   size.price,
    //   color,
    //   slug,
    //   length
    // );
    // ctxDispatch({ type: ActionTypes.CLEAR_CART });

    navigate('/cart');
  };
  return (
    <div>
      <Card>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Цена: </Col>
                <Col>{_id.price.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                onClick={() => addToCartHandler(_id, price, size, length)}
                variant="primary"
              >
                Добавить в корзину
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
