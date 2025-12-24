import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import { BsCart, BsPerson, BsSearch } from "react-icons/bs";

// Servicios y Utilidades
import categoriaPublicService from "../../services/categoria.public.service";
import busquedaService from "../../services/busqueda.public.service"; 
import CartDrawer from "../cart/CartDrawer"; // ✅ Nuevo (Compañero)
import { cartStore } from "../../utils/cartStore"; // ✅ Nuevo (Compañero)

import "./ClienteNavbar.css";

const ClienteNavbar = () => {
  // --- TUS ESTADOS (Búsqueda y Categorías) ---
  const [categorias, setCategorias] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [tendencias, setTendencias] = useState([]);
  const [mostrarTendencias, setMostrarTendencias] = useState(false);
  
  // --- ESTADOS DEL COMPAÑERO (Carrito) ---
  const [cartOpen, setCartOpen] = useState(false); // Controla el Drawer
  const [cartItems, setCartItems] = useState(() => cartStore.getItems());
  const [cartCount, setCartCount] = useState(() => cartStore.getCount());

  const navigate = useNavigate();
  const location = useLocation();

  // --- TU LÓGICA: Sincronizar input con URL ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQ = params.get("search");
    if (searchQ) {
      setTerminoBusqueda(searchQ);
    } else if (location.pathname === "/Catalogo" && !params.get("search")) {
      setTerminoBusqueda("");
    }
  }, [location]);

  // --- TU LÓGICA: Carga inicial ---
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const dataCats = await categoriaPublicService.listarMenu();
        setCategorias(dataCats || []);
        const dataTendencias = await busquedaService.obtenerTendencias();
        setTendencias(dataTendencias || []);
      } catch (error) {
        console.error("Error cargando datos iniciales", error);
      }
    };
    cargarDatosIniciales();
  }, []);

  // --- LÓGICA DEL COMPAÑERO: Suscripción al carrito ---
  useEffect(() => {
    const unsub = cartStore.subscribe((items) => {
      setCartItems(items);
      setCartCount(items.reduce((acc, it) => acc + Number(it.qty ?? 1), 0));
    });
    return unsub;
  }, []);

  // --- TU LÓGICA: Manejo de Búsqueda y Tendencias ---
  const actualizarTendencias = async () => {
    try {
      const data = await busquedaService.obtenerTendencias();
      setTendencias(data || []);
    } catch (error) {
      console.error("Error al refrescar tendencias", error);
    }
  };

  const manejarBusqueda = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = terminoBusqueda.trim();
      
      if (query !== "") {
        try {
          await busquedaService.registrarBusqueda(query);
          await actualizarTendencias();
          setMostrarTendencias(false);
          navigate(`/Catalogo?search=${encodeURIComponent(query)}`);
        } catch (error) {
          console.error("Error al registrar búsqueda", error);
        }
      } else {
        setMostrarTendencias(false);
        navigate(`/Catalogo`); 
      }
    }
  };

  const handleSubCategoryClick = (subId) => {
    setActiveMenu(null);
    navigate(`/Catalogo?categoriaId=${subId}`);
  };

  return (
    <>
      <div className="bg-black text-white text-center py-1 small">
        Envío gratis por compras mayores a S/139
      </div>

      <Navbar bg="white" expand="lg" className="py-0 border-bottom sticky-top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/Catalogo">
            <img src="/img/logoCliente.png" alt="Topitop" height="70" />
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto gap-4">
              {categorias.map((cat) => (
                <div
                  key={cat.id}
                  className="position-relative"
                  onMouseEnter={() => setActiveMenu(cat.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Nav.Link className="fw-bold text-uppercase nav-item-custom">
                    {cat.nombre}
                  </Nav.Link>

                  {activeMenu === cat.id && (
                    <div className="mega-menu shadow">
                      <div className="container-fluid">
                        <div className="row">
                          {cat.subCategorias?.length > 0 ? (
                            cat.subCategorias.map((sub) => (
                              <div 
                                className="col-3 text-center cursor-pointer" 
                                key={sub.id}
                                onClick={() => handleSubCategoryClick(sub.id)}
                              >
                                <img
                                  src={sub.imagenUrl}
                                  alt={sub.nombre}
                                  className="img-fluid rounded mb-2"
                                />
                                <div className="fw-semibold">{sub.nombre}</div>
                              </div>
                            ))
                          ) : (
                            <div className="col text-center text-muted">Sin subcategorías</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </Nav>

            <div className="d-flex align-items-center gap-3">
              <div className="position-relative search-container">
                <Form className="d-flex border rounded px-2 align-items-center">
                  <FormControl
                    type="search"
                    placeholder="Buscar productos..."
                    className="border-0 shadow-none bg-transparent"
                    value={terminoBusqueda}
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                    onKeyDown={manejarBusqueda}
                    onFocus={() => setMostrarTendencias(true)}
                    onBlur={() => setTimeout(() => setMostrarTendencias(false), 200)}
                  />
                  <BsSearch className="text-muted" />
                </Form>

                {mostrarTendencias && (
                  <div className="tendencias-dropdown shadow-lg border rounded bg-white p-3">
                    <h6 className="tendencias-title">Términos más buscados:</h6>
                    <ul className="list-unstyled mb-0">
                      {tendencias.length > 0 ? (
                        tendencias.slice(0, 10).map((item, index) => (
                          <li key={index} className="tendencia-item" onClick={() => {
                            setTerminoBusqueda(item);
                            navigate(`/Catalogo?search=${encodeURIComponent(item)}`);
                            setMostrarTendencias(false);
                          }}>
                            <span className="tendencia-number">{index + 1}.</span>
                            <span className="tendencia-text">{item}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-muted small">No hay tendencias</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              
              <BsPerson size={20} className="cursor-pointer" />
              
              {/* ✅ BOTÓN DE CARRITO UNIFICADO (Usa tu estilo con lógica del compañero) */}
              <button
                type="button"
                className="btn p-0 border-0 bg-transparent position-relative"
                onClick={() => setCartOpen(true)}
                style={{ lineHeight: 0 }}
              >
                <BsCart size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ DRAWER DEL CARRITO (Funcionalidad del Compañero) */}
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onInc={(key) => cartStore.inc(key)}
        onDec={(key) => cartStore.dec(key)}
        onRemove={(key) => cartStore.remove(key)}
        onQty={(key, v) => cartStore.setQty(key, v)}
      />
    </>
  );
};

export default ClienteNavbar;