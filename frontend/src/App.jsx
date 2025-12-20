import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import LoginPage from './pages/admin/LoginPage';

// CORRECCIÓN IMPORTANTE: Ahora la ruta incluye "/layout/"
import AdminLayout from './components/layout/AdminLayout'; 

import MarcasPage from './pages/admin/MarcasPage'; 
import CategoriasPage from './pages/admin/CategoriasPage';
import ColoresPage from './pages/admin/ColoresPage';
import TallasPage from './pages/admin/TallaPage';
import ProductosPage from './pages/admin/ProductosPage';
import InventarioPage from './pages/admin/InventarioPage';
import VentasPage from './pages/admin/VentasPage';
import DashboardPage from './pages/admin/DashboardPage';
import Catalogo from './pages/cliente/Catalogo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Catalogo" element={<Catalogo />} />
        
        {/* Rutas Privadas (Admin) */}
        <Route path="/admin" element={<AdminLayout />}>
            <Route path="productos" element={<ProductosPage />} />
            <Route path="categorias" element={<CategoriasPage />} />
            <Route path="colores" element={<ColoresPage />} />
            <Route path="tallas" element={<TallasPage />} />
            <Route path="inventario" element={<InventarioPage />} />
            <Route path="ventas" element={<VentasPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="marcas" element={<MarcasPage />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/Catalogo" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;