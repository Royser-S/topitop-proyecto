import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom"; // Importante para detectar cambios en la URL
import TopitopNavbar from "../../components/layout/ClienteNavbar";
import HomeBanner from "../../components/banner/HomeBanner";
import FiltersBar from "../../components/filters/FiltersBar";
import ProductGrid from "../../components/producto/ProductGrid";
import Footer from "../../components/footer/Footer";
import productoPublicService from "../../services/producto.public.service";
import { cartStore } from "../../utils/cartStore";

const PAGE_SIZE = 6;

const Catalogo = () => {
  const location = useLocation(); // Hook para leer la URL
  const [products, setProducts] = useState([]);
  const [selectedCategoriaIds, setSelectedCategoriaIds] = useState([]);
  const [selectedMarcaIds, setSelectedMarcaIds] = useState([]);
  const [selectedTallaIds, setSelectedTallaIds] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // producto en modo detalle
  const [detailProduct, setDetailProduct] = useState(null);
  const [detailImageIndex, setDetailImageIndex] = useState(0);

  // 1. ESCUCHAR CAMBIOS EN LA URL (Para categorías y búsquedas)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catId = params.get("categoriaId");
    const searchQ = params.get("search");

    if (catId) {
      setSelectedCategoriaIds([Number(catId)]);
    }

    // Reiniciar estados al navegar
    setDetailProduct(null);
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search]);

  // Carrito
  const handleAdd = (product) => {
    cartStore.add({
      ...product,
      qty: product.qty ?? 1,
    });
  };

  // Carga de productos
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const data = await productoPublicService.listarPublicos();
        const productosAdaptados = (data ?? []).map((p) => ({
          id: p.id,
          brand: p.nombreMarca,
          title: p.nombre,
          image: p.imagenes?.[0] || "/img/no-image.png",
          images: p.imagenes ?? [],
          price: Number(p.precio),
          oldPrice: p.precioDescuento ? Number(p.precio) + Number(p.precioDescuento) : null,
          discountPercent: p.precioDescuento ? Math.round((p.precioDescuento / p.precio) * 100) : null,
          descripcion: p.descripcion ?? "",
          categoriaId: p.categoriaId ?? p.categoria?.id ?? p.idCategoria,
          marcaId: p.marcaId ?? p.marca?.id ?? p.idMarca,
          tallaId: p.tallaId ?? p.talla?.id ?? p.idTalla,
        }));
        setProducts(productosAdaptados);
      } catch (err) {
        setError("❌ No se pudo cargar el catálogo");
      } finally {
        setLoading(false);
      }
    };
    cargarProductos();
  }, []);

  // FILTRADO DINÁMICO
  const filteredProducts = useMemo(() => {
    let list = products;

    // Filtro por Categoría (Padre o Hijo)
    if (selectedCategoriaIds.length > 0) {
      const setCat = new Set(selectedCategoriaIds.map(Number));
      list = list.filter((p) => setCat.has(Number(p.categoriaId)));
    }

    // Filtro por Buscador (Si hay texto en la URL)
    const params = new URLSearchParams(location.search);
    const searchQ = params.get("search")?.toLowerCase();
    if (searchQ) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(searchQ) || 
        p.brand?.toLowerCase().includes(searchQ)
      );
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
  }, [products, selectedCategoriaIds, selectedMarcaIds, selectedTallaIds, location.search]);

  // Paginación
  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE)), [filteredProducts]);
  const pageProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);

  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const canNext = page < totalPages;
  const canPrev = page > 1;

  const handleViewDetail = (product) => {
    setDetailProduct(product);
    setDetailImageIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    setDetailProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBannerCategoria = (id) => {
    setSelectedCategoriaIds([Number(id)]);
    setPage(1);
  };

  return (
    <>
      <TopitopNavbar />
      {detailProduct ? (
        <div className="container-fluid py-4 px-5">
          <button className="btn btn-link px-0 mb-3 text-secondary" onClick={handleBackToList}>
            ← Volver al catálogo
          </button>
          <div className="row align-items-start g-4">
            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-12 border rounded bg-white p-2">
                  <img src={detailProduct.images?.[detailImageIndex] || detailProduct.image} alt={detailProduct.title} className="img-fluid w-100" style={{ maxHeight: "650px", objectFit: "contain" }} />
                </div>
                {detailProduct.images?.map((img, idx) => (
                  <div key={idx} className="col-4 col-md-3" onClick={() => setDetailImageIndex(idx)} style={{ cursor: "pointer" }}>
                    <div className={`border rounded bg-white p-1 ${idx === detailImageIndex ? "border-dark" : ""}`}>
                      <img src={img} alt="thumb" className="img-fluid w-100" style={{ height: "160px", objectFit: "cover" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5">
              <h5 className="text-uppercase text-muted mb-1">{detailProduct.brand}</h5>
              <h1 className="fw-bold mb-3">{detailProduct.title}</h1>
              <div className="d-flex align-items-baseline gap-3 mb-4">
                <span className="fs-2 fw-bold">S/ {detailProduct.price.toFixed(2)}</span>
                {detailProduct.oldPrice && <span className="text-muted text-decoration-line-through">S/ {detailProduct.oldPrice.toFixed(2)}</span>}
              </div>
              <p className="text-muted fs-5 mb-4">{detailProduct.descripcion}</p>
              <button className="btn btn-dark btn-lg px-5 py-3" onClick={() => handleAdd(detailProduct)}>Añadir al carrito</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <HomeBanner onSelectCategoria={handleBannerCategoria} />
          <FiltersBar 
            onChangeCategoriaIds={setSelectedCategoriaIds} 
            onChangeMarcaIds={setSelectedMarcaIds} 
            onChangeTallaIds={setSelectedTallaIds} 
          />
          <div className="container-fluid mt-4 px-4">
            {loading ? <p>Cargando productos...</p> : error ? <div className="alert alert-danger">{error}</div> : (
              <>
                <ProductGrid products={pageProducts} onAdd={handleAdd} onView={handleViewDetail} />
                {filteredProducts.length > 0 && (
                  <div className="d-flex justify-content-center align-items-center gap-3 my-4">
                    <button className="btn btn-outline-dark px-4" onClick={handlePrev} disabled={!canPrev}>← Anterior</button>
                    <div style={{ fontWeight: 700 }}>{page} / {totalPages}</div>
                    <button className="btn btn-danger px-4" onClick={handleNext} disabled={!canNext}>VER MÁS →</button>
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