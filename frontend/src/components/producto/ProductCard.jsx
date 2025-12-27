// src/components/producto/ProductCard.jsx
import { useState } from "react";
import "./ProductCard.css";

const formatPEN = (value) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(value);

const ProductCard = ({ product, onAdd, onView }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const { title, brand, image, price, oldPrice, discountPercent } = product;
  const showDiscount = Number(discountPercent) > 0;

  const sizes = product.sizes ?? ["26", "28", "30", "32"];
  const hasSizes = sizes?.length > 0;

  const handleCardClick = () => {
    // ✅ en vez de navegar, avisamos a Catalogo que quiere ver detalle
    if (onView) onView(product);
  };

  const handleAddClick = (e) => {
    e.stopPropagation(); // no disparar el click del card
    if (!onAdd) return;

    onAdd({
      ...product,
      selectedSize,
      qty: 1,
    });
  };

  return (
    <article
      className="pcard"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      style={{ cursor: "pointer" }} // ✅ cursor mano
    >
      <div className="pcard__top">
        {showDiscount && <span className="pcard__badge">{discountPercent}%</span>}

        <button
          className="pcard__fav"
          type="button"
          aria-label="Favorito"
          onClick={(e) => e.stopPropagation()}
        >
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
            {oldPrice && (
              <span className="pcard__priceOld">{formatPEN(oldPrice)}</span>
            )}
          </div>
        </div>

        {/* ✅ REVEAL: tallas + botón (usa tu CSS actual) */}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSize(sizeStr);
                      }}
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
            onClick={handleAddClick}
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
