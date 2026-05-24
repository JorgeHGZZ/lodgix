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
  const [showModal2, setShowModal2] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalMessage2, setModalMessage2] = useState("");
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<ClientProps | null>(null);

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
        setShowModal2(true);
        setModalMessage2("Cliente creado exitosamente.");
        // Aquí podrías actualizar la lista de clientes o mostrar un mensaje de éxito
        loadClients();
      })
      .catch((error) => {
        console.error("Error al crear cliente:", error);
        // Mostrar modal de error y limpiar formulario
        setShowModal2(true);
        setModalMessage2(error.response?.data?.message || "Error al crear cliente.");
      });
  }

  const handleEditClient = (client: ClientProps) => {
    // Aquí podrías abrir un modal con un formulario prellenado para editar el cliente
    console.log("Editar cliente:", client);
  }

  const handleDeleteClient = (clientId: string) => {
    api.delete(`/clients/${clientId}`)
      .then(() => {
        setShowModal2(true);
        setModalMessage2("Cliente eliminado exitosamente.");
        loadClients();
      })
      .catch((error) => {
        console.error("Error al eliminar cliente:", error);
        setShowModal2(true);
        setModalMessage2(error.response?.data?.message || "Error al eliminar cliente.");
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
                        <button onClick={() => {
                          setShowDeleteModal(true);
                          setClientToDelete(client);
                        }}><MdDelete /></button>
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
        isOpen={showDeleteModal}
        title="Confirmación"
        showCloseButton={false}
        onClose={() => {
          setShowDeleteModal(false);
          setClientToDelete(null);
        }}
      >
        <p>
          ¿Estás seguro de eliminar a{" "}
          <strong>{clientToDelete?.name}</strong>?
        </p>

        <div className="modalButtons">

          <button
            className="cancelButton"
            onClick={() => {
              setShowDeleteModal(false);
              setClientToDelete(null);
            }}
          >
            Cancelar
          </button>
          <button
            className="deleteButton"
            onClick={() => {
              if (!clientToDelete?._id) return;
              handleDeleteClient(clientToDelete._id);
              setShowDeleteModal(false);
              setClientToDelete(null);
            }}
          >
            Eliminar
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={showModal2}
        title="Información"
        onClose={() => setShowModal2(false)}
      >
        <p>{modalMessage2}</p>
      </Modal>
    </>
  );
}

export default Clients;