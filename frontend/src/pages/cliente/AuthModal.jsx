import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./AuthModal.css";

const AuthModal = ({ open, onClose, items, subtotal }) => {
  const [mode, setMode] = useState("login"); // login | register
  const [email, setEmail] = useState("");

  if (!open) return null;

  return (
    <>
      <div className="auth-backdrop" onClick={onClose} />
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        {mode === "login" ? (
          <LoginForm
            email={email}
            setEmail={setEmail}
            onRegister={() => setMode("register")}
            items={items}
            subtotal={subtotal}
            onClose={onClose}
          />
        ) : (
          <RegisterForm
            email={email}
            setEmail={setEmail}
            onLogin={() => setMode("login")}
            items={items}
            subtotal={subtotal}
            onClose={onClose}
          />
        )}
      </div>
    </>
  );
};

export default AuthModal;
