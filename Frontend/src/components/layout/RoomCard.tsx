import { FaPlus } from "react-icons/fa6";
import styles from "../../styles/RoomCard.module.css"


interface RoomCardProps {
    roomNumber: string;
    status: string;
    category: string;
    guestName?: string;
    onClick?: () => void;
}


function RoomCard({ roomNumber, status, category, guestName, onClick }: RoomCardProps) {
    return (
        <div
            className={`${styles.RoomCard} ${styles[status]}`}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={(event) => {
                if (onClick && (event.key === "Enter" || event.key === " ")) {
                    onClick();
                }
            }}
        >
            <div className={styles.CardHeader}>
                <p>Habitación {roomNumber}</p>
                <button type="button"><FaPlus /></button>
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