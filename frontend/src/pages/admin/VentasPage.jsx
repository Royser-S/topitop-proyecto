import { useEffect, useState } from 'react';
import ordenService from '../../services/orden.service';
import VentasTabla from '../../components/ventas/VentasTabla';
import VentasDetalleModal from '../../components/ventas/VentasDetalleModal';
import { exportarVentasExcel } from '../../utils/excelExport'; //

const VentasPage = () => {
    const [ordenes, setOrdenes] = useState([]);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null); 

    // 1. CARGA DE DATOS
    const cargarVentas = async () => {
        try {
            const data = await ordenService.getAllOrdenes();
            setOrdenes(data);
        } catch (error) { 
            console.log(error); 
        }
    };

    useEffect(() => {
        cargarVentas();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

    // 2. MANEJO DE ESTADOS (Lógica de Negocio)
    const handleCambiarEstado = async (id, nuevoEstado) => {
        if (!window.confirm(`¿Confirmas cambiar el estado a: ${nuevoEstado}?`)) return;
        try {
            await ordenService.cambiarEstado(id, nuevoEstado);
            cargarVentas(); 
            if (ordenSeleccionada) setOrdenSeleccionada(null); 
        } catch (error) { 
            console.log(error);
            alert("Error al cambiar estado"); 
        }
    };

    return (
        <div className="container py-5">
            {/* CABECERA CON BOTÓN DE EXPORTACIÓN */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">
                    <i className="bi bi-cash-coin me-2"></i>Gestión de Ventas
                </h2>
                
                <button 
                    className="btn btn-success d-flex align-items-center gap-2 shadow-sm"
                    onClick={() => exportarVentasExcel(ordenes)} //
                    disabled={ordenes.length === 0}
                >
                    <i className="bi bi-file-earmark-excel fs-5"></i>
                    <span>Exportar Reporte</span>
                </button>
            </div>

            {/* A. COMPONENTE TABLA */}
            <VentasTabla 
                ordenes={ordenes} 
                onVerDetalle={setOrdenSeleccionada} 
                onCambiarEstado={handleCambiarEstado}
            />

            {/* B. COMPONENTE MODAL */}
            <VentasDetalleModal 
                orden={ordenSeleccionada} 
                onClose={() => setOrdenSeleccionada(null)} 
                onCambiarEstado={handleCambiarEstado}
            />
        </div>
    );
};

export default VentasPage;

