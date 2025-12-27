import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import { BsCart, BsPerson, BsSearch } from "react-icons/bs";
import categoriaPublicService from "../../services/categoria.public.service";
import busquedaService from "../../services/busqueda.public.service";
import CartDrawer from "../cart/CartDrawer";
import { cartStore } from "../../utils/cartStore";
import "./ClienteNavbar.css";

const ClienteNavbar = () => {
  const [categorias, setCategorias] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [tendencias, setTendencias] = useState([]);
  const [mostrarTendencias, setMostrarTendencias] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => cartStore.getItems());
  const [cartCount, setCartCount] = useState(() => cartStore.getCount());

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [cats, tens] = await Promise.all([
          categoriaPublicService.listarMenu(),
          busquedaService.obtenerTendencias()
        ]);
        setCategorias(cats || []);
        setTendencias(tens || []);
      } catch (e) { console.error(e); }
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    return cartStore.subscribe((items) => {
      setCartItems(items);
      setCartCount(items.reduce((acc, it) => acc + Number(it.qty ?? 1), 0));
    });
  }, []);

  const manejarBusqueda = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const q = terminoBusqueda.trim();
      if (q) {
        await busquedaService.registrarBusqueda(q);
        navigate(`/Catalogo?search=${encodeURIComponent(q)}`);
      } else {
        navigate("/Catalogo");
      }
      setMostrarTendencias(false);
    }
  };

  const handleSubCategoryClick = (subId) => {
    setActiveMenu(null);
    navigate(`/Catalogo?categoriaId=${subId}`);
  };

  return (
    <>
      <div className="bg-black text-white text-center py-1 small">Envío gratis por compras mayores a S/139</div>
      <Navbar bg="white" expand="lg" className="py-0 border-bottom sticky-top">
        <Container fluid>
         <Navbar.Brand 
            onClick={() => window.location.href = "/Catalogo"} 
            style={{ cursor: 'pointer' }}
          >
            <img src="/img/logoCliente.png" alt="Logo" height="70" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto gap-4">
              {categorias.map((cat) => (
                <div key={cat.id} className="mega-parent" onMouseEnter={() => setActiveMenu(cat.id)}>
                  <Nav.Link className="fw-bold text-uppercase nav-item-custom">{cat.nombre}</Nav.Link>
                  {activeMenu === cat.id && (
                    <div className="mega-menu shadow" onMouseLeave={() => setActiveMenu(null)}>
                      <div className="mega-inner">
                        <div className="mega-left">
                          <div className="mega-left-title">{cat.nombre}</div>
                          <ul className="mega-left-links">
                            <li><button className="mega-left-link" onClick={() => handleSubCategoryClick(cat.id)}>Novedades</button></li>
                            <li><button className="mega-left-link" onClick={() => handleSubCategoryClick(cat.id)}>Ofertas</button></li>
                            <li><button className="mega-left-link mega-left-link-all" onClick={() => handleSubCategoryClick(cat.id)}>Ver todo →</button></li>
                          </ul>
                        </div>
                        <div className="mega-right">
                          {cat.subCategorias?.map((sub) => (
                            <button key={sub.id} className="mega-tile" onClick={() => handleSubCategoryClick(sub.id)}>
                              <div className="mega-tile-thumb">
                                {sub.imagenUrl ? <img src={sub.imagenUrl} alt={sub.nombre} /> : <div className="mega-tile-thumb-placeholder" />}
                              </div>
                              <div className="mega-tile-text">
                                <div className="mega-tile-name">{sub.nombre}</div>
                                {sub.descripcion && <div className="mega-tile-desc">{sub.descripcion}</div>}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </Nav>
            <div className="d-flex align-items-center gap-3">
              <div className="position-relative">
                <Form className="d-flex border rounded px-2 align-items-center">
                  <FormControl
                    type="search"
                    placeholder="Buscar..."
                    className="border-0 shadow-none"
                    value={terminoBusqueda}
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                    onKeyDown={manejarBusqueda}
                    onFocus={() => setMostrarTendencias(true)}
                  />
                  <BsSearch className="text-muted" />
                </Form>
              </div>
              <BsPerson size={20} />
              <button className="btn p-0 position-relative" onClick={() => setCartOpen(true)}>
                <BsCart size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartCount}</span>
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartDrawer open={cartOpen} items={cartItems} onClose={() => setCartOpen(false)} onInc={(k) => cartStore.inc(k)} onDec={(k) => cartStore.dec(k)} onRemove={(k) => cartStore.remove(k)} onQty={(k, v) => cartStore.setQty(k, v)} />
    </>
  );
};

export default ClienteNavbar;