import { Link } from 'react-router-dom';

export default function ProductItem(props) {
  const { product } = props;

  return (
    <div className="product__item" key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img
          src={`http://localhost:5000/static/images/products/${product.image[0]}.jpg`}
          alt={product.slug}
          className="product__item__img"
        />
      </Link>

      <div className="product__item__info">
        <Link to={`/product/${product.slug}`}>
          <strong>
            <p className="product__item__info__name">{product.name}</p>
          </strong>
        </Link>

        <p className="product__item__info__price">
          {product.prices[0].price} руб.
        </p>

        <a
          href={`/product/${product.slug}`}
          className="product__item__info__cart"
        >
          Просмотр товара
        </a>
      </div>
    </div>
  );
}
