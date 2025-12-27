// src/components/banner/HomeBanner.jsx
import "./HomeBanner.css";

/**
 * Ajusta estos IDs a los que tengas en tu BD.
 * Ejemplo: si la categoría "Mujer" es id=1 y "Hombre" es id=2,
 * déjalo así. Si son otros, cámbialos.
 */
const MUJER_ID = 1;
const HOMBRE_ID = 2;

const HomeBanner = ({ onSelectCategoria }) => {
  const handleMujerClick = () => {
    if (onSelectCategoria) onSelectCategoria(MUJER_ID);
  };

  const handleHombreClick = () => {
    if (onSelectCategoria) onSelectCategoria(HOMBRE_ID);
  };

  return (
    <section className="home-banner">
      {/* MUJER */}
      <div className="banner-item mujer">
        <div className="banner-content">
          <h2>Mujer</h2>
          <button type="button" onClick={handleMujerClick}>
            Ver más
          </button>
        </div>
      </div>

      {/* HOMBRE */}
      <div className="banner-item hombre">
        <div className="banner-content">
          <h2>Hombre</h2>
          <button type="button" onClick={handleHombreClick}>
            Ver más
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
