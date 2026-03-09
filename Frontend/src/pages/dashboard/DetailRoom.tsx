import "../../styles/details-room.css";
import { useNavigate } from "react-router-dom";
import roomImage from "../../assets/images/hab1.jpg";
import roomImage1 from "../../assets/images/hab2.jpg";
import Button from "../../components/ui/Button";

 function DetailRoom() {
    const navigate = useNavigate();

  return (
    <>
    <div className="hotel-page">

      <h1 className="hotel-title">Hotel Sol y Mar</h1>

      <div className="hotel-gallery">

        <button className="gallery-btn left"></button>

        <img
          src={roomImage1} alt="Hotel" className="hotel-image"/>
          

        <button className="gallery-btn right"></button>

      </div>

      <div className="filters">

        <div className="filter">
          <label>Del</label>
        <input type="date" />
        </div>

        <div className="filter">
          <label>Al</label>
            <input type="date" />
        </div>

        <div className="filter">
        Huéspedes
          <select>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>

      </div>

      <div className="bed-filter">

        <button>Todo</button>
        <button>1 cama</button>
        <button>2 camas</button>

      </div>

      <div className="rooms">
        <div className="room-card">

          <div className="room-image">

            <button className="gallery-btn left"></button>

            <img src={roomImage} alt="Habitacion"/>

            <button className="gallery-btn right"></button>

          </div>

          <div className="room-info">

            <h3>Detalles de la habitación</h3>
            <p>Servicios extras</p>

            <Button onClick={() => navigate('/dashboard/payment')} classname="reserve-btn"  titulo="Reservar">
            </Button>

          </div>

        </div>

        <div className="room-card">

          <div className="room-image">

            <button className="gallery-btn left"></button>
           
            <img src={roomImage} alt="Habitacion"/>

            <button className="gallery-btn right"></button>

          </div>

          <div className="room-info">

            <h3>Detalles de la habitación</h3>
            <p>Servicios extras</p>

            <button className="reserve-btn">
              Reservar
            </button>

          </div>

        </div>

      </div>

    </div>
    </>
  );
}
export default DetailRoom;