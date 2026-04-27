import styles from "../../styles/PLanding.module.css";
import Hotelimg from "../../assets/images/hotel2.jpg";
import Rooms1 from "../../assets/images/rooms1.jpg";
import Rooms2 from "../../assets/images/rooms2.webp";
import Rooms3 from "../../assets/images/rooms3.jpg";
import Hotel1 from "../../assets/images/Hotel1.jfif";
import Hotel2 from "../../assets/images/hotels2.jpg";
import Hotel3 from "../../assets/images/hotel3.webp";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Landing2() {
    return (
        <div className={styles.container}>

            {/* NAVBAR */}
            <nav className={styles.navbar}>
                <ul className={styles.navLinks}>
                    <NavLink to="/"> <li>Home</li></NavLink>
                    <NavLink to="/event"> <li>Event</li></NavLink>
                    <NavLink to="/aboutus"> <li>About</li></NavLink>
                </ul>

                <div className={styles.auth}>
                    <NavLink to="/register" className={styles.signup}>Signup</NavLink>
                    <NavLink to="/login" className={styles.login}>Login</NavLink>
                </div>
            </nav>
            {/* HERO */}
            <section className={styles.hero}>
                <div className={styles.heroText}>
                    <h1>
                       Tu puerta hacia la <br />
                        comodidad y experiencias únicas
                    </h1>
                    <p>Reserva ahora y obtén los mejores precios</p>
                </div>
            </section>

            {/* HOTELS */}
            <section className={styles.hotels}>
                <div className={styles.sectionHeader}>
                    <h2>Habitaciones populares que recomendamos para ti</h2>
                    <p>
                          Descubre nuestras habitaciones más populares diseñadas para tu
                        comodidad y descanso. Elige la opción perfecta y disfruta de una
                        experiencia inolvidable.
                    </p>
                </div>

                <div className={styles.hotelGrid}>
                    <div className={styles.hotelCard}>
                        <img src={Hotel1} />
                        <h3>Deluxe King Room</h3>
                        <p>1 King Bed • Vista a la ciudad</p>

                        <div className={styles.cardFooter}>
                            <span>$1500 por noche</span>
                            <span><FaStar /> 4.9</span>
                        </div>
                    </div>

                    <div className={styles.hotelCard}>
                        <img src={Hotel2} />
                        <h3>Superior Double Room</h3>
                        <p>2 camas dobles • Vista al jardin</p>

                        <div className={styles.cardFooter}>
                            <span>$1199 por noche</span>
                            <span><FaStar /> 4.8</span>
                        </div>
                    </div>

                    <div className={styles.hotelCard}>
                        <img src={Hotel3} />
                        <h3>Luxury Suite</h3>
                        <p>King Bed • Vista al mar</p>

                        <div className={styles.cardFooter}>
                            <span>$2900 por noche</span>
                            <span><FaStar /> 4.9</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MEMORIES */}
            <section className={styles.memories}>
                <h2>Recuerdos inolvidables y comodidad incomparable</h2>
                <p>
                    Vive la mejor experiencia de viaje con nuestra plataforma de reservas.
                </p>
                <button>Ver más</button>
                <div className={styles.memoryImages}>
                    <img src={Rooms1} />
                    <img src={Rooms3} />
                    <img src={Rooms2} />
                </div>
            </section>

            {/* STATS */}
            <section className={styles.stats}>
                <h2>With Our Experience We Will Serve You</h2>

                <div className={styles.statsGrid}>
                    <div>
                        <h3>800+</h3>
                        <p>Ciudades</p>
                    </div>

                    <div>
                        <h3>35,000+</h3>
                        <p>Hoteles exclusivos</p>
                    </div>

                    <div>
                        <h3>1.5M+</h3>
                        <p>Habitaciones disponibles</p>
                    </div>
                </div>
            </section>


            {/* FOOTER */}
            <footer className={styles.footer}>
                <h3>Suscríbete para recibir noticias y novedades</h3>

                <div className={styles.subscribe}>
                    <input placeholder="email@gmail.com" />
                    <button>Send</button>
                </div>

                <p>© Lodgix</p>
            </footer>

        </div>
    );
}

export default Landing2;