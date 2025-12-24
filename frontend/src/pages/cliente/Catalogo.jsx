import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import TopitopNavbar from "../../components/layout/ClienteNavbar";
import HomeBanner from "../../components/banner/HomeBanner";
import FiltersBar from "../../components/filters/FiltersBar";
import ProductGrid from "../../components/producto/ProductGrid";
import Footer from "../../components/footer/Footer";
import productoPublicService from "../../services/producto.public.service";
import { cartStore } from "../../utils/cartStore"; // ✅ NUEVO (Funcionalidad Carrito)

const PAGE_SIZE = 6;

const Catalogo = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  
  // Estados de datos y filtros
  const [products, setProducts] = useState([]);
  const [selectedCategoriaIds, setSelectedCategoriaIds] = useState([]);
  const [selectedMarcaIds, setSelectedMarcaIds] = useState([]);
  const [selectedTallaIds, setSelectedTallaIds] = useState([]);
  
  // Estados de UI
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ LOGICA UNIFICADA: Ahora agrega al carrito real usando el store
  const handleAdd = (product, opts = {}) => {
    // opts.size se usará si tu ProductGrid envía la talla seleccionada
    cartStore.add(product, { size: opts.size });
  };

  // Carga de productos desde el servicio
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
          price: Number(p.precio),
          oldPrice: p.precioDescuento ? Number(p.precio) + Number(p.precioDescuento) : null,
          discountPercent: p.precioDescuento ? Math.round((p.precioDescuento / p.precio) * 100) : null,
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

  // ✅ TU LOGICA DE FILTRADO (100% intacta, incluyendo buscador y categorías de URL)
  const filteredProducts = useMemo(() => {
    let list = products;
    const params = new URLSearchParams(search);
    const querySearch = params.get("search")?.toLowerCase();
    const queryCatId = params.get("categoriaId");

    // 1. Filtro por Buscador URL
    if (querySearch) {
      list = list.filter((p) => 
        p.title.toLowerCase().includes(querySearch) || 
        p.brand.toLowerCase().includes(querySearch)
      );
    }

    // 2. Filtro por Categoría Nav URL
    if (queryCatId) {
      list = list.filter((p) => Number(p.categoriaId) === Number(queryCatId));
    }

    // 3. Filtros de FiltersBar
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
  }, [products, search, selectedCategoriaIds, selectedMarcaIds, selectedTallaIds]);

  // Reset de página al cambiar filtros
  useEffect(() => {
    setPage(1);
  }, [search, selectedCategoriaIds, selectedMarcaIds, selectedTallaIds]);

  // Paginación
  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE)), [filteredProducts.length]);
  
  const pageProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);

  // Handlers de navegación con scroll al inicio
  const handleNext = () => {
    setPage((p) => Math.min(p + 1, totalPages));
    
  };

  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 1));
   
  };

  return (
    <>
      <TopitopNavbar />
      <HomeBanner />
      <FiltersBar
        onChangeCategoriaIds={setSelectedCategoriaIds}
        onChangeMarcaIds={setSelectedMarcaIds}
        onChangeTallaIds={setSelectedTallaIds}
      />
      
      <div className="container-fluid mt-4 px-4">
        {loading && <p className="text-center">Cargando productos...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        
        {!loading && !error && (
          <>
            {/* ✅ TU LOGICA: Indicador de búsqueda activa */}
            {(new URLSearchParams(search).get("search") || new URLSearchParams(search).get("categoriaId")) && (
              <div className="d-flex align-items-center gap-3 mb-4">
                <h5 className="mb-0">
                  {new URLSearchParams(search).get("search") 
                    ? `Resultados para: "${new URLSearchParams(search).get("search")}"` 
                    : "Filtrado por categoría"}
                </h5>
                <button 
                  className="btn btn-outline-secondary btn-sm" 
                  onClick={() => navigate("/Catalogo")}
                >
                  Limpiar búsqueda ✕
                </button>
              </div>
            )}
            
            <ProductGrid products={pageProducts} onAdd={handleAdd} />

            {filteredProducts.length > 0 ? (
              <div className="d-flex justify-content-center align-items-center gap-3 my-4">
                <button 
                  type="button"
                  className="btn btn-outline-dark px-4" 
                  onClick={handlePrev} 
                  disabled={page === 1}
                >
                  ← Anterior
                </button>
                <div style={{ fontWeight: 700 }}>{page} / {totalPages}</div>
                <button 
                  type="button"
                  className="btn btn-danger px-4" 
                  onClick={handleNext} 
                  disabled={page === totalPages}
                >
                  VER MÁS →
                </button>
              </div>
            ) : (
              /* ✅ TU LOGICA: Mensaje de no resultados */
              <div className="text-center my-5 py-5 border rounded bg-light">
                <h4>No se encontraron productos</h4>
                <p className="text-muted">Intenta con otros términos o limpia los filtros.</p>
                <button className="btn btn-dark" onClick={() => navigate("/Catalogo")}>Ver todo el catálogo</button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Catalogo;