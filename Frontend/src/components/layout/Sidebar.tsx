
import SidebarMenu from "./SidebarMenu";
import SidebarUser from "../ui/SidebarUser";
import styles from "../../styles/Sidebar.module.css";


function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <h1 className={styles.titulo}>Lodgix</h1>
            <hr className={styles.line} />
            <SidebarMenu />
            <hr className={styles.line} />
            <SidebarUser usuario="John Doe" />
        </aside>
    );
};

export default Sidebar;