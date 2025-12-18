import { useEffect, useState } from 'react';
import productoService from '../../services/producto.service';
import tallaService from '../../services/talla.service';
import colorService from '../../services/color.service';
import inventarioService from '../../services/inventario.service';
import { exportarInventarioExcel } from '../../utils/excelExport';

import InventarioForm from '../../components/inventario/InventarioForm';
import InventarioTabla from '../../components/inventario/InventarioTabla';


const InventarioPage = () => {
    const [productos, setProductos] = useState([]);
    const [tallas, setTallas] = useState([]);
    const [colores, setColores] = useState([]);

    const [productoIdSeleccionado, setProductoIdSeleccionado] = useState('');
    const [inventario, setInventario] = useState([]); 

    const [form, setForm] = useState({ tallaId: '', colorId: '', stock: '', sku: '' });
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    // 1. CARGAR MAESTROS Y EL INVENTARIO COMPLETO AL INICIO
    useEffect(() => {
        const cargarDatosIniciales = async () => {
            try {
                const [p, t, c, inv] = await Promise.all([
                    productoService.getAll(),
                    tallaService.getAll(),
                    colorService.getAll(),
                    inventarioService.getAll() // <--- ¡AQUÍ CARGAMOS TODO DE UNA!
                ]);
                setProductos(p);
                setTallas(t);
                setColores(c);
                setInventario(inv);
            } catch (error) { console.error(error); }
        };
        cargarDatosIniciales();
    }, []);

    // 2. FILTRAR CUANDO ELIGES UN PRODUCTO
    const handleProductoChange = async (e) => {
        const id = e.target.value;
        setProductoIdSeleccionado(id);
        setForm({ tallaId: '', colorId: '', stock: '', sku: '' }); // Limpiar form
        
        try {
            if (id) {
                // Si elige uno, traemos solo ese
                const data = await inventarioService.getPorProducto(id);
                setInventario(data);
            } else {
                // Si selecciona "-- Buscar Producto --" (vacío), volvemos a traer TODO
                const allData = await inventarioService.getAll();
                setInventario(allData);
            }
        } catch (error) { console.error(error); }
    };

    // 3. GUARDAR (Crear o Actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dto = {
                productoId: productoIdSeleccionado,
                tallaId: form.tallaId,
                colorId: form.colorId,
                stock: form.stock,
                sku: form.sku
            };

            await inventarioService.guardar(dto);
            setMensaje({ tipo: 'success', texto: 'Stock actualizado correctamente' });
            
            // Recargar tabla según lo que esté seleccionado
            if (productoIdSeleccionado) {
                const data = await inventarioService.getPorProducto(productoIdSeleccionado);
                setInventario(data);
            } else {
                // Caso raro (si editaste desde la tabla global), recargamos todo
                const allData = await inventarioService.getAll();
                setInventario(allData);
            }
            
            limpiarFormulario();
        } catch (error) {
            console.error(error);
            setMensaje({ tipo: 'danger', texto: 'Error al guardar. Verifica que todos los campos estén llenos.' });
        }
        setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
    };

    const cargarDatosEdicion = (item) => {
        // Al editar desde la tabla global, debemos fijar el producto en el select también
        if (!productoIdSeleccionado) {
            setProductoIdSeleccionado(item.productoId); // Esto activará el formulario
        }
        
        setForm({
            tallaId: item.tallaId,
            colorId: item.colorId,
            stock: item.stock,
            sku: item.sku || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const limpiarFormulario = () => {
        setForm({ tallaId: '', colorId: '', stock: '', sku: '' });
    };

    // Objeto del producto seleccionado (para mostrar nombre en el título del form)
    const productoObj = productos.find(p => p.id === parseInt(productoIdSeleccionado));

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-4 fw-bold">
                <i className="bi bi-upc-scan me-2"></i>Control de Inventario</h2>

                {/* BOTÓN DE EXPORTACIÓN */}
                <button 
                    className="btn btn-success d-flex align-items-center gap-2 shadow-sm"
                    onClick={() => exportarInventarioExcel(inventario)}
                    disabled={inventario.length === 0}
                >
                    <i className="bi bi-file-earmark-excel fs-5"></i>
                    <span>Exportar Stock</span>
                </button>
            </div>

            {/* SELECTOR DE PRODUCTO */}
            <div className="card border-0 shadow-sm p-4 mb-4 bg-white rounded-4">
                <label className="form-label fw-bold text-muted small text-uppercase">Filtrar / Gestionar Producto:</label>
                <select className="form-select form-select-lg border-2" value={productoIdSeleccionado} onChange={handleProductoChange}>
                    <option value="">-- Ver Todo el Inventario --</option>
                    {productos.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.nombre} ({p.nombreMarca})
                        </option>
                    ))}
                </select>
            </div>

            {/* FORMULARIO (Solo visible si hay un producto seleccionado) */}
            {productoIdSeleccionado && (
                <InventarioForm 
                    handleSubmit={handleSubmit} 
                    form={form} setForm={setForm}
                    tallas={tallas} colores={colores}
                    productoSeleccionado={productoObj}
                    limpiarFormulario={limpiarFormulario}
                    mensaje={mensaje}
                />
            )}

            {/* TABLA SIEMPRE VISIBLE (Muestra todo o filtrado) */}
            <InventarioTabla 
                inventario={inventario} 
                cargarDatosEdicion={cargarDatosEdicion} 
            />
        </div>
    );
};

export default InventarioPage;