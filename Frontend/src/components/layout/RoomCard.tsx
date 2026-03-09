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
            <div className={styles.CardHeader}>
                <p>Habitacion {id}</p>
                <button><FaPlus /></button>
            </div>
            <hr className={styles.CardSeparator} />
            <div className={styles.CardBody}>
                <p>{guestName}</p>
                <p>Categoria: {category}</p>
            </div>
            <hr className={styles.CardSeparator} />
            <div className={styles.CardFooter}>
                <button className={styles.statusButton}>{status}</button>
            </div>

        </div>
    )
}

export default RoomCard;