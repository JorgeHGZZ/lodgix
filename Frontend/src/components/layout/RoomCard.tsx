import { FaPlus } from "react-icons/fa6";
import styles from "../../styles/RoomCard.module.css"


interface RoomCardProps {
    id: number;
    status: string;
    category: string;
    guestName?: string;
}


function RoomCard({ id, status, category, guestName }: RoomCardProps) {
    return (
        <div className={`${styles.RoomCard} ${styles[status]}`}>
            <div className={styles.header}>
                <p>Habitacion {id}</p>
                <button><FaPlus /></button>
            </div>
            <div className={styles.body}>
                <p>{guestName}</p>
                <p>Categoria: {category}</p>
            </div>
            <button className={styles.statusButton}>{status}</button>
        </div>
    )
}

export default RoomCard;