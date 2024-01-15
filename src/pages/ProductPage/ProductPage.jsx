import axios from 'axios';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Loading from '../../components/ui/Loading';
import MessageBox from '../../components/ui/MessageBox';
import { getError } from '../../utils';
import { Store } from '../../Store';
import { ActionTypes } from '../../ActionTypes/ActionTypes';
import './ProductPage.scss';
import AddToCard from './ProductPageComponents/AddToCard';

export default function ProductPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { loading, error, product } = state.product.detail;

  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedLength, setSelectedLength] = useState('');

  useEffect(() => {
    if (product != null) {
      setSelectedPrice(product.prices[0]);
      setSelectedColor(product.color[0]);
      setSelectedLength(product.length[0]);
    }
  }, [product]);

  const params = useParams();
  const { slug } = params;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      ctxDispatch({ type: ActionTypes.FETCH_REQUEST_PRODUCT_DETAILS });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        ctxDispatch({
          type: ActionTypes.FETCH_SUCCESS_PRODUCT_DETAILS,
          payload: result.data,
        });
      } catch (err) {
        ctxDispatch({
          type: ActionTypes.FETCH_FAIL_PRODUCT_DETAILS,
          payload: getError(err),
        });
      }
    };

    fetchData();
  }, [slug]);

  const addToCartHandler = async (_id, price, size, length) => {
    ctxDispatch({
      type: ActionTypes.CART_ADD_ITEM,
      payload: {
        _id,
        image: product.image,
        name: product.name,
        articul: product.articul,
        size,
        price,
        color: selectedColor,
        slug: product.slug,
        length,
      },
    });

    navigate('/cart');
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="flex_wrap_spacearound product__page">
      <div className="product__page__imglist">
        {product.image.map((item, index) => {
          return (
            <img
              key={index}
              className="product__page__imglist__item"
              src={`http://localhost:5000/static/images/products/${item}.jpg`}
              alt={product.name}
            />
          );
        })}
      </div>

      <div className="product__page__maininfo">
        <Helmet>
          <title>{product.name}</title>
        </Helmet>

        <h1 className="product__page__name">{product.name}</h1>

        <div className="product__page__sizelist">
          <span>Размер:</span>

          <select
            className="product__page__sizelist__selector"
            onChange={(e) => setSelectedPrice(JSON.parse(e.target.value))}
          >
            {product != null &&
              product.prices.map((item, index) => (
                <option
                  key={index}
                  className="product__page__sizelist__selector__option"
                  value={JSON.stringify(item)}
                >
                  {item.size}
                </option>
              ))}
          </select>
        </div>

        {product.length.length !== 0 && (
          <div className="product__page__lengthlist">
            <span>Длинна</span>
            <select
              className="product__page__lengthlist__selector"
              onChange={(e) => setSelectedLength(e.target.value)}
            >
              {product.length.map((item, index) => (
                <option
                  key={index}
                  className="product__page__lengthlist__selector__option"
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}

        {product.color.length !== 0 && (
          <div className="product__page__colorlist">
            <label htmlFor="color">Цвет: </label>
            <select
              className="product__page__colorlist__selector"
              name="color"
              id="color"
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {product.color.map((item, index) => {
                return (
                  <option
                    key={index}
                    className="product__page__colorlist__selector__option"
                    value={item}
                  >
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        <p>Фирма: {product.brand}</p>
        <p>Страна производитель: {product.country}</p>
        <p>Описание товара:</p>
        <pre className="product__page__description">{product.description}</pre>
      </div>
      {/* <AddToCard
        _id
        image={product.image}
        name={product.name}
        articul={product.articul}
        size={selectedPrice}
        price={selectedPrice}
        color={selectedColor}
        slug={product.slug}
        length={selectedLength}
      /> */}
      <div>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Цена: </Col>
                  <Col>{selectedPrice.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={() =>
                    addToCartHandler(
                      product._id,
                      selectedPrice.price,
                      selectedPrice.size,
                      selectedLength
                    )
                  }
                  variant="primary"
                >
                  Добавить в корзину
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
