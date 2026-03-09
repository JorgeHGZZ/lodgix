import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";

//Hijos de dashboard
import Rooms from "../pages/dashboard/Rooms";
import Reservations from "../pages/dashboard/Reservations";
import Clients from "../pages/dashboard/Clients";
import Maintenance from "../pages/dashboard/Maintenance";
import Cleaning from "../pages/dashboard/CleanService";
import Reports from "../pages/dashboard/Reports";
import Home from "../pages/dashboard/Home";

//Rutas del lado del cliente
import PLanding from "../pages/public/PLanding";
import Landing2 from "../pages/public/PLanding2";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing2 />} />


                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />

                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<Home />} />
                    <Route path="rooms" element={<Rooms />} />
                    <Route path="reservaciones" element={<Reservations />} />
                    <Route path="clientes" element={<Clients />} />
                    <Route path="mantenimiento" element={<Maintenance />} />
                    <Route path="limpieza" element={<Cleaning />} />
                    <Route path="reportes" element={<Reports />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
