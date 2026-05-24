import { useState } from "react";
import UserDropdown from "./UserDropdown";
import Avatar from "./Avatar";
import styles from "../../styles/SidebarUser.module.css";

interface UserProps {
    usuario: string;
    imagen: string;
}

const SidebarUser = ({usuario, imagen}: UserProps) => {
    const [open, setOpen] = useState(false);
    const imgURL = "http://localhost:5000" + imagen;
    console.log(usuario);

    return (
        <div className="sidebarUser">
            <div className={styles.userInfo} onClick={() => setOpen(!open)}>
                <Avatar src={imgURL} alt="Usuario" />
                <span>{usuario}</span>
            </div>
            {open && <UserDropdown />}
        </div>
    );
};

export default SidebarUser;