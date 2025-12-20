import "./HomeBanner.css";

const HomeBanner = () => {
  return (
    <section className="home-banner">
      {/* MUJER */}
      <div className="banner-item mujer">
        <div className="banner-content">
          <h2>Mujer</h2>
          <button>Ver más</button>
        </div>
      </div>

      {/* HOMBRE */}
      <div className="banner-item hombre">
        <div className="banner-content">
          <h2>Hombre</h2>
          <button>Ver más</button>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;