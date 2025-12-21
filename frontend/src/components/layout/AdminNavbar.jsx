import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import authService from '../../services/auth.service';

const AdminNavbar = ({ darkMode, toggleTheme, bajoStockCount, notificaciones }) => {
    const navigate = useNavigate();
    const [verNotis, setVerNotis] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);

    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar Sesión?',
            text: "Tendrás que ingresar tus credenciales nuevamente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar',
            background: darkMode ? '#1f2937' : '#fff',
            color: darkMode ? '#f3f4f6' : '#000'
        }).then((result) => {
            if (result.isConfirmed) {
                authService.logout();
                navigate('/login');
            }
        });
    };

    return (
        <nav className={`navbar navbar-expand-lg border-bottom mb-4 ${darkMode ? 'navbar-dark bg-dark border-secondary' : 'navbar-dark bg-dark shadow-lg'}`} style={{ minHeight: '70px' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/admin/dashboard">
                    <span className="bg-primary text-white rounded-3 px-2 py-1 me-2 d-flex align-items-center justify-content-center">
                        <i className="bi bi-shop"></i>
                    </span>
                    <span>TopiTop Admin</span>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto ms-lg-4">
                        <li className="nav-item me-2">
                            <Link className="nav-link" to="/admin/dashboard">
                                <i className="bi bi-house-door me-1"></i>Inicio
                            </Link>
                        </li>

                        {/* MENÚ DESPLEGABLE CATÁLOGO */}
                        <li className="nav-item dropdown me-2">
                            <button
                                className={`nav-link dropdown-toggle btn btn-link text-decoration-none ${menuAbierto ? 'show' : ''}`}
                                onClick={() => setMenuAbierto(!menuAbierto)}
                                style={{ border: 'none' }}
                            >
                                <i className="bi bi-grid-fill me-1"></i>Catálogo
                            </button>

                            <ul className={`dropdown-menu border-0 shadow-lg rounded-3 p-2 ${menuAbierto ? 'show' : ''}`} data-bs-popper="static">
                                <li><h6 className="dropdown-header text-uppercase small fw-bold text-muted">Gestión Principal</h6></li>
                                <li onClick={() => setMenuAbierto(false)}>
                                    <Link className="dropdown-item rounded-2 py-2" to="/admin/productos"><i className="bi bi-box-seam text-primary me-2"></i>Productos</Link>
                                </li>
                                <li onClick={() => setMenuAbierto(false)}>
                                    <Link className="dropdown-item rounded-2 py-2" to="/admin/categorias"><i className="bi bi-tags text-info me-2"></i>Categorías</Link>
                                </li>
                                <li onClick={() => setMenuAbierto(false)}>
                                    <Link className="dropdown-item rounded-2 py-2" to="/admin/marcas"><i className="bi bi-award text-warning me-2"></i>Marcas</Link>
                                </li>
                                <li><hr className="dropdown-divider my-2" /></li>
                                <li><h6 className="dropdown-header text-uppercase small fw-bold text-muted">Variantes</h6></li>
                                <li onClick={() => setMenuAbierto(false)}>
                                    <Link className="dropdown-item rounded-2 py-2" to="/admin/tallas"><i className="bi bi-ruler text-secondary me-2"></i>Tallas</Link>
                                </li>
                                <li onClick={() => setMenuAbierto(false)}>
                                    <Link className="dropdown-item rounded-2 py-2" to="/admin/colores"><i className="bi bi-palette text-danger me-2"></i>Colores</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item me-2">
                            <Link className="nav-link text-warning fw-bold" to="/admin/inventario">
                                <i className="bi bi-upc-scan me-1"></i>Inventario
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-info fw-bold" to="/admin/ventas">
                                <i className="bi bi-receipt me-1"></i>Ventas
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3 border-start border-secondary ps-3 ms-3">

                        {/* CAMPANA DE NOTIFICACIONES CON ICONOS DE VARIANTE */}
                        <div className="dropdown">
                            <button className="btn btn-link p-0 position-relative text-decoration-none" onClick={() => setVerNotis(!verNotis)}>
                                <i className={`bi bi-bell-fill fs-5 ${bajoStockCount > 0 ? 'text-danger animate-pulse' : 'text-secondary'}`}></i>
                                {bajoStockCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                                        {bajoStockCount}
                                    </span>
                                )}
                            </button>

                            <ul className={`dropdown-menu dropdown-menu-end shadow-lg border-0 mt-3 p-0 ${verNotis ? 'show' : ''}`} style={{ width: '320px', right: 0 }}>
                                <li className="p-3 border-bottom bg-primary text-white rounded-top text-center">
                                    <h6 className="mb-0 fw-bold"><i className="bi bi-exclamation-octagon me-2"></i>Alertas de Inventario</h6>
                                </li>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {notificaciones && notificaciones.length > 0 ? (
                                        notificaciones.map(noti => (
                                            <li key={noti.id} className="p-3 border-bottom hover-bg-light">
                                                <Link to="/admin/inventario" className="text-decoration-none" onClick={() => setVerNotis(false)}>
                                                    <div className="d-flex flex-column gap-1">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            {/* Accedemos a noti.producto.nombre */}
                                                            <span className="text-dark small fw-bold text-truncate" style={{ maxWidth: '180px' }}>
                                                                {noti.nombreProducto || 'Producto sin nombre'}
                                                            </span>
                                                            <span className="badge bg-danger">{noti.stock} unids.</span>
                                                        </div>
                                                        <div className="d-flex gap-2">
                                                            {/* Accedemos a noti.talla.valor y noti.color.nombre */}
                                                            <span className="text-muted extra-small">
                                                                <i className="bi bi-ruler me-1"></i>{noti.nombreTalla}                                                            </span>
                                                            <span className="text-muted extra-small">
                                                                <i className="bi bi-palette me-1"></i>{noti.nombreColor}                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="p-4 text-center text-muted small">
                                            <i className="bi bi-check2-circle d-block fs-3 text-success mb-2"></i>
                                            Todo el stock está al día
                                        </li>
                                    )}
                                </div>
                                <li className="p-2 text-center bg-light rounded-bottom">
                                    <Link to="/admin/inventario" className="small fw-bold text-primary text-decoration-none" onClick={() => setVerNotis(false)}>
                                        Ir al Almacén <i className="bi bi-arrow-right-short"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* BOTÓN MODO OSCURO */}
                        <button
                            className={`btn btn-sm rounded-circle ${darkMode ? 'btn-warning' : 'btn-outline-light'}`}
                            onClick={toggleTheme}
                            style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <i className={`bi ${darkMode ? 'bi-sun-fill text-dark' : 'bi-moon-stars-fill'}`}></i>
                        </button>

                        <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2" onClick={handleLogout}>
                            <span>Salir</span> <i className="bi bi-box-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;