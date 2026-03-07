import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.tsx";
import Topbar from "../components/layout/Topbar.tsx";
import styles from "../styles/Dashboard.module.css";


function Dashboard() {
    return (
        <>
            <div className={styles.DashboardContainer}>
                <div className={styles.item}>
                    <Sidebar />
                </div>
                <div className={styles.item}>
                    <Topbar />
                </div>
                <main className={styles.item}>
                    <Outlet />{}
                </main>
            </div>
        </>
    )
}

export default Dashboard;