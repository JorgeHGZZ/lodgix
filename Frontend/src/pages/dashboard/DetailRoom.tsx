import "../../styles/details-room.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

 function DetailRoom() {
    const navigate = useNavigate();

   return (
    <div className="reservation-container">

      <div className="room-header">
        <h2>DETALLES DE HABITACIÓN</h2>

        <div className="room-grid">
          <p><strong>N° HABITACIÓN:</strong> 40</p>
          <p><strong>TIPO:</strong> Individual</p>
          <p>
            <strong>ESTADO:</strong>
            <span className="status disponible">Disponible</span>
          </p>
          <p><strong>PRECIO:</strong> S/. 30.00</p>
        </div>

        <p className="description">
          <strong>DESCRIPCIÓN:</strong> TV, Wifi, Ducha Privada
        </p>
      </div>

      <div className="reservation-form">

        <div className="form-row">
          <div className="form-group">
            <label>Cliente</label>
            <input type="text" placeholder="Buscar cliente..." />
          </div>

          <div className="form-group">
            <label>Tipo de registro</label>
            <select>
              <option>Hospedar</option>
              <option>Reservar</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha de entrada</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Fecha de salida</label>
            <input type="date" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Descuento</label>
            <input type="number" defaultValue="0" />
          </div>

          <div className="form-group">
            <label>Adelanto</label>
            <input type="number" defaultValue="0" />
          </div>

          <div className="form-group">
            <label>Total</label>
            <input type="number" value="30" readOnly />
          </div>
        </div>

        <div className="form-group full">
          <label>Observaciones</label>
          <textarea placeholder="Escribe algún detalle..."></textarea>
        </div>

        <div className="actions">
      
           <Button onClick={() => navigate('/dashboard')} classname="btn back"  titulo="Volver">
            </Button>


           <Button onClick={() => navigate('/dashboard/payment')} classname="btn primary"  titulo="Reservar">
            </Button>
        </div>

      </div>

    </div>
  );
}

export default DetailRoom;