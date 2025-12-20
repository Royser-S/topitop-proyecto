// ProductCard.jsx
import "./ProductCard.css";

const formatPEN = (value) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(value);

const ProductCard = ({ product, onAdd }) => {
  const { title, brand, image, price, oldPrice, discountPercent } = product;
  const showDiscount = Number(discountPercent) > 0;

  const sizes = product.sizes ?? ["26", "28", "30", "32"]; // fallback
  const hasSizes = sizes?.length > 0;

  return (
    <article className="pcard">
      <div className="pcard__top">
        {showDiscount && <span className="pcard__badge">{discountPercent}%</span>}
        <button className="pcard__fav" type="button" aria-label="Favorito">♡</button>
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

        {hasSizes && (
          <div className="pcard__sizesRow">
            <span className="pcard__sizesLabel">Talla</span>
            <div className="pcard__sizes">
              {sizes.map((s) => (
                <button key={s} className="pcard__size" type="button">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <button className="pcard__add" type="button" onClick={() => onAdd?.(product)}>
          AGREGAR AL CARRITO
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
