import "./Footer.css";

const Footer = () => {
  return (
    <footer className="tfooter">
      <div className="tfooter__top">
        <button className="tfooter__more" type="button">
          VER MÁS <span aria-hidden="true">↓</span>
        </button>
      </div>

      <div className="tfooter__line" />

      <div className="tfooter__grid">
        <div className="tfooter__col">
          <div className="tfooter__brand">topitop</div>

          <div className="tfooter__social">
            <a className="tfooter__icon" href="#" aria-label="Facebook">f</a>
            <a className="tfooter__icon" href="#" aria-label="TikTok">♪</a>
            <a className="tfooter__icon" href="#" aria-label="Instagram">◦</a>
            <a className="tfooter__icon" href="#" aria-label="YouTube">▶</a>
          </div>

          <div className="tfooter__text">
            Dirección legal: Av. Santorino Nro. 1123<br />
            San Juan de Lurigancho 15427 - Lima<br />
            Razón Social: Trading Fashion Line S.A.<br />
            RUC: 20500176582
          </div>

          <div className="tfooter__seal" aria-hidden="true" />
        </div>

        <div className="tfooter__col">
          <div className="tfooter__title">SERVICIO AL CLIENTE</div>
          <ul className="tfooter__list">
            <li><a href="#">Registrarme en topitop</a></li>
            <li><a href="#">Política de envío</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Contáctanos</a></li>
          </ul>
        </div>

        <div className="tfooter__col">
          <div className="tfooter__title">NOSOTROS</div>
          <ul className="tfooter__list">
            <li><a href="#">Nuestra historia</a></li>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Política y protección de datos</a></li>
            <li><a href="#">Trabaja con nosotros</a></li>
          </ul>
        </div>

        <div className="tfooter__col">
          <div className="tfooter__title">MARCAS</div>
          <ul className="tfooter__list">
            <li><a href="#">Kansi</a></li>
            <li><a href="#">Hawk</a></li>
            <li><a href="#">Topitop Mujer</a></li>
            <li><a href="#">Topitop Hombre</a></li>
            <li><a href="#">Topitop Kids</a></li>
            <li><a href="#">Basic Man</a></li>
            <li><a href="#">Basic Woman</a></li>
            <li><a href="#">Denim</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;