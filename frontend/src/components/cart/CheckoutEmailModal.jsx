import { useState } from "react";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import "./CheckoutEmailModal.css";

const CheckoutEmailModal = ({ open, onClose, items, subtotal }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const sendEmail = async () => {
    if (!email || !email.includes("@")) {
      alert("Por favor, ingrese un correo válido");
      return;
    }

    setLoading(true);

    
    const ordersData = items.map((it) => {

      const lineTotal = Number(it.price || 0) * Number(it.qty || 1);
      
      return {
        name: it.title,
        units: it.qty,
  
        price: lineTotal.toFixed(2), 
      };
    });

    const templateParams = {
      email: email,
      order_id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      orders: ordersData,
      shipping: "0.00",
      tax: "0.00",
      total: subtotal.toFixed(2), 
    };

    try {
      await emailjs.send(
        "service_pudzm2i",
        "template_j8p8h0d",
        templateParams,
        "apLHuGScxPLH0KNmX"
      );

      alert("✅ Gracias por tu compra, revisa tu correo");
      onClose();
      setEmail("");
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("❌ Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <>
      <div className="checkout-backdrop" onClick={onClose} />
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Finalizar compra</h3>
        <p>Ingresa tu correo para enviarte la confirmación:</p>
        
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />

        <div className="checkout-actions">
          <button 
            type="button"
            className="btn-cancel" 
            onClick={onClose} 
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            type="button"
            className="btn-confirm" 
            onClick={sendEmail} 
            disabled={loading}
          >
            {loading ? "Enviando..." : "Confirmar compra"}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default CheckoutEmailModal;