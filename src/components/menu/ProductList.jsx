import ProductListWrapper from '../products/ProductListWrapper';
import ProductItem from './ProductItem';
import './ProductList.scss';

export default function ProductList(props) {
  const { products, loading, error } = props;
  return (
    <ProductListWrapper loading={loading} error={error}>
      <div className="row_wrap_space-around gap-20">
        {products &&
          products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
      </div>
    </ProductListWrapper>
  );
}
