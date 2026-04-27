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

            {/* HERO */}
            <section className="hero">
                <div className="hero-text">
                    <h1>Gestiona tu hotel de forma simple y profesional</h1>
                    <p>
                        Controla reservas, habitaciones, huéspedes y pagos desde un solo lugar.
                        Nuestro sistema centraliza toda la operación del hotel en una sola plataforma.
                    </p>

                      <Button onClick={() => navigate('/login')} classname="btn" titulo="Empieza Ahora"></Button>
                      
                </div>

                <img src={dashboardimg} alt="Dashboard" />
            </section>

            {/* FEATURES */}
            <section className="features">

                <div className="feature-card">
                    <h3>Habitaciones</h3>
                    <p>Disponibilidad en tiempo real y control total de estados.</p>
                </div>

                <div className="feature-card">
                    <h3>Reservas</h3>
                    <p>Gestión rápida, sin errores ni overbooking.</p>
                </div>

                <div className="feature-card">
                    <h3>Pagos</h3>
                    <p>Control de ingresos y reportes claros.</p>
                </div>

                <div className="feature-card">
                    <h3>Reportes</h3>
                    <p>Analiza ocupación e ingresos fácilmente.</p>
                </div>

                <div className="feature-card">
                    <h3>Huéspedes</h3>
                    <p>Historial completo y datos organizados.</p>
                </div>

            </section>

            <section className="cta">
                <h2>Empieza a gestionar tu hotel hoy</h2>
               
                     <Button onClick={() => navigate('/login')} classname="btn" titulo="Empieza Ahora"></Button>
                
                
            </section>

            <footer>
                <p>&copy; 2026 Lodgix. Todos los derechos reservados.</p>
            </footer>
        </>
    )
}

export default Landing;