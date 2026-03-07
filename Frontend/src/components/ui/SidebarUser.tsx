import { useState } from "react";
import UserDropdown from "./UserDropdown";
import Avatar from "./Avatar";

interface UserProps {
    usuario: string;
}


const SidebarUser = ({usuario}: UserProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="sidebarUser">
            <div className="userInfo" onClick={() => setOpen(!open)}>
                <Avatar src="/images/user.jpg" alt="Usuario" />
                <span>{usuario}</span>
            </div>

            {open && <UserDropdown />}
        </div>
    );
};

export default SidebarUser;