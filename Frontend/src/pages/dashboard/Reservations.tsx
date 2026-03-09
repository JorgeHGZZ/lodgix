import { useNavigate } from "react-router-dom";
import "../../styles/reservations.css";
import roomImage from "../../assets/images/hab1.jpg";
import Button from "../../components/ui/Button";


function Reservations() {
  const navigate = useNavigate();
    return (
        <>
        <div>
            <h1>Reservaciones</h1>
            {/* <p>Si ves esto, el Outlet está funcionando.</p> */}
        </div> 
      <div className="filters">

        <div className="filter">
           Ubicacion
          <select>
            <option>Ciudad de Mexico</option>
            <option>Veracruz</option>
          </select>
        </div>

        <div className="filter">
        <label>Fecha</label>
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
 <button className="search-btn">
        Buscar
      </button>

      </div>

     
      <div className="offers-title">

        <h2>Grandes ahorros en tus viajes</h2>

      </div>

      <div className="offers-container">
        <div className="hotel-card">

          <img src={roomImage} alt="Hotel"/>

           <p>Hotel Sol y mar</p>
          <p>Precio por noche: $789</p>
          <p>Ubicacion: Guatemala, calle no.234</p>

          <button className="details-btn">
            Detalles
          </button>

        </div>

        <div className="hotel-card">

          <img src={roomImage} alt="Hotel"/>

         <p>Hotel Sol y mar</p>
          <p>Precio por noche: $789</p>
          <p>Ubicacion: Guatemala, calle no.234</p>

          <Button onClick={() => navigate('/dashboard/detailroom')} classname="details-btn" titulo="Detalles">
          </Button>

        </div>

        <div className="hotel-card">

          <img src={roomImage} alt="Hotel"/>

          <p>Hotel Sol y mar</p>
          <p>Precio por noche: $789</p>
          <p>Ubicacion: Guatemala, calle no.234</p>

          <button className="details-btn">
            Detalles
          </button>

        </div>

        <div className="more-offers">

          <button>
            Ver mas ofertas
          </button>

        </div>

      </div>


        
        </>
    );

   
}


export default Reservations;