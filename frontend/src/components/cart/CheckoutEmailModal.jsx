import { useState } from "react";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import authService from "../../services/auth.service";
import "./CheckoutEmailModal.css";

const CheckoutEmailModal = ({ open, onClose, items, subtotal }) => {
  const [mode, setMode] = useState("login"); // login | register
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      setLoading(true);
      await authService.login(form.email, form.password);
      setIsAuthenticated(true);
      alert("✅ Sesión iniciada correctamente");
    } catch (error) {
      alert("❌ Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  // 📝 REGISTRO
  const handleRegister = async () => {
    try {
      setLoading(true);
      await authService.register(
        form.nombre,
        form.apellido,
        form.email,
        form.password
      );
      alert("✅ Registro exitoso, ahora inicia sesión");
      setMode("login");
    } catch (error) {
      alert("❌ Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  // 📧 CONFIRMAR COMPRA
  const handleConfirmPurchase = async () => {
    try {
      setLoading(true);

      const orders = items.map((it) => ({
        name: it.title,
        units: it.qty,
        price: (it.price * it.qty).toFixed(2),
      }));

      await emailjs.send(
        "service_pudzm2i",
        "template_j8p8h0d",
        {
          email: form.email,
          orders,
          total: subtotal.toFixed(2),
        },
        "apLHuGScxPLH0KNmX"
      );

      alert("✅ Compra confirmada, revisa tu correo");
      onClose();
    } catch (error) {
      alert("❌ Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <>
      <div className="checkout-backdrop" onClick={onClose} />
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Título dinámico según el estado */}
        <h3>
          {isAuthenticated 
            ? "Confirmar Pedido" 
            : mode === "login" ? "Iniciar sesión" : "Registrarse"}
        </h3>

        <div className="modal-content">
          {!isAuthenticated ? (
            /* VISTA DE LOGIN / REGISTRO */
            <>
              {mode === "register" && (
                <>
                  <input
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="modal-input"
                  />
                  <input
                    name="apellido"
                    placeholder="Apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    className="modal-input"
                  />
                </>
              )}

              <input
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
                className="modal-input"
              />

              <input
                name="password"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="modal-input"
              />

              <p className="checkout-link">
                {mode === "login" ? (
                  <>
                    ¿No tienes cuenta?{" "}
                    <span onClick={() => setMode("register")}>Regístrate</span>
                  </>
                ) : (
                  <>
                    ¿Ya tienes cuenta?{" "}
                    <span onClick={() => setMode("login")}>Inicia sesión</span>
                  </>
                )}
              </p>
            </>
          ) : (
            /* VISTA DE POST-LOGIN (Solo confirmación) */
            <div className="auth-confirmed-msg">
              <p>Has iniciado sesión como:</p>
              <p><strong>{form.email}</strong></p>
              <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "#666" }}>
                Haz clic en el botón de abajo para finalizar tu pedido.
              </p>
            </div>
          )}
        </div>

        <div className="checkout-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>

          {!isAuthenticated ? (
            /* Botón dinámico Login/Registro */
            <button
              type="button"
              className="btn-confirm"
              onClick={mode === "login" ? handleLogin : handleRegister}
              disabled={loading}
            >
              {loading ? "Cargando..." : mode === "login" ? "Iniciar sesión" : "Registrarse"}
            </button>
          ) : (
            /* Botón final de compra */
            <button
              type="button"
              className="btn-confirm"
              onClick={handleConfirmPurchase}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Confirmar compra"}
            </button>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default CheckoutEmailModal;