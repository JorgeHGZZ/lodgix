import { IoMdExit } from "react-icons/io";
import styles from "../../styles/UserDropdown.module.css";


const UserDropdown = () => {
    return (
        <div className={styles.userDropdown}>
            <button className={styles.dropdownItem}>Perfil</button>
            <button className={styles.dropdownItem}>Configuración</button>
            <hr />
            <button className={`${styles.dropdownItem} ${styles.logout}`}> <IoMdExit /> Cerrar sesión</button>
        </div>
    );
};

export default UserDropdown;