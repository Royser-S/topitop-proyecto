// src/pages/catalogo/Catalogo.jsx
import { useEffect, useMemo, useState } from "react";
import TopitopNavbar from "../../components/layout/ClienteNavbar";
import HomeBanner from "../../components/banner/HomeBanner";
import FiltersBar from "../../components/filters/FiltersBar";
import ProductGrid from "../../components/producto/ProductGrid";
import Footer from "../../components/footer/Footer";
import productoPublicService from "../../services/producto.public.service";
import { cartStore } from "../../utils/cartStore";

const PAGE_SIZE = 6;

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategoriaIds, setSelectedCategoriaIds] = useState([]);
  const [selectedMarcaIds, setSelectedMarcaIds] = useState([]);
  const [selectedTallaIds, setSelectedTallaIds] = useState([]);
  
    // 🔎 CLICK EN "VER MÁS" DEL BANNER (Mujer / Hombre)
  const handleBannerCategoria = (categoriaId) => {
    // ponemos SOLO esa categoría
    setSelectedCategoriaIds(categoriaId ? [Number(categoriaId)] : []);
    // limpiamos otros filtros si quieres que sea “limpio”
    // setSelectedMarcaIds([]);
    // setSelectedTallaIds([]);
    // quitamos cualquier detalle abierto
    setDetailProduct(null);
    // volvemos a página 1
    setPage(1);
    // bajamos hasta la zona de productos
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // producto en modo detalle
  const [detailProduct, setDetailProduct] = useState(null);
  const [detailImageIndex, setDetailImageIndex] = useState(0);

  // carrito (lógica global intacta)
  const handleAdd = (product) => {
    cartStore.add({
      ...product,
      qty: product.qty ?? 1,
    });
  };

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await productoPublicService.listarPublicos();

        const productosAdaptados = (data ?? []).map((p) => ({
          id: p.id,
          brand: p.nombreMarca,
          title: p.nombre,
          image: p.imagenes?.[0] || "/img/no-image.png",
          images: p.imagenes ?? [], // para el detalle
          price: Number(p.precio),
          oldPrice: p.precioDescuento
            ? Number(p.precio) + Number(p.precioDescuento)
            : null,
          discountPercent: p.precioDescuento
            ? Math.round((p.precioDescuento / p.precio) * 100)
            : null,
          descripcion: p.descripcion ?? "",

          categoriaId: p.categoriaId ?? p.categoria?.id ?? p.idCategoria,
          marcaId: p.marcaId ?? p.marca?.id ?? p.idMarca,
          tallaId: p.tallaId ?? p.talla?.id ?? p.idTalla,
        }));

        setProducts(productosAdaptados);
      } catch (err) {
        console.error(err);
        setError("❌ No se pudo cargar el catálogo");
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const filteredProducts = useMemo(() => {
    let list = products;

    if (selectedCategoriaIds.length > 0) {
      const setCat = new Set(selectedCategoriaIds.map(Number));
      list = list.filter((p) => setCat.has(Number(p.categoriaId)));
    }

    if (selectedMarcaIds.length > 0) {
      const setMarca = new Set(selectedMarcaIds.map(Number));
      list = list.filter((p) => setMarca.has(Number(p.marcaId)));
    }

    if (selectedTallaIds.length > 0) {
      const setTalla = new Set(selectedTallaIds.map(Number));
      list = list.filter((p) => setTalla.has(Number(p.tallaId)));
    }

    return list;
  }, [products, selectedCategoriaIds, selectedMarcaIds, selectedTallaIds]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategoriaIds, selectedMarcaIds, selectedTallaIds]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE)),
    [filteredProducts.length]
  );

  const pageProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, page]);

  // paginación SIN mover el scroll
  const handleNext = () => {
    setPage((p) => Math.min(p + 1, totalPages));
  };

  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 1));
  };

  const canNext = page < totalPages;
  const canPrev = page > 1;

  // cuando haces click en una card
  const handleViewDetail = (product) => {
    setDetailProduct(product);
    setDetailImageIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    setDetailProduct(null);
    setDetailImageIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =========================
  // RENDER
  // =========================
  return (
    <>
      <TopitopNavbar />

      {/* MODO DETALLE */}
      {detailProduct ? (
        <>
          <div className="container-fluid py-4 px-5">
           <button
                    type="button"
                  className="btn btn-link px-0 mb-3 text-secondary"
                  onClick={handleBackToList}
                        >
                      ← Volver al catálogo
              </button>

            <div className="row align-items-start g-4">
              {/* GALERÍA DE IMÁGENES: estilo Topitop */}
              <div className="col-lg-7">
                <div className="row g-3">
                  {/* Imagen principal grande */}
                  <div className="col-12">
                    <div className="border rounded bg-white p-2">
                      <img
                        src={
                          detailProduct.images?.[detailImageIndex] ||
                          detailProduct.image
                        }
                        alt={detailProduct.title}
                        className="img-fluid w-100"
                        style={{
                          maxHeight: "650px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>

                  {/* Thumbnails debajo, en columnas */}
                  {detailProduct.images &&
                    detailProduct.images.length > 1 &&
                    detailProduct.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="col-4 col-md-3"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className={`border rounded bg-white p-1 h-100 ${
                            idx === detailImageIndex ? "border-dark" : ""
                          }`}
                          onClick={() => setDetailImageIndex(idx)}
                        >
                          <img
                            src={img}
                            alt={`${detailProduct.title} ${idx + 1}`}
                            className="img-fluid w-100"
                            style={{
                              height: "160px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* INFORMACIÓN / COMPRA */}
              <div className="col-lg-5">
                <h5 className="text-uppercase text-muted mb-1">
                  {detailProduct.brand}
                </h5>

                <h1 className="fw-bold mb-3">{detailProduct.title}</h1>

                <div className="d-flex align-items-baseline gap-3 mb-4">
                  <span className="fs-2 fw-bold">
                    S/ {Number(detailProduct.price).toFixed(2)}
                  </span>

                  {detailProduct.oldPrice && (
                    <span className="text-muted text-decoration-line-through">
                      S/ {Number(detailProduct.oldPrice).toFixed(2)}
                    </span>
                  )}

                  {detailProduct.discountPercent && (
                    <span className="badge bg-danger fs-6">
                      -{detailProduct.discountPercent}%
                    </span>
                  )}
                </div>

                {detailProduct.descripcion && (
                  <p className="text-muted fs-5 mb-4">
                    {detailProduct.descripcion}
                  </p>
                )}

                <button
                  type="button"
                  className="btn btn-dark btn-lg px-5 py-3"
                  onClick={() => handleAdd(detailProduct)}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // MODO LISTA
        <>
          <HomeBanner onSelectCategoria={handleBannerCategoria} />


          <FiltersBar
            onChangeCategoriaIds={setSelectedCategoriaIds}
            onChangeMarcaIds={setSelectedMarcaIds}
            onChangeTallaIds={setSelectedTallaIds}
          />

          <div className="container-fluid mt-4 px-4">
            {loading && <p>Cargando productos...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
              <>
                <ProductGrid
                  products={pageProducts}
                  onAdd={handleAdd}
                  onView={handleViewDetail}
                />

                {filteredProducts.length > 0 && (
                  <div className="d-flex justify-content-center align-items-center gap-3 my-4">
                    <button
                      type="button"
                      className="btn btn-outline-dark px-4"
                      onClick={handlePrev}
                      disabled={!canPrev}
                    >
                      ← Anterior
                    </button>

                    <div style={{ fontWeight: 700 }}>
                      {page} / {totalPages}
                    </div>

                    <button
                      type="button"
                      className="btn btn-danger px-4"
                      onClick={handleNext}
                      disabled={!canNext}
                    >
                      VER MÁS →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Catalogo;
