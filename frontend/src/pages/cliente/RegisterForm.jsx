import { useState } from "react";
import authService from "../../services/auth.service";
import { sendOrderEmail } from "../../utils/emailSender";

const RegisterForm = ({ email, setEmail, onLogin, items, subtotal, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await authService.register(nombre, apellido, email, password);

      await authService.login(email, password);
      await sendOrderEmail(email, items, subtotal);

      alert("Cuenta creada y compra confirmada");
      onClose();
    } catch (e) {
      alert("Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Registro</h3>

      <input placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
      <input placeholder="Apellido" onChange={(e) => setApellido(e.target.value)} />

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      <p className="link" onClick={onLogin}>
        ¿Ya tienes cuenta? Inicia sesión
      </p>
    </>
  );
};

export default RegisterForm;
