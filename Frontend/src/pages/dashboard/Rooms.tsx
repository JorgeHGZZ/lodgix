import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "../../components/layout/RoomCard";
import styles from "../../styles/Rooms.module.css";
import api from "../../services/api.js";

interface Room {
    _id: string;
    number: string;
    status: string;
    category: string;
    guestName?: string;
}

function Rooms() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get<Room[]>("/rooms")
            .then((response) => {
                setRooms(response.data);
            })
            .catch((err) => {
                console.error("Error al obtener las habitaciones:", err);
                setError("No se pudieron cargar las habitaciones.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1 className={styles.title}>Gestión de Habitaciones</h1>
            <div className={styles.RoomsContainer}>
                {loading && <p>Cargando habitaciones...</p>}
                {error && <p className={styles.error}>{error}</p>}
                {!loading && !error && rooms.length === 0 && <p>No hay habitaciones disponibles.</p>}
                {!loading && !error && rooms.map((room) => (
                    <RoomCard
                        key={room._id}
                        roomNumber={room.number}
                        status={room.status}
                        category={room.category}
                        guestName={room.guestName}
                        onClick={() => navigate(`/dashboard/detailroom/${room._id}`, { state: { room } })}
                    />
                ))}
            </div>
        </div>
    );
}

export default Rooms;