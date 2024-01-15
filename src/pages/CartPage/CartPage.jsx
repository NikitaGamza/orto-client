import { useContext, useEffect } from 'react';
import { Store } from '../../Store';
import { Helmet } from 'react-helmet-async';
import Col from 'react-bootstrap/esm/Col';
import MessageBox from '../../components/ui/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CartList from '../CartList/CartList';

export default function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Корзина</title>
      </Helmet>

      <h1>Корзина</h1>

      {/* <Row> */}
      <Col>
        {cartItems.length === 0 ? (
          <MessageBox>
            Ваша корзина пуста. <Link to="/">Перейти к выбору товаров</Link>
          </MessageBox>
        ) : (
          <CartList cartItems={cartItems} />
        )}
      </Col>

      <Col>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  Предварительная цена (
                  {cartItems.reduce((a, c) => a + c.quantity, 0)} товаров):{' '}
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}{' '}
                  рублей
                </h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    onClick={checkoutHandler}
                    type="button"
                    variant="primary"
                    disabled={cartItems.length === 0}
                  >
                    Оформить заказ
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
      {/* </Row> */}
    </div>
  );
}
