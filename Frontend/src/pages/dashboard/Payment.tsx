import { useState } from "react";
import "../../styles/payment.css";
import roomImage from "../../assets/images/hab1.jpg";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="payment-container">

      <div className="payment-form">

        <h2 className="payment-title">Detalles de pago</h2>

        <div className="payment-method">
          <button
            className={paymentMethod === "card" ? "method active" : "method"}
            onClick={() => setPaymentMethod("card")}
          >
            Tarjeta
          </button>

          <button
            className={paymentMethod === "cash" ? "method active" : "method"}
            onClick={() => setPaymentMethod("cash")}
          >
            Efectivo
          </button>
        </div>

        {paymentMethod === "card" && (
          <>
            <div className="form-grid">

              <div className="form-group">
                <label>Nombre</label>
                <input type="text" placeholder="Juan" />
              </div>

              <div className="form-group">
                <label>Apellidos</label>
                <input type="text" placeholder="Pérez" />
              </div>

              <div className="form-group full">
                <label>Correo electrónico</label>
                <input type="email" placeholder="correo@email.com" />
              </div>

              <div className="form-group full">
                <label>Número de celular</label>
                <input type="tel" placeholder="+52 555 000 000" />
              </div>

              <div className="form-group full">
                <label>Número de la tarjeta</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>

              <div className="form-group">
                <label>Expiración</label>
                <input type="text" placeholder="MM/YY" />
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="123" />
              </div>

            </div>
          </>
        )}

        {paymentMethod === "cash" && (
          <div className="cash-info">

            <div className="form-group">
              <label>Nombre</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Apellidos</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Correo</label>
              <input type="email" />
            </div>

            <div className="form-group">
              <label>Celular</label>
              <input type="tel" />
            </div>

            <p className="cash-text">
              Podrás pagar en efectivo al llegar al hotel.
            </p>

          </div>
        )}

        <button className="confirm-btn">
          Confirmar reserva
        </button>

      </div>

      {/* RESUMEN */}
      <div className="payment-summary">

        <div className="summary-card">

          <img src={roomImage} alt="Hotel" />

          <h3>Tu reserva</h3>

          <div className="summary-details">

            <p><span>Hotel:</span> Sol y Mar</p>
            <p><span>Ubicación:</span> Guatemala</p>
            <p><span>Habitación:</span> Deluxe</p>
            <p><span>Noches:</span> 3</p>

            <div className="divider"></div>

            <p className="total">
              Total: $2367
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payment;