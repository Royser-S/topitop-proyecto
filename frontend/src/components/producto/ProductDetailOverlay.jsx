// src/components/producto/ProductDetailOverlay.jsx
import { useMemo, useState } from "react";
import "./ProductDetailOverlay.css";

const formatPEN = (v) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(v ?? 0);

const ProductDetailOverlay = ({ product, open, onClose, onAdd }) => {
  if (!open || !product) return null;

  const {
    title,
    brand,
    price,
    oldPrice,
    discountPercent,
    images,
    sizes,
    descripcion,
  } = product;

  const imageList = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) return images;
    if (product.image) return [product.image];
    return ["/img/no-image.png"];
  }, [images, product]);

  const sizeList = sizes && sizes.length > 0 ? sizes : ["26", "28", "30", "32"];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    sizeList.length > 0 ? String(sizeList[0]) : null
  );
  const [qty, setQty] = useState(1);

  const showDiscount = Number(discountPercent) > 0;

  const handleAddClick = () => {
    onAdd?.(product, qty, selectedSize);
  };

  return (
    <div className="pdetail-backdrop" onClick={onClose}>
      <div
        className="pdetail-panel"
        onClick={(e) => e.stopPropagation()} // que no cierre al dar click adentro
      >
        {/* HEADER */}
        <header className="pdetail-header">
          <div className="pdetail-brand">{brand}</div>
          <button
            type="button"
            className="pdetail-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </header>

        <div className="pdetail-layout">
          {/* COLUMNA IZQUIERDA: GALERÍA */}
          <div className="pdetail-left">
            <div className="pdetail-mainimg">
              <img
                src={imageList[selectedImage]}
                alt={title}
                loading="lazy"
              />
            </div>

            {imageList.length > 1 && (
              <div className="pdetail-thumbs">
                {imageList.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pdetail-thumb ${
                      idx === selectedImage ? "is-active" : ""
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img src={src} alt={`${title} ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: INFO */}
          <div className="pdetail-right">
            <h1 className="pdetail-title">{title}</h1>

            <div className="pdetail-priceblock">
              <div className="pdetail-priceNow">{formatPEN(price)}</div>
              {oldPrice && (
                <div className="pdetail-priceOld">{formatPEN(oldPrice)}</div>
              )}
              {showDiscount && (
                <div className="pdetail-badge">{discountPercent}%</div>
              )}
            </div>

            {/* TALLAS */}
            {sizeList.length > 0 && (
              <section className="pdetail-section">
                <div className="pdetail-label">Talla</div>
                <div className="pdetail-sizes">
                  {sizeList.map((s) => {
                    const val = String(s);
                    const active = val === selectedSize;
                    return (
                      <button
                        key={val}
                        type="button"
                        className={`pdetail-size ${active ? "is-active" : ""}`}
                        onClick={() => setSelectedSize(val)}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* CANTIDAD + BOTÓN */}
            <section className="pdetail-section pdetail-cta-row">
              <div className="pdetail-qtywrap">
                <button
                  type="button"
                  className="pdetail-qtybtn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  className="pdetail-qtyinput"
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, Number(e.target.value) || 1))
                  }
                />
                <button
                  type="button"
                  className="pdetail-qtybtn"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="pdetail-addbtn"
                onClick={handleAddClick}
              >
                AGREGAR AL CARRITO
              </button>
            </section>

            {/* DESCRIPCIÓN */}
            <section className="pdetail-section">
              <div className="pdetail-label">Descripción</div>
              <p className="pdetail-desc">
                {descripcion ||
                  "Descripción del producto no disponible por el momento."}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailOverlay;
