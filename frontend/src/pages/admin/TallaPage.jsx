import { useEffect, useState } from 'react';
import tallaService from '../../services/talla.service';
import TallaForm from '../../components/talla/TallaForm';
import TallaTabla from '../../components/talla/TallaTabla';

const TallasPage = () => {
    const [tallas, setTallas] = useState([]);
    const [idEditar, setIdEditar] = useState(null);
    const [valor, setValor] = useState('');
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const recargar = async () => {
        try { setTallas(await tallaService.getAll()); } catch (e) { console.error(e); }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { recargar(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const talla = { valor };
            if (idEditar) talla.id = idEditar;
            await tallaService.guardar(talla);
            setMensaje({ tipo: 'success', texto: idEditar ? 'Talla actualizada' : 'Talla creada' });
            setIdEditar(null); setValor(''); recargar();
        } catch (error) {
            console.log(error);
            setMensaje({ tipo: 'danger', texto: 'Error al guardar' });
        }
        setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
    };

    // NOTA: Eliminamos la función 'eliminar' por seguridad.

    return (
        <div className="container py-5">
            <h2 className="mb-4 fw-bold"><i className="bi bi-ruler me-2"></i>Gestión de Tallas</h2>
            <div className="row g-4">
                <div className="col-md-4">
                    <TallaForm 
                        handleSubmit={handleSubmit} valor={valor} setValor={setValor} 
                        idEditar={idEditar} limpiarFormulario={() => { setIdEditar(null); setValor(''); }} 
                        mensaje={mensaje} 
                    />
                </div>
                <div className="col-md-8">
                    {/* Ya no pasamos la función eliminar */}
                    <TallaTabla tallas={tallas} cargarDatosEdicion={(t) => { setIdEditar(t.id); setValor(t.valor); }} />
                </div>
            </div>
        </div>
    );
};
export default TallasPage;