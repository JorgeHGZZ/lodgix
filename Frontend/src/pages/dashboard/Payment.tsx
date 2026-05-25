import { useState } from "react";
import "../../styles/payment.css";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import roomImage from "../../assets/images/hab1.jpg";


function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const location = useLocation();
  const navigate = useNavigate();

  const reservationData = location.state?.reservationData;
  const summary = location.state?.summary;

  const handleConfirmReservation = () => {
  if (!reservationData?.client) {
    alert("Debes seleccionar un cliente.");
    return;
  }

  console.log("Datos que se enviarán:", reservationData);

  api.post("/reservations", reservationData)
    .then((response) => {
      console.log("Reserva creada:", response.data);
      alert("Reserva creada correctamente");
      navigate("/dashboard/rooms");
    })
    .catch((error) => {
      console.error("Error al crear reserva:", error.response?.data || error);
      alert(error.response?.data?.message || "No se pudo crear la reserva.");
    });
};

  const clientData = location.state?.clientData;

  const fullName = clientData?.name || "";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

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
                <input type="text" value={firstName} readOnly />
              </div>

              <div className="form-group">
                <label>Apellidos</label>
                <input type="text" value={lastName} readOnly />
              </div>

              <div className="form-group full">
                <label>Correo electrónico</label>
               <input type="email" value={clientData?.email || ""} readOnly />
              </div>

              <div className="form-group full">
                <label>Número de celular</label>
                <input type="tel" value={clientData?.phone || ""} readOnly />
              </div>

              <div className="form-group full">
                <label>Número de la tarjeta</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>

              {/* <div className="form-group">
                <label>Expiración</label>
                <input type="text" placeholder="MM/YY" />
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="123" />
              </div> */}

            </div>
          </>
        )}

        {paymentMethod === "cash" && (
          <div className="cash-info">

            <div className="form-group">
              <label>Nombre</label>
               <input type="text" value={firstName} readOnly />
            </div>

            <div className="form-group">
              <label>Apellidos</label>
              <input type="text" value={lastName} readOnly />
            </div>

            <div className="form-group">
              <label>Correo</label>
             <input type="email" value={clientData?.email || ""} readOnly />
            </div>

            <div className="form-group">
              <label>Celular</label>
              <input type="tel" value={clientData?.phone || ""} readOnly />
            </div>

            {/* <p className="cash-text">
              Podrás pagar en efectivo al llegar al hotel.
            </p> */}

          </div>
        )}

        <button className="confirm-btn" onClick={handleConfirmReservation}>
          Confirmar reserva
        </button>

      </div>

      <div className="payment-summary">

        <div className="summary-card">

          <img src={roomImage} alt="Hotel" />

          <h3>Tu reserva</h3>

          <div className="summary-details">

           {/* <p><span>Hotel:</span> Sol y Mar</p>
            <p><span>Ubicación:</span> Guatemala</p> */}
            <p><span>Habitación:</span> {summary?.category}</p>
            <p><span>Número:</span> {summary?.roomNumber}</p>
            <p><span>Noches:</span> {summary?.days}</p>

            <div className="divider"></div>

            <p><span>Subtotal:</span> $ {summary?.subtotal}</p>
            <p><span>Descuento:</span> $ {summary?.discount}</p>
            <p><span>Adelanto:</span> $ {summary?.advance}</p>

            <p className="total">
              Total: $ {summary?.total}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payment;