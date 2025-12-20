import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ products, onAdd }) => {
  return (
    <section className="pgrid">
      {products?.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </section>
  );
};

export default ProductGrid;