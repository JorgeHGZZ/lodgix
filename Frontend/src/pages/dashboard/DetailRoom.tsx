import "../../styles/details-room.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../../services/api.js";
import Button from "../../components/ui/Button";

function DetailRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [room, setRoom] = useState<any>(location.state?.room || null);
  const [loading, setLoading] = useState(!location.state?.room);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!room && id) {
      setLoading(true);
      api.get(`/rooms/${id}`)
        .then((response) => {
          setRoom(response.data);
        })
        .catch((err) => {
          console.error("Error al obtener detalles de habitación:", err);
          setError("No se pudo cargar los detalles de la habitación.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, room]);

  if (loading) {
    return <div className="reservation-container"><p>Cargando detalles de la habitación...</p></div>;
  }

  if (error || !room) {
    return (
      <div className="reservation-container">
        <p>{error || "No se encontró la habitación."}</p>
        <Button onClick={() => navigate('/dashboard')} classname="btn back" titulo="Volver" />
      </div>
    );
  }

  return (
    <div className="reservation-container">

      <div className="room-header">
        <h2>DETALLES DE HABITACIÓN</h2>

        <div className="room-grid">
          <p><strong>N° HABITACIÓN:</strong> {room.number}</p>
          <p><strong>TIPO:</strong> {room.category}</p>
          <p>
            <strong>ESTADO:</strong>
            <span className={`status ${room.status.toLowerCase()}`}>{room.status}</span>
          </p>
          <p><strong>PRECIO:</strong> S/. {room.price.toFixed(2)}</p>
        </div>

        <p className="description">
          <strong>DESCRIPCIÓN:</strong> {room.description}
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
            <select name="actionType" id="actionType" title="Selecciona el tipo de acción">
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
            <input type="number" value={room.price} readOnly />
          </div>
        </div>

        <div className="form-group full">
          <label>Observaciones</label>
          <textarea placeholder="Escribe algún detalle..."></textarea>
        </div>

        <div className="actions">

          <Button onClick={() => navigate('/dashboard')} classname="btn back" titulo="Volver">
          </Button>


          <Button onClick={() => navigate('/dashboard/payment')} classname="btn primary" titulo="Reservar">
          </Button>
        </div>

      </div>

    </div>
  );
}

export default DetailRoom;