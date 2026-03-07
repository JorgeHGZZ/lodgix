import SidebarItem from "../ui/SidebarItem";
import { FaBed, FaUsers, FaTools, FaBroom, FaFileAlt } from "react-icons/fa";



const SidebarMenu = () => {
    const menuItems = [
        { icon: <FaBed />, label: "Reservaciones", path: "/reservaciones" },
        { icon: <FaUsers />, label: "Clientes", path: "/clientes" },
        { icon: <FaTools />, label: "Mantenimiento", path: "/mantenimiento" },
        { icon: <FaBroom />, label: "Limpieza", path: "/limpieza" },
        { icon: <FaFileAlt />, label: "Reportes", path: "/reportes" }
    ];
    return (
        <nav>
            {menuItems.map(item => (
                <SidebarItem key={item.label} {...item} />
            ))}
        </nav>
    );
};

export default SidebarMenu;