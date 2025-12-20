import { useEffect, useMemo, useRef, useState } from "react";
import categoriaService from "../../services/categoria.public.service";
import marcaService from "../../services/marca.public.service";
import tallaService from "../../services/talla.public.service";
import "./FiltersBar.css";

const flattenCategorias = (cats = []) => {
  const out = [];
  const walk = (node, parentNombre = null) => {
    if (!node) return;
    out.push({ id: node.id, nombre: node.nombre, parentNombre });
    const kids = node.subCategorias ?? node.subcategorias ?? [];
    kids.forEach((k) => walk(k, node.nombre));
  };
  (cats ?? []).forEach((c) => walk(c, null));
  return out;
};

const normalizeMarcas = (data = []) => {
  return (data ?? [])
    .map((m) => ({
      id: m?.id ?? m?.marcaId ?? m?.idMarca ?? m?.codigo ?? m?.nombre,
      nombre: m?.nombre ?? m?.name ?? m?.descripcion,
    }))
    .filter((x) => x?.id != null && x?.nombre);
};

const normalizeTallas = (data = []) => {
  const arr = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
  return arr
    .map((t) => ({
      id: t?.id ?? t?.tallaId ?? t?.idTalla ?? t?.codigo ?? t?.nombre ?? t?.name,
      nombre:
        t?.nombre ??
        t?.name ??
        t?.descripcion ??
        t?.label ??
        t?.talla ??
        t?.valor ??
        t?.nombreTalla ??
        t?.tallaNombre,
    }))
    .filter((x) => x?.id != null && x?.nombre);
};

const FiltersBar = ({ onChangeCategoriaIds, onChangeMarcaIds, onChangeTallaIds }) => {
  const [open, setOpen] = useState(null); // "category" | "brand" | "talla" | null
  const [drawerOpen, setDrawerOpen] = useState(false); // panel debajo

  // data
  const [catsFlat, setCatsFlat] = useState([]);
  const [brands, setBrands] = useState([]);
  const [tallas, setTallas] = useState([]);

  // loading/errors
  const [loadingCats, setLoadingCats] = useState(false);
  const [errorCats, setErrorCats] = useState("");

  const [loadingBrands, setLoadingBrands] = useState(false);
  const [errorBrands, setErrorBrands] = useState("");

  const [loadingTallas, setLoadingTallas] = useState(false);
  const [errorTallas, setErrorTallas] = useState("");

  // selected
  const [selectedCatIds, setSelectedCatIds] = useState(() => new Set());
  const [selectedBrandIds, setSelectedBrandIds] = useState(() => new Set());
  const [selectedTallaIds, setSelectedTallaIds] = useState(() => new Set());

  // refs
  const catRef = useRef(null);
  const brandRef = useRef(null);
  const tallaRef = useRef(null);
  const allFiltersRef = useRef(null);

  // cerrar afuera + escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawerOpen(false);
      }
    };
    const onClick = (e) => {
      const insideDrop =
        catRef.current?.contains(e.target) ||
        brandRef.current?.contains(e.target) ||
        tallaRef.current?.contains(e.target);

      const insideAll = allFiltersRef.current?.contains(e.target);

      if (!insideDrop) setOpen(null);
      if (drawerOpen && !insideAll) setDrawerOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [drawerOpen]);

  // cargar categorias
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingCats(true);
        setErrorCats("");
        const data = await categoriaService.listarMenu();
        if (!mounted) return;
        setCatsFlat(flattenCategorias(data ?? []));
      } catch (e) {
        if (mounted) setErrorCats("No se pudo cargar categorías.");
      } finally {
        if (mounted) setLoadingCats(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  // cargar marcas
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingBrands(true);
        setErrorBrands("");
        const data = await marcaService.listarPublicas();
        if (!mounted) return;
        setBrands(normalizeMarcas(data ?? []));
      } catch (e) {
        if (mounted) setErrorBrands("No se pudo cargar marcas.");
      } finally {
        if (mounted) setLoadingBrands(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  // cargar tallas
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingTallas(true);
        setErrorTallas("");
        const data = await tallaService.listarPublicas();
        if (!mounted) return;
        setTallas(normalizeTallas(data));
      } catch (e) {
        if (mounted) setErrorTallas("No se pudo cargar tallas.");
      } finally {
        if (mounted) setLoadingTallas(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const catLabel = useMemo(() => {
    const n = selectedCatIds.size;
    return n === 0 ? "Categoría" : `Categoría (${n})`;
  }, [selectedCatIds]);

  const brandLabel = useMemo(() => {
    const n = selectedBrandIds.size;
    return n === 0 ? "Marca" : `Marca (${n})`;
  }, [selectedBrandIds]);

  const tallaLabel = useMemo(() => {
    const n = selectedTallaIds.size;
    return n === 0 ? "Talla" : `Talla (${n})`;
  }, [selectedTallaIds]);

  const toggleCat = (rawId) => {
    const id = Number(rawId);
    setSelectedCatIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      onChangeCategoriaIds?.(Array.from(next));
      return next;
    });
  };

  const toggleBrand = (rawId) => {
    const id = Number(rawId);
    setSelectedBrandIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      onChangeMarcaIds?.(Array.from(next));
      return next;
    });
  };

  const toggleTalla = (rawId) => {
    const id = Number(rawId);
    setSelectedTallaIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      onChangeTallaIds?.(Array.from(next));
      return next;
    });
  };

  // ✅ limpiar por sección (lo que pediste)
  const clearCats = () => {
    setSelectedCatIds(new Set());
    onChangeCategoriaIds?.([]);
  };
  const clearBrands = () => {
    setSelectedBrandIds(new Set());
    onChangeMarcaIds?.([]);
  };
  const clearTallas = () => {
    setSelectedTallaIds(new Set());
    onChangeTallaIds?.([]);
  };

  const clearAll = () => {
    clearCats();
    clearBrands();
    clearTallas();
  };

  // ✅ bloques reutilizables
  const RenderCategorias = () => (
    <>
      {loadingCats && <div className="filtersbar__hint">Cargando...</div>}
      {errorCats && <div className="filtersbar__error">{errorCats}</div>}
      {!loadingCats && !errorCats && catsFlat.length === 0 && (
        <div className="filtersbar__hint">No hay categorías.</div>
      )}
      {!loadingCats &&
        !errorCats &&
        catsFlat.map((cat) => {
          const checked = selectedCatIds.has(Number(cat.id));
          return (
            <label key={`cat-${cat.id}-${cat.nombre}`} className="filtersbar__check">
              <input type="checkbox" checked={checked} onChange={() => toggleCat(cat.id)} />
              <span className="filtersbar__catText">
                {cat.parentNombre ? (
                  <>
                    <span className="filtersbar__catParent">{cat.parentNombre}</span>
                    <span className="filtersbar__catSlash">/</span>
                  </>
                ) : null}
                {cat.nombre}
              </span>
            </label>
          );
        })}
    </>
  );

  const RenderMarcas = () => (
    <>
      {loadingBrands && <div className="filtersbar__hint">Cargando...</div>}
      {errorBrands && <div className="filtersbar__error">{errorBrands}</div>}
      {!loadingBrands && !errorBrands && brands.length === 0 && (
        <div className="filtersbar__hint">No hay marcas.</div>
      )}
      {!loadingBrands &&
        !errorBrands &&
        brands.map((b) => {
          const checked = selectedBrandIds.has(Number(b.id));
          return (
            <label key={`b-${b.id}-${b.nombre}`} className="filtersbar__check">
              <input type="checkbox" checked={checked} onChange={() => toggleBrand(b.id)} />
              <span>{b.nombre}</span>
            </label>
          );
        })}
    </>
  );

  const RenderTallas = () => (
    <>
      {loadingTallas && <div className="filtersbar__hint">Cargando...</div>}
      {errorTallas && <div className="filtersbar__error">{errorTallas}</div>}
      {!loadingTallas && !errorTallas && tallas.length === 0 && (
        <div className="filtersbar__hint">No hay tallas.</div>
      )}
      {!loadingTallas &&
        !errorTallas &&
        tallas.map((t) => {
          const checked = selectedTallaIds.has(Number(t.id));
          return (
            <label key={`t-${t.id}-${t.nombre}`} className="filtersbar__check">
              <input type="checkbox" checked={checked} onChange={() => toggleTalla(t.id)} />
              <span>{t.nombre}</span>
            </label>
          );
        })}
    </>
  );

  return (
    <div className="filtersbar">
      <div className="filtersbar__left">
        {/* TODOS LOS FILTROS (panel debajo) */}
        <div className="filtersbar__dd" ref={allFiltersRef}>
          <button
            type="button"
            className="filtersbar__btn filtersbar__btn--filters"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-expanded={drawerOpen}
          >
            <span className="filtersbar__icon" aria-hidden="true">
              ⫶
            </span>
            <span>Todos los filtros</span>
          </button>

          {drawerOpen && (
            <div className="filtersbar__panel filtersbar__panel--all" role="dialog" aria-label="Todos los filtros">
              <div className="filtersbar__panelHead">
                <div className="filtersbar__panelTitle">Todos los filtros</div>
                <button
                  type="button"
                  className="filtersbar__panelClose"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              <div className="filtersbar__panelBody filtersbar__panelBody--all">
                <div className="filtersbar__drawerBlock">
                  <div className="filtersbar__drawerBlockTitle">Categoría</div>
                  <RenderCategorias />
                  <div className="filtersbar__panelFooter">
                    <button
                      type="button"
                      className="filtersbar__panelBtn"
                      onClick={clearCats}
                      disabled={selectedCatIds.size === 0}
                    >
                      Limpiar
                    </button>
                  </div>
                </div>

                <div className="filtersbar__drawerBlock">
                  <div className="filtersbar__drawerBlockTitle">Marca</div>
                  <RenderMarcas />
                  <div className="filtersbar__panelFooter">
                    <button
                      type="button"
                      className="filtersbar__panelBtn"
                      onClick={clearBrands}
                      disabled={selectedBrandIds.size === 0}
                    >
                      Limpiar
                    </button>
                  </div>
                </div>

                <div className="filtersbar__drawerBlock">
                  <div className="filtersbar__drawerBlockTitle">Talla</div>
                  <RenderTallas />
                  <div className="filtersbar__panelFooter">
                    <button
                      type="button"
                      className="filtersbar__panelBtn"
                      onClick={clearTallas}
                      disabled={selectedTallaIds.size === 0}
                    >
                      Limpiar
                    </button>
                  </div>
                </div>
              </div>

              <div className="filtersbar__panelFooter">
                <button type="button" className="filtersbar__panelBtn" onClick={clearAll}>
                  Limpiar todo
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="filtersbar__sep" />

        {/* CATEGORIA dropdown */}
        <div className="filtersbar__dd" ref={catRef}>
          <button
            type="button"
            className={`filtersbar__btn filtersbar__btn--dd ${open === "category" ? "is-open" : ""}`}
            onClick={() => setOpen(open === "category" ? null : "category")}
          >
            <span>{catLabel}</span>
            <span className="filtersbar__caret">▾</span>
          </button>

          {open === "category" && (
            <div className="filtersbar__panel">
              <div className="filtersbar__panelBody">
                <RenderCategorias />
              </div>
              <div className="filtersbar__panelFooter">
                <button
                  type="button"
                  className="filtersbar__panelBtn"
                  onClick={clearCats}
                  disabled={selectedCatIds.size === 0}
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="filtersbar__sep" />

        {/* MARCA dropdown */}
        <div className="filtersbar__dd" ref={brandRef}>
          <button
            type="button"
            className={`filtersbar__btn filtersbar__btn--dd ${open === "brand" ? "is-open" : ""}`}
            onClick={() => setOpen(open === "brand" ? null : "brand")}
          >
            <span>{brandLabel}</span>
            <span className="filtersbar__caret">▾</span>
          </button>

          {open === "brand" && (
            <div className="filtersbar__panel">
              <div className="filtersbar__panelBody">
                <RenderMarcas />
              </div>
              <div className="filtersbar__panelFooter">
                <button
                  type="button"
                  className="filtersbar__panelBtn"
                  onClick={clearBrands}
                  disabled={selectedBrandIds.size === 0}
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="filtersbar__sep" />

        {/* TALLA dropdown */}
        <div className="filtersbar__dd" ref={tallaRef}>
          <button
            type="button"
            className={`filtersbar__btn filtersbar__btn--dd ${open === "talla" ? "is-open" : ""}`}
            onClick={() => setOpen(open === "talla" ? null : "talla")}
          >
            <span>{tallaLabel}</span>
            <span className="filtersbar__caret">▾</span>
          </button>

          {open === "talla" && (
            <div className="filtersbar__panel">
              <div className="filtersbar__panelBody">
                <RenderTallas />
              </div>
              <div className="filtersbar__panelFooter">
                <button
                  type="button"
                  className="filtersbar__panelBtn"
                  onClick={clearTallas}
                  disabled={selectedTallaIds.size === 0}
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="filtersbar__right">
        <button type="button" className="filtersbar__btn filtersbar__btn--dd">
          <span>ORDENAR POR</span>
          <span className="filtersbar__caret">▾</span>
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
