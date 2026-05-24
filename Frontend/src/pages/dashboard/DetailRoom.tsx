import "../../styles/details-room.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { api } from "../../services/api";
import Button from "../../components/ui/Button";

interface ScheduleEvent {
  label: string;
  status: "ocupada" | "mantenimiento" | "limpieza";
  start: string;
  end: string;
}

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
};

const formatDayLabel = (date: Date) => {
  return date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" });
};

function DetailRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [room, setRoom] = useState<any>(location.state?.room || null);
  const [loading, setLoading] = useState(!location.state?.room);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "calendar">("details");

  useEffect(() => {
    if (!room && id) {
      setLoading(true);
      api.get(`/rooms/${id}`)
        .then((response: any) => {
          setRoom(response.data);
        })
        .catch((err: any) => {
          console.error("Error al obtener detalles de habitación:", err);
          setError("No se pudo cargar los detalles de la habitación.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, room]);

  const scheduleEvents: ScheduleEvent[] = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [
      {
        label: "Reservación",
        status: "ocupada",
        start: addDays(today, 1).toISOString(),
        end: addDays(today, 3).toISOString(),
      },
      {
        label: "Limpieza",
        status: "limpieza",
        start: addDays(today, 4).toISOString(),
        end: addDays(today, 4).toISOString(),
      },
      {
        label: "Mantenimiento",
        status: "mantenimiento",
        start: addDays(today, 6).toISOString(),
        end: addDays(today, 6).toISOString(),
      },
    ];
  }, []);

  const calendarDays = useMemo(() => {
    const today = new Date();
    const startOfWeek = addDays(today, -today.getDay() + 1);
    return Array.from({ length: 14 }, (_, index) => addDays(startOfWeek, index));
  }, []);

  const getSlotStatus = (day: Date, slot: "mañana" | "tarde") => {
    const startOfDay = new Date(day);
    startOfDay.setHours(slot === "mañana" ? 0 : 12, 0, 0, 0);
    const endOfSlot = new Date(startOfDay);
    endOfSlot.setHours(slot === "mañana" ? 11 : 23, 59, 59, 999);

    const event = scheduleEvents.find((item) => {
      const eventStart = new Date(item.start);
      const eventEnd = new Date(item.end);
      return eventStart <= endOfSlot && eventEnd >= startOfDay;
    });

    return event ? event.status : "empty";
  };

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
      <div className="tabs-header">
        <button
          className={activeTab === "details" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("details")}
        >
          Detalles
        </button>
        <button
          className={activeTab === "calendar" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("calendar")}
        >
          Calendario
        </button>
      </div>

      {activeTab === "details" ? (
        <>
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
                <label htmlFor="client">Cliente</label>
                <input type="text" id="client" placeholder="Buscar cliente..." />
              </div>

              <div className="form-group">
                <label htmlFor="actionType">Tipo de registro</label>
                <select name="actionType" id="actionType" title="Selecciona el tipo de acción">
                  <option>Hospedar</option>
                  <option>Reservar</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="checkIn">Fecha de entrada</label>
                <input type="date" id="checkIn" />
              </div>

              <div className="form-group">
                <label htmlFor="checkOut">Fecha de salida</label>
                <input type="date" id="checkOut" />
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

              <div className="form-group full">
                <label htmlFor="total">Total</label>
                <input type="number" id="total" value={room.price} readOnly />
              </div>
            </div>

            <div className="form-group full">
              <label htmlFor="observations">Observaciones</label>
              <textarea id="observations" placeholder="Escribe algún detalle..."></textarea>
            </div>

            <div className="actions">
              <Button onClick={() => navigate('/dashboard/rooms')} classname="btn back" titulo="Volver" />
              <Button onClick={() => navigate('/dashboard/payment')} classname="btn primary" titulo="Reservar" />
            </div>

          </div>
        </>
      ) : (
        <div className="calendar-panel">
          <div className="calendar-legend">
            <span className="legend-item ocupada">Reservación</span>
            <span className="legend-item mantenimiento">Mantenimiento</span>
            <span className="legend-item limpieza">Limpieza</span>
          </div>

          <div className="calendar-grid">
            {calendarDays.map((day) => {
              const dayDate = new Date(day);
              const morningStatus = getSlotStatus(dayDate, "mañana");
              const afternoonStatus = getSlotStatus(dayDate, "tarde");

              return (
                <div key={dayDate.toISOString()} className="calendar-day">
                  <div className="calendar-day-label">{formatDayLabel(dayDate)}</div>
                  <div className="slot-row">
                    <span className="slot-label">Mañana</span>
                    <div className={`slot-bar ${morningStatus}`}>{morningStatus === "empty" ? "Libre" : morningStatus}</div>
                  </div>
                  <div className="slot-row">
                    <span className="slot-label">Tarde</span>
                    <div className={`slot-bar ${afternoonStatus}`}>{afternoonStatus === "empty" ? "Libre" : afternoonStatus}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailRoom;