import { jwtDecode } from "jwt-decode";
import SidebarMenu from "./SidebarMenu";
import SidebarUser from "../ui/SidebarUser";
import styles from "../../styles/Sidebar.module.css";

interface TokenPayload {
    name: string;
    imageURL: string;
}

function Sidebar() {

    let username = "Usuario";
    let image = "/images/default-avatar.png";
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<TokenPayload>(token);
            username = decoded.userName || "Usuario";
            image = decoded.imageURL || "/images/default-avatar.png";
        }
    } catch (error) {
        console.error("Token inválido:", error);
    }

    return (
        <aside className={styles.sidebar}>
            <h1>Lodgix</h1>
            <hr className={styles.line} />
            <SidebarMenu />
            <hr className={styles.line} />
            <SidebarUser usuario={username} imagen={image} />
        </aside>
    );
};

export default Sidebar;