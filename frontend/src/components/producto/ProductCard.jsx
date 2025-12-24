// ProductCard.jsx
import { useMemo, useState } from "react";
import "./ProductCard.css";

const formatPEN = (value) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(value);

const ProductCard = ({ product, onAdd }) => {
  const { title, brand, image, price, oldPrice, discountPercent } = product;
  const showDiscount = Number(discountPercent) > 0;

  // si tu API luego trae tallas, reemplaza esto por product.sizes real
  const sizes = useMemo(() => product.sizes ?? ["26", "28", "30", "32"], [product.sizes]);
  const hasSizes = sizes?.length > 0;

  // ✅ talla seleccionada
  const [selectedSize, setSelectedSize] = useState(hasSizes ? String(sizes[0]) : "");

  const addToCart = () => {
    // si hay tallas, exigimos talla seleccionada
    if (hasSizes && !selectedSize) return;
    onAdd?.(product, { size: selectedSize });
  };

  return (
    <article className="pcard">
      <div className="pcard__top">
        {showDiscount && <span className="pcard__badge">{discountPercent}%</span>}
        <button className="pcard__fav" type="button" aria-label="Favorito">
          ♡
        </button>
      </div>

      <div className="pcard__imgwrap">
        <img className="pcard__img" src={image} alt={title} loading="lazy" />
      </div>

      <div className="pcard__body">
        <div className="pcard__info">
          <div className="pcard__meta">
            <span className="pcard__brand">{brand}</span>
            <span className="pcard__title">{title}</span>
          </div>

          <div className="pcard__price">
            <span className="pcard__priceNow">{formatPEN(price)}</span>
            {oldPrice ? <span className="pcard__priceOld">{formatPEN(oldPrice)}</span> : null}
          </div>
        </div>

  {/* ✅ REVEAL: tallas + botón (para tu hover css) */}
<div className="pcard__reveal">
  {hasSizes && (
    <div className="pcard__sizesRow">
      <span className="pcard__sizesLabel">Talla</span>

      <div className="pcard__sizes">
        {sizes.map((s) => {
          const sizeStr = String(s);
          const active = sizeStr === selectedSize;

          return (
            <button
              key={sizeStr}
              className={`pcard__size ${active ? "is-active" : ""}`}
              type="button"
              onClick={() => setSelectedSize(sizeStr)}
              aria-pressed={active}
              title={`Elegir talla ${sizeStr}`}
            >
              {sizeStr}
            </button>
          );
        })}
      </div>
    </div>
  )}

  <button
    className="pcard__add"
    type="button"
    onClick={() => onAdd?.({ ...product, selectedSize })}
    disabled={hasSizes && !selectedSize}
    title={hasSizes && !selectedSize ? "Elige una talla" : "Agregar al carrito"}
  >
    AGREGAR AL CARRITO
  </button>
</div>

      </div>
    </article>
  );
};

export default ProductCard;