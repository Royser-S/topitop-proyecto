import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Nuevo estado para el botón de carga
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Activamos el spinner

        try {
            await authService.login(email, password);
            // Pequeño timeout para que se vea la animación (opcional, se ve pro)
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 500);
        } catch (err) {
            console.log(err);
            setError('❌ Credenciales incorrectas o error de conexión.');
            setLoading(false); // Desactivamos el spinner si falla
        }
    };

    return (
        // 1. FONDO CON DEGRADADO
        <div className="d-flex justify-content-center align-items-center vh-100" 
             style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}>
            
            {/* 2. TARJETA FLOTANTE */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ width: '400px' }}>
                
                {/* Cabecera decorativa */}
                <div className="bg-primary p-4 text-center text-white">
                    <div className="bg-white text-primary rounded-circle d-inline-flex justify-content-center align-items-center mb-3 shadow-sm" style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-shop fs-2"></i>
                    </div>
                    <h3 className="fw-bold mb-0">TopiTop Admin</h3>
                    <small className="text-white-50">Ingresa a tu panel de control</small>
                </div>

                <div className="card-body p-4 p-md-5">
                    
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            <div>{error}</div>
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        {/* INPUT CORREO CON ICONO */}
                        <div className="mb-4">
                            <label className="form-label fw-bold text-muted small">CORREO ELECTRÓNICO</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0 text-primary">
                                    <i className="bi bi-envelope-fill"></i>
                                </span>
                                <input 
                                    type="email" 
                                    className="form-control bg-light border-start-0 ps-0" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                    placeholder="nombre@ejemplo.com"
                                    style={{ height: '45px' }}
                                />
                            </div>
                        </div>

                        {/* INPUT PASSWORD CON ICONO */}
                        <div className="mb-4">
                            <label className="form-label fw-bold text-muted small">CONTRASEÑA</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0 text-primary">
                                    <i className="bi bi-lock-fill"></i>
                                </span>
                                <input 
                                    type="password" 
                                    className="form-control bg-light border-start-0 ps-0" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                    placeholder="••••••••"
                                    style={{ height: '45px' }}
                                />
                            </div>
                        </div>

                        {/* BOTÓN CON EFECTO DE CARGA */}
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 fw-bold shadow-sm py-2 rounded-3 text-uppercase"
                            disabled={loading} // Se deshabilita mientras carga
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Validando...
                                </>
                            ) : (
                                <>Ingresar <i className="bi bi-box-arrow-in-right ms-2"></i></>
                            )}
                        </button>
                    </form>
                </div>
                
                {/* Pie de tarjeta sutil */}
                <div className="card-footer bg-white border-0 text-center pb-4">
                    <small className="text-muted">¿Olvidaste tu contraseña? Contacta a soporte.</small>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;