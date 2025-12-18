import { useEffect, useState } from 'react';
import categoriaService from '../../services/categoria.service';
import CategoriaForm from '../../components/categoria/CategoriaForm'; 
import CategoriaTabla from '../../components/categoria/CategoriaTabla'; 

const CategoriasPage = () => {
    const [categorias, setCategorias] = useState([]);
    
    // CAMPOS DEL FORMULARIO
    const [idEditar, setIdEditar] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');
    
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    // --- CARGAR DATOS ---
    const recargarTabla = async () => {
        try {
            const data = await categoriaService.getAll();
            setCategorias(data);
        } catch (error) { console.log(error); }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { recargarTabla(); }, []);

    // --- CARGAR DATOS EN FORMULARIO (MODO EDICIÓN) ---
    const cargarDatosEdicion = (cat) => {
        setIdEditar(cat.id);
        setNombre(cat.nombre);
        setDescripcion(cat.descripcion || ''); // Evita error si es null
        setImagenUrl(cat.imagenUrl || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const limpiarFormulario = () => {
        setIdEditar(null); setNombre(''); setDescripcion(''); setImagenUrl('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Preparamos el objeto tal cual lo espera CategoriaDTO.java
            const categoriaDTO = { 
                nombre, 
                descripcion, 
                imagenUrl
            };

            // Si estamos editando, le agregamos el ID
            if (idEditar) {
                categoriaDTO.id = idEditar;
            }
            
            // Llamamos a guardar (Tu backend decide si es create o update)
            await categoriaService.guardar(categoriaDTO);
            
            setMensaje({ 
                tipo: 'success', 
                texto: idEditar ? '✏️ Categoría actualizada' : '✅ Categoría creada' 
            });

            limpiarFormulario();
            recargarTabla();
        } catch (error) {
            console.log(error);
            setMensaje({ tipo: 'danger', texto: 'Error al guardar la categoría' });
        }
        setTimeout(() => setMensaje({ tipo: '', texto: '' }), 4000);
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 className="fw-bold text-dark mb-0"><i className="bi bi-grid-fill text-primary me-2"></i>Gestión de Categorías</h2>
                    <p className="text-muted mb-0 mt-1">Administra las categorías de tus productos.</p>
                </div>
                <button className="btn btn-light rounded-circle shadow-sm" onClick={recargarTabla} title="Refrescar">
                    <i className="bi bi-arrow-clockwise fs-5 text-primary"></i>
                </button>
            </div>

            <div className="row g-4">
                <div className="col-lg-4">
                    <CategoriaForm 
                        handleSubmit={handleSubmit}
                        nombre={nombre} setNombre={setNombre}
                        descripcion={descripcion} setDescripcion={setDescripcion}
                        imagenUrl={imagenUrl} setImagenUrl={setImagenUrl}
                        idEditar={idEditar}
                        limpiarFormulario={limpiarFormulario}
                        mensaje={mensaje}
                    />
                </div>

                <div className="col-lg-8">
                    <CategoriaTabla 
                        categorias={categorias}
                        cargarDatosEdicion={cargarDatosEdicion}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoriasPage;