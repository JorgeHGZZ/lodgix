import Button from "../ui/Button";
import styles from "../../styles/Navbar.module.css"
import { useNavigate } from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className={styles.navbar}>
            <h1>LODGIX</h1>
            <div className="nav-links">
                <Button classname={styles.btn} titulo="Sobre Nosotros" />
                <Button classname={styles.btn} titulo="Contacto" />
                <Button classname={styles.btn} titulo="Iniciar Sesion" onClick={() => navigate('/login')} />
            </div>
        </nav>
    )
}

export default Navbar;