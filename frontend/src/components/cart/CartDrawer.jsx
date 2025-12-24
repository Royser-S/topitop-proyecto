import { useEffect } from "react";
import "./CartDrawer.css";

const money = (n) => {
  const v = Number(n ?? 0);
  return `S/ ${v.toFixed(2)}`;
};

const CartDrawer = ({ open, items, onClose, onInc, onDec, onRemove, onQty }) => {
  // cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const subtotal = items.reduce((acc, it) => acc + Number(it.price ?? 0) * Number(it.qty ?? 1), 0);

  return (
    <>
      <div className="cartdrawer__backdrop" onClick={onClose} />
      <aside className="cartdrawer" role="dialog" aria-label="Tu carrito">
        <div className="cartdrawer__head">
          <div className="cartdrawer__title">Tu carrito</div>
          <button className="cartdrawer__close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="cartdrawer__body">
          {items.length === 0 ? (
            <div className="cartdrawer__empty">Tu carrito está vacío.</div>
          ) : (
            items.map((it) => (
              <div className="cartdrawer__item" key={it.key}>
                <img className="cartdrawer__img" src={it.image} alt={it.title} />

                <div className="cartdrawer__info">
                  <div className="cartdrawer__brand">{it.brand}</div>
                  <div className="cartdrawer__name">{it.title}</div>

                  {it.size != null && it.size !== "" && (
                    <div className="cartdrawer__meta">Talla: {it.size}</div>
                  )}

                  <div className="cartdrawer__priceRow">
                    <div className="cartdrawer__price">{money(it.price)}</div>

                    <button
                      className="cartdrawer__trash"
                      onClick={() => onRemove?.(it.key)}
                      title="Quitar"
                      aria-label="Quitar"
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="cartdrawer__qtyRow">
                    <button className="cartdrawer__qtyBtn" onClick={() => onDec?.(it.key)} aria-label="Disminuir">
                      −
                    </button>

                    <input
                      className="cartdrawer__qtyInput"
                      value={it.qty}
                      onChange={(e) => onQty?.(it.key, e.target.value)}
                      inputMode="numeric"
                    />

                    <button className="cartdrawer__qtyBtn" onClick={() => onInc?.(it.key)} aria-label="Aumentar">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cartdrawer__footer">
          <div className="cartdrawer__totals">
            <div className="cartdrawer__totRow">
              <span>Subtotal</span>
              <b>{money(subtotal)}</b>
            </div>
            <div className="cartdrawer__totRow">
              <span>Total</span>
              <b>{money(subtotal)}</b>
            </div>
          </div>

          <button className="cartdrawer__cta" disabled={items.length === 0}>
            FINALIZA TU COMPRA
          </button>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;