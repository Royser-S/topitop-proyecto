import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import { BsCart, BsPerson, BsSearch } from "react-icons/bs";

const TopitopNavbar = () => {
  return (
    <>
      {/* Barra superior */}
      <div className="bg-black text-white text-center py-1 small">
        Envío gratis por compras mayores a S/139
      </div>

      {/* Navbar principal */}
     <Navbar bg="white" expand="lg" className="py-0 d-flex align-items-center" >
         <Container fluid>
         <Navbar.Brand as={Link} to="/Catalogo">
             <img
              src="/img/logoCliente.png"
              alt="Topitop"
              height="70"
                 className="d-inline-block align-top"
            />
             </Navbar.Brand>


          <Navbar.Toggle />
          <Navbar.Collapse>
            {/* Menú */}
           <Nav className="mx-auto gap-3">
            <Nav.Link className="fw-bold">Mujer</Nav.Link>
             <Nav.Link className="fw-bold">Hombre</Nav.Link>
            <Nav.Link className="fw-bold">Infantil</Nav.Link>
            <Nav.Link className="fw-bold">Denim</Nav.Link>
             <Nav.Link className="fw-bold">Básicos</Nav.Link>
            <Nav.Link className="fw-bold">Outlet</Nav.Link>
            <Nav.Link className="fw-bold">Ayuda</Nav.Link>
            </Nav>

            {/* Buscador + iconos */}
            <div className="d-flex align-items-center gap-3">
              <Form className="d-flex border rounded px-2">
                <FormControl
                  type="search"
                  placeholder="Buscar productos..."
                  className="border-0 shadow-none"
                />
                <BsSearch className="mt-2" />
              </Form>

              <BsPerson size={20} />
              <div className="position-relative">
                <BsCart size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                </span>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TopitopNavbar;
