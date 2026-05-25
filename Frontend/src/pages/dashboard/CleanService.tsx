import "../../styles/clean-service.css";
import { useState, useEffect } from "react";
import type { AxiosResponse } from "axios";
import Modal from "../../components/layout/Modal";
import Form from "../../components/layout/Form";
import api from "../../services/api";

interface CleanService {
  id: string,
  room: string,
  description: string,
  priority: string,
  status: string,
  startDate: string,
  endDate: string,
}
interface RoomOption {
  _id: string,
  number: string,
}

function CleanService() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [service, setService] = useState<CleanService[]>([]);
  const [rooms, setRooms] = useState<RoomOption[]>([]);
  const [searchRoom, setSearchRoom] = useState("");
  const [filterStatus, setFilterStatus] = useState("");


  const loadServices = () => {
    api.get("/cleanservice/")
      .then((response: AxiosResponse) => {
        setService(response.data);
      })
      .catch((error: unknown) => {
        console.error("Error al cargar servicios de limpieza:", error);
      });
  };
  const loadRooms = () => {
    api.get("/rooms")
      .then((response: AxiosResponse) => {
        setRooms(response.data);
      })
      .catch((error: unknown) => {
        console.error("Error al cargar habitaciones:", error);
      });
  };

  useEffect(() => {
    loadServices();
    loadRooms();
  }, []);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roomId = formData.get("roomId") as string;
    const description = formData.get("description") as string;
    const startDateValue = formData.get("startDate") as string;
    const endDateValue = formData.get("endDate") as string;
    const startDate = new Date(startDateValue).toISOString();

    const serviceData = {
      roomId,
      description,
      startDate,
      endDate: new Date(endDateValue).toISOString(),
    };

    api.post("/cleanservice/", serviceData)
      .then((response: AxiosResponse) => {
        setModalMessage("Servicio de limpieza asignado exitosamente");
        setIsFormModalOpen(false);
        setIsMessageModalOpen(true);
        loadServices();
      })
      .catch((error: unknown) => {
        console.error("Error al asignar servicio de limpieza:", error);
      });
  }

  const filteredServices = service.filter((serv) => {
    const matchesRoom =
      serv.room.toLowerCase().includes(searchRoom.toLowerCase());
    const matchesStatus =
      filterStatus === "" ||
      serv.status === filterStatus;
    return matchesRoom && matchesStatus;
  });
  return (
    <>
      <div>
        <h1>Servicio de limpieza</h1>
      </div>

      <div className="cleaning-container">
        <div className="cleaning-header">
          <div className="filters">
            <input type="text" placeholder="Buscar habitación..." value={searchRoom} onChange={(e) => setSearchRoom(e.target.value)} />
            <select
              title="Estado"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Estado</option>
              <option value="Programada">Programada</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completado">Completado</option>
            </select>
            <button className="btn-add" onClick={() => setIsFormModalOpen(true)}>
              + Asignar limpieza
            </button>
          </div>
        </div>

        <table className="cleaning-table">
          <thead>
            <tr>
              <th>Habitación</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((serv) => (
              <tr key={serv.id}>
                <td>{serv.room}</td>
                <td>{serv.description}</td>
                <td className={`status-${serv.status.toLowerCase()}`}>{serv.status}</td>
                <td>{serv.startDate} - {serv.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
          <Form title="Asignar servicio de limpieza" onSubmit={handleSubmit}
            submitLabel="Asignar">
            <label>Habitación:</label>
            <select name="roomId" required aria-label="Seleccionar habitación">
              <option value="">Seleccionar habitación</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.number}
                </option>
              ))}
            </select>
            <label>Detalles:</label>
            <input type="text" placeholder="Descripción" name="description" />
            <label htmlFor="startDate">Fecha y hora de inicio:</label>
            <input type="datetime-local" id="startDate" name="startDate" required />
          </Form>
        </Modal>
        <Modal isOpen={isMessageModalOpen} onClose={() => setIsMessageModalOpen(false)} title="Confirmar cancelación">
          <p>¿Estás seguro de que quieres cancelar este servicio de limpieza?</p>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={() => setIsMessageModalOpen(false)}>
              No
            </button>
            <button className="btn-confirm" onClick={() => {
              // Lógica para cancelar el servicio
              setIsMessageModalOpen(false);
            }}>
              Sí
            </button>
          </div>
        </Modal>
        <Modal isOpen={isMessageModalOpen} title="Información" onClose={() => setIsMessageModalOpen(false)}>
          <p>{modalMessage}</p>
        </Modal>
      </div>

    </>
  )
}

export default CleanService;