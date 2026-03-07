import { useState } from "react";
import UserDropdown from "./UserDropdown";
import Avatar from "./Avatar";
import styles from "../../styles/SidebarUser.module.css";

interface UserProps {
    usuario: string;
}


const SidebarUser = ({usuario}: UserProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="sidebarUser">
            <div className={styles.userInfo} onClick={() => setOpen(!open)}>
                <Avatar src="https://i.pravatar.cc/150" alt="Usuario" />
                <span>{usuario}</span>
            </div>
            {open && <UserDropdown />}
        </div>
    );
};

export default SidebarUser;