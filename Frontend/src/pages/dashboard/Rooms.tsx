import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "../../components/layout/RoomCard";
import styles from "../../styles/Rooms.module.css"
import Topbar from "../../components/layout/Topbar";
import { api } from "../../services/api";

interface Room {
    _id?: string;
    id?: number;
    number?: string;
    status?: string;
    category: string;
    guestName?: string;
    floor?: number;
}



function Rooms() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedFloor, setSelectedFloor] = useState<string>("");

    const fetchRooms = async (floor?: number) => {
        try {
            const path = floor ? `/rooms/${floor}` : "/rooms/1";
            const response = await api.get(path);
            setRooms(response.data);
        } catch (error) {
            console.error("Error al cargar habitaciones:", error);
            setRooms([]);
        }
    };

    useEffect(() => {
        const loadRooms = async () => {
            await fetchRooms();
        };
        void loadRooms();
    }, []);

    const handleFloorChange = (floor: string) => {
        setSelectedFloor(floor);
        if (floor) {
            fetchRooms(Number(floor));
        } else {
            fetchRooms();
        }
    };

    return (
        <>
            <Topbar selectedFloor={selectedFloor} onFloorChange={handleFloorChange} />
            <div>
                <h1 className={styles.title}>Gestión de Habitaciones</h1>
                <div className={styles.RoomsContainer}>
                    {rooms.map((room) => (
                        <RoomCard
                            key={room._id ?? room.id}
                            id={room.id ?? Number(room.number)}
                            status={room.status ?? "Disponible"}
                            category={room.category}
                            guestName={room.guestName}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Rooms;