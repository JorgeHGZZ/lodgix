import "../../styles/maintenance.css";
import { useState, useEffect } from "react";
import type { AxiosResponse } from "axios";
import Modal from "../../components/layout/Modal";
import Form from "../../components/layout/Form";
import { TiCancel } from "react-icons/ti";
import api from "../../services/api";

interface MaintenanceReport {
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

function Maintenance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMessage2, setModalMessage2] = useState("");
  const [reports, setReports] = useState<MaintenanceReport[]>([]);
  const [rooms, setRooms] = useState<RoomOption[]>([]);
  const [reportToDelete, setReportToDelete] = useState<MaintenanceReport | null>(null);
  const [searchRoom, setSearchRoom] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");


  const loadReports = () => {
    api.get("/maintenance/")
      .then((response: AxiosResponse) => {
        setReports(response.data);
      })
      .catch((error: unknown) => {
        console.error("Error al cargar reportes de mantenimiento:", error);
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
    loadReports();
    loadRooms();
  }, []);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roomId = formData.get("roomId") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;
    const startDateValue = formData.get("startDate") as string;
    const endDateValue = formData.get("endDate") as string;
    const startDate = new Date(startDateValue).toISOString();
    const endDate = new Date(endDateValue).toISOString();

    const report = { roomId, startDate, endDate, description, priority };
    api.post("/maintenance/", report)
      .then(() => {
        setModalMessage2("Reporte de mantenimiento creado exitosamente.");
        setIsModalOpen2(true);
        loadReports();
      }).catch((error: unknown) => {
        console.error("Error al crear reporte de mantenimiento:", error);
        setModalMessage2("Error al crear reporte de mantenimiento.");
        setIsModalOpen2(true);
      });
  }

  const handleCancel = (id: string) => {
    console.log("Cancelando reporte con ID:", id);
    api.post(`/maintenance/${id}/cancel`)
      .then(() => {
        setIsModalOpen2(true);
        setModalMessage2("Reporte de mantenimiento cancelado exitosamente.");
        loadReports();
      }).catch((error: unknown) => {
        console.error("Error al cancelar reporte de mantenimiento:", error);
        setModalMessage2("Error al cancelar reporte de mantenimiento.");
        setIsModalOpen2(true);
      });
  };

  const filteredReports = reports.filter((report) => {
    const matchesRoom =
      report.room.toLowerCase().includes(searchRoom.toLowerCase());
    const matchesPriority =
      filterPriority === "" ||
      report.priority === filterPriority;
    const matchesStatus =
      filterStatus === "" ||
      report.status === filterStatus;
    return matchesRoom && matchesPriority && matchesStatus;
  });

  return (
    <>
      <div>
        <h1 >Mantenimiento</h1>
      </div>

      <div className="maintenance-container">
        <div className="maintenance-header">
          <div className="filters">
            <input
              type="text"
              placeholder="Buscar habitación..."
              value={searchRoom}
              onChange={(e) => setSearchRoom(e.target.value)}
            />
            <select
              title="Prioridad"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">Prioridad</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
            <select
              title="Estado"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Estado</option>
              <option value="Programada">Programada</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completado">Completado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
            <button className="btn-add" onClick={() => setIsModalOpen(true)}>+ Reportar problema</button>
          </div>
        </div>
        <br></br>
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>Habitación</th>
              <th>Problema</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Fecha y hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td>{report.room}</td>
                <td>{report.description}</td>
                <td className={`priority-${report.priority.toLowerCase()}`}>{report.priority}</td>
                <td className={`status-${report.status.toLowerCase()}`}>{report.status}</td>
                <td>{report.startDate} - {report.endDate}</td>
                <td>
                  <button className="cancelar-btn" title="Cancelar reporte" aria-label="Cancelar reporte" onClick={() => {
                    setReportToDelete(report);
                    setShowDeleteModal(true);
                  }}><TiCancel />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal para crear nuevo reporte de mantenimiento */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Form onSubmit={handleSubmit} title="Nuevo reporte" submitLabel="Enviar">
            <label>Habitación:</label>
            <select name="roomId" required aria-label="Seleccionar habitación">
              <option value="">Seleccione habitación</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.number}
                </option>
              ))}
            </select>
            <label>Problema:</label>
            <input type="text" placeholder="Descripción del problema" name="description" />
            <label htmlFor="startDate">Fecha y hora de inicio:</label>
            <input type="datetime-local" id="startDate" name="startDate" required />
            <label htmlFor="endDate">Fecha y hora de fin:</label>
            <input type="datetime-local" id="endDate" name="endDate" required />
            <label>Prioridad:</label>
            <select title="Prioridad" name="priority">
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </Form>
        </Modal>
        {/* Modal de confirmación para cancelar el reporte */}
        <Modal isOpen={showDeleteModal} title="Confirmación" showCloseButton={false}
          onClose={() => {
            setShowDeleteModal(false);
            setReportToDelete(null);
          }}
        >
          <p>¿Estás seguro de cancelar el reporte de mantenimiento para{" "}<strong>{reportToDelete?.description}</strong>?</p>
          <div className="modalButtons">
            <button
              className="cancelButton"
              onClick={() => {
                setShowDeleteModal(false);
                setReportToDelete(null);
              }}>
              Regresar
            </button>
            <button
              className="deleteButton"
              onClick={() => {
                console.log("Cancelando reporte con ID:", reportToDelete?.id);
                if (!reportToDelete?.id) return;
                handleCancel(reportToDelete.id);
                setShowDeleteModal(false);
                setReportToDelete(null);
              }}>
              Cancelar
            </button>
          </div>
        </Modal>
        {/* Modal para mostrar mensaje después de crear o cancelar el reporte */}
        <Modal isOpen={isModalOpen2} title="Información" onClose={() => setIsModalOpen2(false)}>
          <p>{modalMessage2}</p>
        </Modal>
      </div>
    </>
  )
}

export default Maintenance;

