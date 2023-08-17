import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
    {products.length > 0 &&(
      products.map((product) => (
        <ProductCard key={product.id} product={product} />
      )))}
    </div>
  );
};

export default ProductGrid;
