interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => {
    return (
        <div className="sidebarItem">
            <span className="icon">{icon}</span>
            <span>{label}</span>
        </div>
    );
};

export default SidebarItem;