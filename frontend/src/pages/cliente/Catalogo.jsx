import { useEffect, useState } from "react";
import TopitopNavbar from "../../components/layout/ClienteNavbar";
import HomeBanner from "../../components/banner/HomeBanner";
import FiltersBar from "../../components/filters/FiltersBar";
import ProductGrid from "../../components/producto/ProductGrid";
import Footer from "../../components/footer/Footer";
import productoPublicService from "../../services/producto.public.service";

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleAdd = (product) => {
    console.log("Agregar al carrito:", product);
  };

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await productoPublicService.listarPublicos();

        const productosAdaptados = data.map(p => ({
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
            : null
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

  return (
    <>
      <TopitopNavbar />
      <HomeBanner />
      <FiltersBar />

      <div className="container mt-4">
        <h4>Catálogo</h4>

        {loading && <p>Cargando productos...</p>}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <ProductGrid products={products} onAdd={handleAdd} />
        )}
      </div>

      <Footer />
    </>
  );
};

export default Catalogo;
