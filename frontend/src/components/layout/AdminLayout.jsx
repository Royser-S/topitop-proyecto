import { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter'; // <--- 1. IMPORTAMOS EL FOOTER
import dashboardService from '../../services/dashboard.service';

const AdminLayout = () => {
    const location = useLocation(); 
    const token = localStorage.getItem('token');

    // --- TUS ESTADOS ORIGINALES ---
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [bajoStockCount, setBajoStockCount] = useState(0);
    const [notificaciones, setNotificaciones] = useState([]);

    // --- EFECTO DE TEMA (DARK MODE) ---
    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        
        // TRUCO: Agregamos la clase 'dark-mode' al body para que el CSS del Capibara funcione
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    // --- EFECTO DE DATOS (API) ---
    useEffect(() => {
        // Definimos la función DENTRO para evitar warnings de React
        const cargarAlertas = async () => {
            if (!token) return;
            try {
                const data = await dashboardService.getResumen();
                // Validamos que data exista
                if (data) {
                    setBajoStockCount(data.productosBajoStock || 0);
                    setNotificaciones(data.listaBajoStock || []);
                }
            } catch (e) {
                console.error("Error al sincronizar notificaciones:", e);
            }
        };

        // Ejecutar
        cargarAlertas();
        
        // Intervalo de 5 segundos (como tenías configurado)
        const interval = setInterval(cargarAlertas, 5000);
        return () => clearInterval(interval);
    }, [token, location.pathname]); // Se actualiza al cambiar de ruta

    // Función Toggle
    const toggleTheme = () => setDarkMode(!darkMode);

    // Protección de ruta
    if (!token) return <Navigate to="/login" />;

    return (
        // ESTRUCTURA FLEXBOX PARA EL FOOTER STICKY
        // Añadimos 'd-flex flex-column min-vh-100' para ocupar toda la pantalla
        <div className={`d-flex flex-column min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
            
            {/* BARRA DE NAVEGACIÓN */}
            <AdminNavbar
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                bajoStockCount={bajoStockCount}
                notificaciones={notificaciones}
            />

            {/* CONTENIDO PRINCIPAL */}
            {/* 'flex-grow-1' empuja el footer hacia abajo */}
            <div className="container pb-5 flex-grow-1">
                <Outlet />
            </div>

            {/* PIE DE PÁGINA (El Capibara) */}
            <AdminFooter />
            
        </div>
    );
};

export default AdminLayout;