import { useEffect, useMemo, useState } from "react";
import TopitopNavbar from "../../components/layout/ClienteNavbar";
import HomeBanner from "../../components/banner/HomeBanner";
import FiltersBar from "../../components/filters/FiltersBar";
import ProductGrid from "../../components/producto/ProductGrid";
import Footer from "../../components/footer/Footer";
import productoPublicService from "../../services/producto.public.service";

const PAGE_SIZE = 6;

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategoriaIds, setSelectedCategoriaIds] = useState([]);
  const [selectedMarcaIds, setSelectedMarcaIds] = useState([]);
  const [selectedTallaIds, setSelectedTallaIds] = useState([]);

  // ✅ paginado por páginas (no “infinite scroll”)
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleAdd = (product) => {
    console.log("Agregar al carrito:", product);
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
          price: Number(p.precio),
          oldPrice: p.precioDescuento
            ? Number(p.precio) + Number(p.precioDescuento)
            : null,
          discountPercent: p.precioDescuento
            ? Math.round((p.precioDescuento / p.precio) * 100)
            : null,

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

  // ✅ al cambiar filtros, vuelves a página 1
  useEffect(() => {
    setPage(1);
  }, [selectedCategoriaIds, selectedMarcaIds, selectedTallaIds]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  }, [filteredProducts.length]);

  const pageProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, page]);

  const handleNext = () => {
    setPage((p) => Math.min(p + 1, totalPages));
    // opcional: asegura que no te quedes “abajo” en la página
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canNext = page < totalPages;
  const canPrev = page > 1;

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
        {loading && <p>Cargando productos...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <>
            <ProductGrid products={pageProducts} onAdd={handleAdd} />

            {/* ✅ paginación tipo “Topitop”: cambia página, no agrega más abajo */}
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

      <Footer />
    </>
  );
};

export default Catalogo;
