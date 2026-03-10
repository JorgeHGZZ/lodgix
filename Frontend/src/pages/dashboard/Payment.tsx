import { useState } from "react";
import "../../styles/payment.css";
import roomImage from "../../assets/images/hab1.jpg";


function Payment() {

  const [paymentMethod, setPaymentMethod] = useState("card");
  return ( 
  <>
  {/* <h1>Reservar</h1> */}
    <div className="payment-container">
   
      <div className="payment-form">

        <h2 className="payment-title">
          Detalles de pago
        </h2>

        <div className="payment-method">

          <button className={paymentMethod === "card" ? "method active" : "method"}
            onClick={() => setPaymentMethod("card")}>Tarjeta</button>

          <button className={paymentMethod === "cash" ? "method active" : "method"}
            onClick={() => setPaymentMethod("cash")}
          >Efectivo</button>

        </div>
        {paymentMethod === "card" && (
          <>

            <label>Nombre</label>
            <input type="text" placeholder="Juan"/>

            <label>Apellidos</label>
            <input type="text" placeholder="Pérez"/>

            <label>Correo electrónico</label>
            <input type="email" placeholder="correo@email.com"/>

            <label>Número de celular</label>
            <input type="tel" placeholder="+52 555 000 000"/>

            <label>Número de la tarjeta</label>
            <input type="text" placeholder="1234 5678 9012 3456"/>

            <div className="card-row">

              <div>
                <label>Expiración</label>
                <input type="text" placeholder="MM/YY"/>
              </div>

              <div>
                <label>CVV</label>
                <input type="text" placeholder="123"/>
              </div>

            </div>

          </>
        )}

        {paymentMethod === "cash" && (

          <div className="cash-info">

            <p>Nombre</p>
            <input type="text" placeholder=""/>

            <p>Apellidos</p>
            <input type="text" placeholder=""/>

            <p>Correo electrónico</p>
            <input type="email" placeholder=""/>

            <p>Número de celular</p>
            <input type="tel" placeholder="+52 "/>
            <p>
              Podrás pagar en efectivo al momento de tu llegada al hotel.
            </p>

            <p>
              La reservación quedará registrada y se confirmará al hacer el pago.
            </p>

          </div>

        )}

        <button className="reserve-btn">
          Confirmar reserva
        </button>

      </div>

      <div className="payment-summary">

        <div className="hotel-card">

          <img src={roomImage} alt="Hotel"/>

          <h3>Información del hospedaje</h3>

          <div className="hotel-details">

            <p><strong>Hotel:</strong> Sol y Mar</p>
            <p><strong>Ubicación:</strong> Guatemala</p>
            <p><strong>Habitación:</strong> Deluxe</p>
            <p><strong>Noches:</strong> 3</p>

            <hr/>

            <p className="price">
              Total: $2367
            </p>

          </div>

        </div>

      </div>

    </div>
    </>
  );
}

export default Payment;