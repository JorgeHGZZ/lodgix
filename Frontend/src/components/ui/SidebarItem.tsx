import { NavLink } from "react-router-dom";
import styles from "../../styles/SidebarItem.module.css";

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    path: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, path }) => {
    return (
        <NavLink to={path} className={styles.sidebarItem}>
            <span className={styles.icon}>{icon}</span>
            <span>{label}</span>
        </NavLink>
    );
};

export default SidebarItem;