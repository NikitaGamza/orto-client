import ProductListWrapper from '../../products/ProductListWrapper';
import ProductItem from '../ProductItem/ProductItem';

export default function ProductList(props) {
  const { products, loading, error } = props;

  return (
    <ProductListWrapper loading={loading} error={error}>
      <div className="flex_wrap_spacearound gap_20">
        {products &&
          products.map((product, index) => (
            <ProductItem product={product} key={index} />
          ))}
      </div>
    </ProductListWrapper>
  );
}
