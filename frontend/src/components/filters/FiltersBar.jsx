import "./FiltersBar.css";

const FiltersBar = () => {
  return (
    <div className="filtersbar">
      {/* SECCIÓN IZQUIERDA */}
      <div className="filtersbar__left">
        <button type="button" className="filtersbar__btn filtersbar__btn--filters">
          <span className="filtersbar__icon" aria-hidden="true">⫶</span>
          <span>Todos los filtros</span>
        </button>

        <div className="filtersbar__sep" />

        <button type="button" className="filtersbar__btn filtersbar__btn--dd">
          <span>Categoría</span>
          <span className="filtersbar__caret" aria-hidden="true">▾</span>
        </button>

        <div className="filtersbar__sep" />

        <button type="button" className="filtersbar__btn filtersbar__btn--dd">
          <span>Descuento</span>
          <span className="filtersbar__caret" aria-hidden="true">▾</span>
        </button>

        <div className="filtersbar__sep" />

        <button type="button" className="filtersbar__btn filtersbar__btn--dd">
          <span>Marca</span>
          <span className="filtersbar__caret" aria-hidden="true">▾</span>
        </button>

        <div className="filtersbar__sep" />

        <button type="button" className="filtersbar__btn filtersbar__btn--dd">
          <span>Talla</span>
          <span className="filtersbar__caret" aria-hidden="true">▾</span>
        </button>
      </div>

      {/* SECCIÓN DERECHA */}
      <div className="filtersbar__right">
        <button type="button" className="filtersbar__btn filtersbar__btn--dd">
          <span>ORDENAR POR</span>
          <span className="filtersbar__caret" aria-hidden="true">▾</span>
        </button>

        <div className="filtersbar__view">
          <button className="filtersbar__viewbtn" type="button" aria-label="Vista lista">
            <span className="filtersbar__bars" aria-hidden="true" />
          </button>
          <button className="filtersbar__viewbtn" type="button" aria-label="Vista grilla">
            <span className="filtersbar__grid" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;