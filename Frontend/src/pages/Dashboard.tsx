import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.tsx";
import styles from "../styles/Dashboard.module.css";


function Dashboard() {
    return (
        <>
            <div className={styles.DashboardContainer}>
                <div className={styles.item}>
                    <Sidebar />
                </div>
                <main className={styles.item}>
                    <Outlet />{}
                </main>
            </div>
        </>
    )
}

export default Dashboard;