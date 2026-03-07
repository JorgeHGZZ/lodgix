import styles from '../../styles/Statusbar.module.css';

function StatusBar(){
    return(
        <div className={styles.StatusBar}>
            <p className={`${styles.status} ${styles.ocupada}`}>Ocupada</p>
            <p className={`${styles.status} ${styles.disponible}`}>Disponible</p>
            <p className={`${styles.status} ${styles.mantenimiento}`}>Mantenimiento</p>
            <p className={`${styles.status} ${styles.limpieza}`}>Limpieza</p>
        </div>
    )
}

export default StatusBar;