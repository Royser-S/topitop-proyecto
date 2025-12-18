import { useEffect, useState } from 'react';
import colorService from '../../services/color.service';
import ColorForm from '../../components/color/ColorForm';
import ColorTabla from '../../components/color/ColorTabla';

const ColoresPage = () => {
    const [colores, setColores] = useState([]);
    const [idEditar, setIdEditar] = useState(null);
    const [nombre, setNombre] = useState('');
    const [codigoHex, setCodigoHex] = useState('#000000'); // Por defecto negro
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const recargar = async () => {
        try { 
            const data = await colorService.getAll();
            setColores(data); 
        } catch (e) { 
            console.error(e); 
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { recargar(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const color = { nombre, codigoHex };
            if (idEditar) color.id = idEditar;
            await colorService.guardar(color);
            setMensaje({ tipo: 'success', texto: idEditar ? 'Color actualizado' : 'Color creado' });
            setIdEditar(null); setNombre(''); setCodigoHex('#000000'); recargar();
        } catch (error) { 
            console.log(error); 
            setMensaje({ tipo: 'danger', texto: 'Error al guardar' }); 
        }
        setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
    };

    const cargarEdicion = (c) => {
        setIdEditar(c.id); setNombre(c.nombre); setCodigoHex(c.codigoHex);
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4 fw-bold"><i className="bi bi-palette me-2"></i>Gestión de Colores</h2>
            <div className="row g-4">
                <div className="col-md-4">
                    <ColorForm 
                        handleSubmit={handleSubmit} nombre={nombre} setNombre={setNombre} 
                        codigoHex={codigoHex} setCodigoHex={setCodigoHex}
                        idEditar={idEditar} limpiarFormulario={() => { setIdEditar(null); setNombre(''); setCodigoHex('#000000'); }} 
                        mensaje={mensaje} 
                    />
                </div>
                <div className="col-md-8">
                    {/* Ya no pasamos la función eliminar */}
                    <ColorTabla colores={colores} cargarDatosEdicion={cargarEdicion} />
                </div>
            </div>
        </div>
    );
};
export default ColoresPage;