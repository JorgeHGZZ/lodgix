import "../../styles/client.css";
import roomImage from "../../assets/images/hab1.jpg";
import Searchbar from "../../components/layout/Searchbar";

function Clients() {
    return (
        <>
        <div>
            <h1 >Clientes</h1>
            {/* <p>Si ves esto, el Outlet está funcionando.</p> */}
        </div>

        <Searchbar/> 

        <div className="reservation-container">

      <h2 className="reservation-title">Datos de la reservación</h2>

      <div className="reservation-card">

        <img src={roomImage} className="reservation-image" alt="Habitación"/>

        <div className="reservation-info">

          <div className="reservation-left">
            <p><strong>Habitaciones reservadas:</strong> 2</p>
            <p><strong>Número de habitación:</strong> 2 y 4</p>
            <p><strong>Huéspedes:</strong> 3</p>
            <p><strong>Duración:</strong> 3 noches</p>
            <p><strong>Check-in:</strong> 23 mayo 2026</p>
            <p><strong>Check-out:</strong> 26 mayo 2026</p>
          </div>

          <div className="reservation-right">
            <p className="price-total">$7,245</p>
            <p>Precio por noche: $766</p>
            <p>Extras: $233</p>

            <div className="reservation-actions">
              <button className="checkin-btn">Check in</button>
              <button className="checkout-btn">Check out</button>
            </div>

          </div>

        </div>

      </div>

    </div>
    </>
    );
}

export default Clients;