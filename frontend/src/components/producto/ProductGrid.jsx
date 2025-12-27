// src/components/producto/ProductGrid.jsx
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ products, onAdd, onView }) => {
  return (
    <section className="pgrid">
      {products?.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAdd={onAdd}
          onView={onView}   // ✅ importante
        />
      ))}
    </section>
  );
};

export default ProductGrid;
