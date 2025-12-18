import { useEffect, useState } from 'react'; // Quitamos useCallback
import marcaService from '../../services/marca.service';
import MarcaForm from '../../components/marca/MarcaForm'; 
import MarcaTabla from '../../components/marca/MarcaTabla'; 

const MarcasPage = () => {
    // --- ESTADOS ---
    const [marcas, setMarcas] = useState([]);
    const [idEditar, setIdEditar] = useState(null);
    const [nombre, setNombre] = useState('');
    const [slug, setSlug] = useState(''); 
    const [urlImagen, setUrlImagen] = useState('');
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    // --- 1. FUNCIÓN NORMAL (Sin useCallback) ---
    const recargarTabla = async () => {
        try {
            const data = await marcaService.getAll();
            setMarcas(data);
        } catch (error) { 
            console.log(error); 
        }
    };

    // --- 2. USEEFFECT "A PRUEBA DE BALAS" ---
    useEffect(() => { 
        recargarTabla(); 
        // La siguiente línea mágica le dice a React: "Cállate y ejecútalo solo una vez"
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    // --- RESTO DE LA LÓGICA (IGUAL) ---
    const handleNombreChange = (e) => {
        const val = e.target.value;
        setNombre(val);
        if (!idEditar) {
             setSlug(val.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
        }
    };

    const cargarDatosEdicion = (marca) => {
        setIdEditar(marca.id);
        setNombre(marca.nombre);
        setSlug(marca.slug);
        setUrlImagen(marca.imagenLogo || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const limpiarFormulario = () => {
        setIdEditar(null); setNombre(''); setSlug(''); setUrlImagen('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const marca = { nombre, imagenLogo: urlImagen, slug, estado: true };
            
            if (idEditar) {
                await marcaService.update({ ...marca, id: idEditar });
                setMensaje({ tipo: 'success', texto: '✏️ Actualizado correctamente' });
            } else {
                await marcaService.create(marca);
                setMensaje({ tipo: 'success', texto: '✅ Creado correctamente' });
            }
            limpiarFormulario();
            recargarTabla();
        } catch (error) {
            console.log(error);
            setMensaje({ tipo: 'danger', texto: 'Error al guardar' });
        }
        setTimeout(() => setMensaje({ tipo: '', texto: '' }), 4000);
    };

    const handleToggleEstado = async (marca) => {
        try {
            await marcaService.toggleEstado(marca.id);
            recargarTabla();
        } catch (error) { console.log(error); }
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 className="fw-bold text-dark mb-0"><i className="bi bi-tags-fill text-primary me-2"></i>Catálogo de Marcas</h2>
                    <p className="text-muted mb-0 mt-1">Gestión avanzada de marcas.</p>
                </div>
                <button className="btn btn-light rounded-circle shadow-sm" onClick={recargarTabla} title="Refrescar">
                    <i className="bi bi-arrow-clockwise fs-5 text-primary"></i>
                </button>
            </div>

            <div className="row g-4">
                <div className="col-lg-4">
                    <MarcaForm 
                        handleSubmit={handleSubmit}
                        nombre={nombre} 
                        slug={slug}
                        urlImagen={urlImagen} setUrlImagen={setUrlImagen}
                        idEditar={idEditar}
                        limpiarFormulario={limpiarFormulario}
                        mensaje={mensaje}
                        handleNombreChange={handleNombreChange}
                    />
                </div>

                <div className="col-lg-8">
                    <MarcaTabla 
                        marcas={marcas}
                        handleToggleEstado={handleToggleEstado}
                        cargarDatosEdicion={cargarDatosEdicion}
                    />
                </div>
            </div>
        </div>
    );
};

export default MarcasPage;