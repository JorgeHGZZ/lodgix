import RoomCard from "../../components/layout/RoomCard";
import styles from "../../styles/Rooms.module.css"

const rooms = [
    { id: 101, status: "Disponible", category: "Doble" },
    { id: 102, status: "Ocupada", category: "Suite", guestName: "María García López" },
    { id: 103, status: "Mantenimiento", category: "Doble" },
    { id: 104, status: "Limpieza", category: "Sencilla" },
    { id: 105, status: "Disponible", category: "Suite" },
    { id: 106, status: "Ocupada", category: "Doble", guestName: "Carlos Martínez Pérez" },
    { id: 107, status: "Disponible", category: "Sencilla" },
    { id: 108, status: "Mantenimiento", category: "Suite" },
    { id: 109, status: "Limpieza", category: "Doble" },
    { id: 110, status: "Disponible", category: "Sencilla" },
];


function Rooms() {
    return (
        <div>
            <h1 className={styles.title}>Gestión de Habitaciones</h1>
            <div className={styles.RoomsContainer} >
                {
                    rooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            id={room.id}
                            status={room.status}
                            category={room.category}
                            guestName={room.guestName}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Rooms;