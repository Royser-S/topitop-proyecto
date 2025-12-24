const KEY = "TOPITOP_CART_V1";
const EVT = "topitop-cart-changed";

const read = () => {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const write = (items) => {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVT));
};

export const cartStore = {
  subscribe(cb) {
    const handler = () => cb(read());
    window.addEventListener(EVT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVT, handler);
      window.removeEventListener("storage", handler);
    };
  },

  getItems() {
    return read();
  },

  getCount() {
    return read().reduce((acc, it) => acc + Number(it.qty ?? 1), 0);
  },

  add(product, { size } = {}) {
    const items = read();

    const key = `${product.id}__${size ?? ""}`; // 🔧 Corregido: backticks
    const idx = items.findIndex((x) => x.key === key);

    if (idx >= 0) {
      items[idx] = { ...items[idx], qty: Number(items[idx].qty ?? 1) + 1 };
    } else {
      items.push({
        key,
        id: product.id,
        brand: product.brand ?? "",
        title: product.title ?? "",
        image: product.image ?? "/img/no-image.png",
        price: Number(product.price ?? 0),
        size: size ?? "",
        qty: 1,
      });
    }

    write(items);
    return items;
  },

  inc(key) {
    const items = read().map((it) => 
      it.key === key ? { ...it, qty: Number(it.qty ?? 1) + 1 } : it
    );
    write(items);
  },

  dec(key) {
    const items = read().map((it) => 
      it.key === key ? { ...it, qty: Math.max(1, Number(it.qty ?? 1) - 1) } : it
    );
    write(items);
  },

  setQty(key, value) {
    const n = Math.max(1, Math.min(99, parseInt(value, 10) || 1));
    const items = read().map((it) => 
      it.key === key ? { ...it, qty: n } : it
    );
    write(items);
  },

  remove(key) {
    const items = read().filter((it) => it.key !== key);
    write(items);
  },

  clear() {
    write([]);
  },
};