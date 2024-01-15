import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getError } from '../utils';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../components/menu/Rating';
import Loading from '../components/ui/Loading';
import MessageBox from '../components/ui/MessageBox';
import Button from 'react-bootstrap/esm/Button';
// import ProductList from '../products/menu/ProductList';
import ProductItem from '../components/menu/ProductItem';
import { Store } from '../Store';
import { ActionTypes } from '../ActionTypes/ActionTypes';

const prices = [
  {
    name: '1₽ - 1000₽',
    value: '1-1000',
  },
  {
    name: '1001₽ - 5000₽',
    value: '1001-5000',
  },
  {
    name: '5001₽ - 10000₽',
    value: '5001-10000',
  },
];

export const ratings = [
  {
    name: '4 звезды и выше',
    rating: 4,
  },
  {
    name: '3 звезды и выше',
    rating: 3,
  },
  {
    name: '2 звезды и выше',
    rating: 2,
  },
  {
    name: '1 звезда и выше',
    rating: 1,
  },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { list } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        ctxDispatch({ type: ActionTypes.FETCH_PRODUCT_SUCCESS, payload: data });
      } catch (err) {
        ctxDispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [category, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/category`);
        setCategories(data);
      } catch (err) {
        alert(getError(err));
      }
    };
    fetchCategories();
  }, []);

  // const getFilterUrl = (filter) => {
  //   const filterPage = filter.page || page;
  //   const filterCategory = filter.category || category;
  //   const filterQuery = filter.query || query;
  //   const filterRating = filter.rating || rating;
  //   const filterPrice = filter.price || price;
  //   const sortOrder = filter.order || order;

  //   return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  // };
  return (
    <div>
      {/* <Helmet>
        <title>Результат поиска</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3>Разделы</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={'all' === category ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Все товары
                </Link>
  </li>*/}
      {categories.map((c) => (
        <li>
          <Link to={''}>{c.name}</Link>
        </li>
      ))}
      {/*</ul>
          </div>
          <div>
            <h3>Цена</h3>
            <ul>
              <li>
                <Link
                  className={'all' === price ? 'text-bold' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  Любая цена
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    className={p.value === price ? 'text-bold' : ''}
                    to={getFilterUrl({ price: p.value })}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Оценка покупателей</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                    to={getFilterUrl({ rating: r.rating })}
                  >
                    <Rating caption={' и выше'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={getFilterUrl({ rating: 'all' })}
                  className={rating === 'all' ? 'text-bold' : ''}
                >
                  <Rating caption={' и выше'} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading></Loading>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={2}>
                  <div>
                    {countProducts === 0 ? 'No' : countProducts} результатов
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Price' + price}
                    {rating !== 'all' && ' : Rating' + rating + ' и выше'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    rating !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Сортировать по{' '}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Новые</option>
                    <option value="lowest">Цена: сначала низкая</option>
                    <option value="highest">Цена: сначала высокая</option>
                    <option value="toprated">С высокой оценкой</option>
                  </select>
                </Col>
              </Row>
              {/* {products.length === 0 && (
                <MessageBox>Товары не найдены</MessageBox>
              )} 
              */}
      <Row>
        {list &&
          list.map((product) => (
            <Col sm={4} lg={5} className="mb-3" key={product._id}>
              <ProductItem product={product}></ProductItem>
            </Col>
          ))}
      </Row>
      {/*}
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      variant="light"
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                    >
                      {x + 1}
                    </Button>
                  </Link>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row> */}
    </div>
  );
}
