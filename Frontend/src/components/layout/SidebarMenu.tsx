import styles from "../../styles/SidebarMenu.module.css";
import SidebarItem from "../ui/SidebarItem";
import { MdBedroomChild } from "react-icons/md";
import { FaBed, FaUsers, FaTools, FaBroom, FaFileAlt, FaHome } from "react-icons/fa";



const SidebarMenu = () => {
    const menuItems = [
        { icon: <FaHome />, label: "Inicio", path: "/dashboard" },
        { icon: <MdBedroomChild />, label: "Habitaciones", path: "/dashboard/rooms" },
        { icon: <FaBed />, label: "Reservaciones", path: "/dashboard/reservaciones" },
        { icon: <FaUsers />, label: "Clientes", path: "/dashboard/clientes" },
        { icon: <FaTools />, label: "Mantenimiento", path: "/dashboard/mantenimiento" },
        { icon: <FaBroom />, label: "Limpieza", path: "/dashboard/limpieza" },
        { icon: <FaFileAlt />, label: "Reportes", path: "/dashboard/reportes" }
    ];
    return (
        <nav className={styles.SidebarMenu}>
            {menuItems.map(item => (
                <SidebarItem key={item.label} {...item} />
            ))}
        </nav>
    );
};

export default SidebarMenu;