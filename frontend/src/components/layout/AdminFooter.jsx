import React from 'react';
import capyBlack from '../../assets/images/capybara-black.png';
import capyWhite from '../../assets/images/capybara-white.png';
import './AdminFooter.css';

const AdminFooter = () => {
    const currentYear = new Date().getFullYear();
        
    // 🔴 AQUÍ PEGA TU LINK REAL DE GITHUB
    const githubUrl = "https://github.com/Royser-S/topitop-proyecto.git"; 

    return (
        <footer className="admin-footer py-3 mt-auto bg-white border-top shadow-sm">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small flex-wrap gap-2">
                    
                    {/* Copyright */}
                    <div className="text-muted">
                        Copyright &copy; TopiTop Admin {currentYear}
                    </div>

                    {/* Créditos + GitHub + Capibara */}
                    <div className="d-flex align-items-center gap-3 footer-credits">
                        
                        <div className="d-flex align-items-center gap-1">
                            <span className="text-muted fw-medium">Hecho con 🤍 por</span>
                            <span className="fw-bold text-gradient-primary">
                                Royser, Patrick y Benner
                            </span>
                        </div>

                        {/* --- BOTÓN GITHUB NUEVO --- */}
                        <a 
                            href={githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="github-link d-flex align-items-center justify-content-center text-decoration-none"
                            title="Ver Código Fuente"
                        >
                            <i className="bi bi-github fs-5"></i>
                        </a>

                        {/* Logos Capibara */}
                        <div className="capy-logo-container logo-hover">
                            <img src={capyBlack} alt="Capybara Logo" className="capy-black" height="32" />
                            <img src={capyWhite} alt="Capybara Logo" className="capy-white" height="32" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AdminFooter;