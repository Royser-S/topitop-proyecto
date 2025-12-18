import { useEffect, useState } from 'react';
import productoService from '../../services/producto.service';
import marcaService from '../../services/marca.service';       
import categoriaService from '../../services/categoria.service'; 
import { exportarProductosExcel } from '../../utils/excelExport';

import ProductoForm from '../../components/producto/ProductoForm';
import ProductoTabla from '../../components/producto/ProductoTabla';

const ProductosPage = () => {
    // --- ESTADOS ---
    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);      
    const [categorias, setCategorias] = useState([]); 

    const [form, setForm] = useState({
        nombre: '', precio: '', precioDescuento: '', descripcion: '', 
        marcaId: '', categoriaId: '', imagenesTexto: '', destacado: false
    });
    const [idEditar, setIdEditar] = useState(null);
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    // --- CARGA DE DATOS ---
    const cargarDatos = async () => {
        try {
            const [prodsData, marcasData, catsData] = await Promise.all([
                productoService.getAll(),
                marcaService.getAll(),      
                categoriaService.getAll()   
            ]);
            setProductos(prodsData);
            setMarcas(marcasData);
            setCategorias(catsData);
        } catch (error) {
            console.error("Error cargando datos:", error);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { cargarDatos(); }, []);

    // --- GUARDAR ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imagenesArray = form.imagenesTexto 
                ? form.imagenesTexto.split(',').map(url => url.trim()).filter(url => url !== '') 
                : [];

            const productoDTO = { ...form, imagenes: imagenesArray };
            if (idEditar) productoDTO.id = idEditar;

            await productoService.guardar(productoDTO);
            
            setMensaje({ tipo: 'success', texto: idEditar ? 'Producto actualizado' : 'Producto creado' });
            limpiarFormulario();
            cargarDatos(); 
        } catch (error) {
            console.log(error);
            setMensaje({ tipo: 'danger', texto: 'Error al guardar' });
        }
        setTimeout(() => setMensaje({ tipo: '', texto: '' }), 4000);
    };

    // --- CAMBIAR ESTADO (Reemplaza a eliminar) ---
    const handleToggleEstado = async (prod) => {
        try {
            await productoService.toggleEstado(prod.id);
            cargarDatos(); 
        } catch (error) { 
            console.log(error);
            alert("Error al cambiar estado"); 
        }
    };

    // --- UTILS ---
    const cargarDatosEdicion = (prod) => {
        setIdEditar(prod.id);
        setForm({
            nombre: prod.nombre,
            precio: prod.precio,
            precioDescuento: prod.precioDescuento || '',
            descripcion: prod.descripcion || '',
            marcaId: prod.marcaId || '', 
            categoriaId: prod.categoriaId || '',
            imagenesTexto: prod.imagenes ? prod.imagenes.join(', ') : '',
            destacado: prod.destacado || false
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const limpiarFormulario = () => {
        setIdEditar(null);
        setForm({
            nombre: '', precio: '', precioDescuento: '', descripcion: '', 
            marcaId: '', categoriaId: '', imagenesTexto: '', destacado: false
        });
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-4 fw-bold">
                <i className="bi bi-box-seam-fill me-2"></i>Gestión de Productos</h2>
                {/* BOTÓN DE EXPORTACIÓN */}
                <button 
                    className="btn btn-outline-success d-flex align-items-center gap-2 shadow-sm"
                    onClick={() => exportarProductosExcel(productos)}
                    disabled={productos.length === 0}
                >
                    <i className="bi bi-file-earmark-excel fs-5"></i>
                    <span>Descargar Catálogo</span>
                </button>
            </div>
            <div className="row g-4">
                <div className="col-lg-5">
                    <ProductoForm 
                        handleSubmit={handleSubmit} form={form} setForm={setForm}
                        marcas={marcas} categorias={categorias}
                        idEditar={idEditar} limpiarFormulario={limpiarFormulario} 
                        mensaje={mensaje} 
                    />
                </div>
                <div className="col-lg-7">
                    <ProductoTabla 
                        productos={productos} 
                        cargarDatosEdicion={cargarDatosEdicion} 
                        handleToggleEstado={handleToggleEstado} 
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductosPage;