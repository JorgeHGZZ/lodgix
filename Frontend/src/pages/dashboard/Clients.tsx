import { useState, useEffect } from "react";
import "../../styles/client.css";
import Searchbar from "../../components/layout/Searchbar";
import Form from "../../components/layout/Form";
import { api } from "../../services/api"
import Modal from "../../components/layout/Modal";
import { MdDelete, MdEdit } from "react-icons/md";

interface ClientProps {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}


function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [clients, setClients] = useState<ClientProps[]>([]);

  useEffect(() => {
    api.get("/clients/")
      .then((response) => {
        const clients = response.data;
        setClients(clients);
      })
      .catch((error) => {
        console.error("Error al cargar clientes:", error);
      });
  }, []);

  const loadClients = () => {
    api.get("/clients/")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar clientes:", error);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //manejar envio
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    const newClient = { name, email, phone, address };
    api.post("/clients", newClient)
      .then((response) => {
        console.log("Cliente creado:", response.data);
        //Mostrar modal de éxito y limpiar formulario
        setShowModal(true);
        setModalMessage("Cliente creado exitosamente.");
        // Aquí podrías actualizar la lista de clientes o mostrar un mensaje de éxito
        loadClients();
      })
      .catch((error) => {
        console.error("Error al crear cliente:", error);
        // Mostrar modal de error y limpiar formulario
        setShowModal(true);
        setModalMessage(error.response?.data?.message || "Error al crear cliente.");
      });
  }

  const handleEditClient = (client: ClientProps) => {
    // Aquí podrías abrir un modal con un formulario prellenado para editar el cliente
    console.log("Editar cliente:", client);
  }

  const handleDeleteClient = (clientId: string) => {
    api.delete(`/clients/${clientId}`)
      .then(() => {
        console.log("Cliente eliminado:", clientId);
        setShowModal(true);
        setModalMessage("Cliente eliminado exitosamente.");
        loadClients();
      })
      .catch((error) => {
        console.error("Error al eliminar cliente:", error);
        setShowModal(true);
        setModalMessage(error.response?.data?.message || "Error al eliminar cliente.");
      });
    console.log("Eliminar cliente:", clientId);
  }

  return (
    <>
      <h1 >Clientes</h1>
      <Searchbar />
      <div className="ClientsContainer">
        <div className="Left">
          <div className="ClientTable">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  clients.map((client) => (
                    <tr key={client._id}>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
                      <td>{client.address}</td>
                      <td>
                        <button onClick={() => handleEditClient(client)}><MdEdit /></button>
                        <button onClick={() => handleDeleteClient(client._id)}><MdDelete /></button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="Right">
          <div className="Clientform">
            <Form title="Nuevo Cliente" submitLabel="Crear Cliente" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <input type="text" id="address" name="address" />
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        title="Información"
        onClose={() => setShowModal(false)}
      >
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
}

export default Clients;