import Navbar from "../components/layout/Navbar"
import Button from "../components/ui/Button"
import "../styles/App.css"
import dashboardimg from "../assets/images/dashboard.png"
import { useNavigate } from "react-router"


function Landing() {

    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <section className="inicio">
                <div className="texto">
                    <h1>Gestiona tu hotel de forma simple, rápida y sin errores</h1>
                    <p>Controla reservas, habitaciones, huéspedes y pagos desde un solo lugar.
                        Nuestro sistema centraliza toda la operación del hotel en una sola plataforma</p>
                </div>
                <img src={dashboardimg} alt="Hotel" />
            </section>
            <section className="container">
                <div className="item">
                    <h1 className="uno">Gestion de habitaciones</h1>
                    <ul className="ul-uno">
                        <li>Disponibilidad en tiempo real</li>
                        <li>Estados: libre, ocupada, limpieza, mantenimiento</li>
                    </ul>
                </div>
                <div className="item">
                    <h1>Reservas</h1>
                    <ul>
                        <li>Registro rápido de huéspedes</li>
                        <li>Evita overbooking</li>
                        <li>Calendario visual</li>
                    </ul>
                </div>
                <div className="item">
                    <h1>Pagos y facturacion</h1>
                    <ul>
                        <li>Control de pagos</li>
                        <li>Reportes claros</li>
                        <li>Exportación de datos</li>
                    </ul>
                </div>
                <div className="item">
                    <h1 className="cuatro">Reportes</h1>
                    <ul>
                        <li>Ocupación</li>
                        <li>Ingresos</li>
                        <li>Fechas personalizadas</li>
                    </ul>
                </div>
                <div className="item">
                    <Button onClick={() => navigate('/login')} classname="btn" titulo="Empieza Ahora"></Button>
                </div>
                <div className="item">
                    <h1 className="seis">Huespedes</h1>
                    <ul>
                        <li>Historial completo</li>
                        <li>Datos y preferencias</li>
                    </ul>
                </div>
            </section>
            <footer>
                <p>&copy; 2023 Lodgix. Todos los derechos reservados.</p>
            </footer>
        </>
    )
}

export default Landing;