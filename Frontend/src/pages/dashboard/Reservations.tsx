import { useState } from "react";
import "../../styles/reservations.css";
import roomImage from "../../assets/images/hab1.jpg";
import { api } from "../../services/api";

function Reservations() {

  const [clientName, setClientName] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    discount: 0,
    advance: 0,
  });

  const searchReservations = () => {

    if (!clientName.trim()) {
      alert("Escribe el nombre del cliente.");
      return;
    }

    api.get(`/reservations/search?name=${clientName}`)
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error al buscar reservaciones:", error);
        alert(error.response?.data?.message || "Error al buscar reservaciones.");
      });
  };

  const updateStatus = (id: string, status: string) => {

    api.patch(`/reservations/${id}/status`, { status })
      .then(() => {
        alert("Estado actualizado correctamente.");
        searchReservations();
      })
      .catch((error) => {
        console.error("Error al actualizar estado:", error);
        alert(error.response?.data?.message || "Error al actualizar estado.");
      });
  };

  const startEdit = (reservation: any) => {

    setEditingId(reservation._id);

    setEditForm({
      checkIn: reservation.checkIn?.split("T")[0],
      checkOut: reservation.checkOut?.split("T")[0],
      guests: reservation.guests || 1,
      discount: reservation.discount || 0,
      advance: reservation.advance || 0,
    });
  };

  const saveChanges = (id: string) => {

    api.put(`/reservations/${id}`, editForm)
      .then(() => {
        alert("Reservación modificada correctamente.");
        setEditingId(null);
        searchReservations();
      })
      .catch((error) => {
        console.error("Error al modificar reservación:", error);
        alert(error.response?.data?.message || "Error al modificar reservación.");
      });
  };

  return (

    <div className="reservations-wrapper">

      <h1>Reservaciones</h1>

      <div className="filters">

        <div className="filter">

          <label>Buscar cliente</label>

          <input
            type="text"
            placeholder="Nombre del cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />

        </div>

        <button
          className="search-btn"
          onClick={searchReservations}
        >
          Buscar
        </button>

      </div>

      <div className="offers-title">
        <h2>Reservaciones encontradas</h2>
      </div>

      <div className="offers-section">

        <div className="offers-container">

          {reservations.length === 0 ? (

            <p>No hay reservaciones para mostrar.</p>

          ) : (

            reservations.map((reservation) => (

              <div className="hotel-card" key={reservation._id}>

                <img src={roomImage} alt="Habitación" />

                <p>Cliente: {reservation.client?.name}</p>

                <p>
                  Habitación: {reservation.room?.number}
                </p>

                <p>
                  Tipo: {reservation.room?.category}
                </p>

                <p>
                  Check-in: {new Date(reservation.checkIn).toLocaleDateString()}
                </p>

                <p>
                  Check-out: {new Date(reservation.checkOut).toLocaleDateString()}
                </p>

                <p>Noches: {reservation.days}</p>

                <p>Total: ${reservation.total}</p>

                <p>Estado: {reservation.status}</p>

                <button
                  className="details-btn edit"
                  onClick={() => startEdit(reservation)}
                >
                  Modificar reserva
                </button>

                {editingId === reservation._id && (

                  <div className="edit-reservation-form">

                    <label>Check-in</label>

                    <input
                      type="date"
                      value={editForm.checkIn}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          checkIn: e.target.value
                        })
                      }
                    />

                    <label>Check-out</label>

                    <input
                      type="date"
                      value={editForm.checkOut}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          checkOut: e.target.value
                        })
                      }
                    />

                    <label>Huéspedes</label>

                    <input
                      type="number"
                      value={editForm.guests}
                      min="1"
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          guests: Number(e.target.value)
                        })
                      }
                    />

                    <label>Descuento</label>

                    <input
                      type="number"
                      value={editForm.discount}
                      min="0"
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          discount: Number(e.target.value)
                        })
                      }
                    />

                    <label>Adelanto</label>

                    <input
                      type="number"
                      value={editForm.advance}
                      min="0"
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          advance: Number(e.target.value)
                        })
                      }
                    />

                    <button
                      className="details-btn"
                      onClick={() => saveChanges(reservation._id)}
                    >
                      Guardar cambios
                    </button>

                    <button
                      className="details-btn cancel"
                      onClick={() => setEditingId(null)}
                    >
                      Cerrar
                    </button>

                  </div>
                )}

                {reservation.status === "pending" && (

                  <button
                    className="details-btn"
                    onClick={() =>
                      updateStatus(reservation._id, "confirmed")
                    }
                  >
                    Hacer check-in
                  </button>
                )}

                {reservation.status === "confirmed" && (

                  <button
                    className="details-btn"
                    onClick={() =>
                      updateStatus(reservation._id, "completed")
                    }
                  >
                    Hacer check-out
                  </button>
                )}

                {reservation.status !== "completed" &&
                  reservation.status !== "cancelled" && (

                    <button
                      className="details-btn cancel"
                      onClick={() =>
                        updateStatus(reservation._id, "cancelled")
                      }
                    >
                      Cancelar reserva
                    </button>
                  )}

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default Reservations;