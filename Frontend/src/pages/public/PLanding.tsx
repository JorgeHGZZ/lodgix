import { Link } from "react-router-dom";
import styles from "../../styles/PLanding.module.css";

export default function PLanding() {
    return (
        <div>

            {/* HERO */}
            <section className={styles.hero}>
                <div className={styles.overlay}>
                    <h1 className={styles.title}>Hotel Aurora</h1>
                    <p className={styles.subtitle}>
                        Tu escape perfecto entre lujo y naturaleza
                    </p>

                    <div className={styles.buttons}>
                        <Link to="/rooms">
                            <button className={styles.primaryBtn}>Ver Habitaciones</button>
                        </Link>

                        <Link to="/booking">
                            <button className={styles.secondaryBtn}>Reservar Ahora</button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SOBRE EL HOTEL */}
            <section className={styles.section}>
                <h2>Bienvenido a Hotel Aurora</h2>
                <p className={styles.text}>
                    Disfruta de una experiencia única en nuestro hotel. Habitaciones de lujo,
                    gastronomía internacional, piscina infinita y un servicio pensado para
                    brindarte el descanso perfecto.
                </p>
            </section>

            {/* HABITACIONES */}
            <section className={styles.sectionGray}>
                <h2>Nuestras Habitaciones</h2>

                <div className={styles.grid}>

                    <div className={styles.card}>
                        <h3>Habitación Standard</h3>
                        <p>Perfecta para una escapada tranquila.</p>
                        <p><strong>$80 / noche</strong></p>
                        <Link to="/booking">
                            <button className={styles.primaryBtn}>Reservar</button>
                        </Link>
                    </div>

                    <div className={styles.card}>
                        <h3>Habitación Deluxe</h3>
                        <p>Espacio amplio con vista al mar.</p>
                        <p><strong>$120 / noche</strong></p>
                        <Link to="/booking">
                            <button className={styles.primaryBtn}>Reservar</button>
                        </Link>
                    </div>

                    <div className={styles.card}>
                        <h3>Suite Premium</h3>
                        <p>Lujo y confort para una experiencia inolvidable.</p>
                        <p><strong>$180 / noche</strong></p>
                        <Link to="/booking">
                            <button className={styles.primaryBtn}>Reservar</button>
                        </Link>
                    </div>

                </div>
            </section>

            {/* SERVICIOS */}
            <section className={styles.section}>
                <h2>Servicios</h2>

                <div className={styles.grid}>

                    <div className={styles.service}>🏊 Piscina</div>
                    <div className={styles.service}>📶 Wifi Gratis</div>
                    <div className={styles.service}>🍽 Restaurante</div>
                    <div className={styles.service}>💆 Spa</div>
                    <div className={styles.service}>🏋️ Gimnasio</div>
                    <div className={styles.service}>🚗 Parking</div>

                </div>
            </section>

            {/* GALERIA */}
            <section className={styles.sectionGray}>
                <h2>Galería</h2>

                <div className={styles.grid}>
                    <img src="https://picsum.photos/300/200?1" alt="" />
                    <img src="https://picsum.photos/300/200?2" alt="" />
                    <img src="https://picsum.photos/300/200?3" alt="" />
                    <img src="https://picsum.photos/300/200?4" alt="" />
                </div>
            </section>

            {/* TESTIMONIOS */}
            <section className={styles.section}>
                <h2>Opiniones de nuestros huéspedes</h2>

                <div className={styles.grid}>

                    <div className={styles.card}>
                        ⭐⭐⭐⭐⭐
                        <p>"Una experiencia increíble. El servicio fue excelente."</p>
                        <strong>- María López</strong>
                    </div>

                    <div className={styles.card}>
                        ⭐⭐⭐⭐⭐
                        <p>"Las habitaciones son hermosas y muy cómodas."</p>
                        <strong>- Carlos Ruiz</strong>
                    </div>

                    <div className={styles.card}>
                        ⭐⭐⭐⭐⭐
                        <p>"Volvería sin pensarlo. Todo fue perfecto."</p>
                        <strong>- Ana Torres</strong>
                    </div>

                </div>
            </section>

            {/* CTA FINAL */}
            <section className={styles.cta}>
                <h2>Reserva tu experiencia hoy</h2>
                <Link to="/booking">
                    <button className={styles.primaryBtn}>Reservar Ahora</button>
                </Link>
            </section>

            {/* FOOTER */}
            <footer className={styles.footer}>
                <p>Hotel Aurora © 2026</p>
                <p>Contacto: contacto@hotelaurora.com</p>
            </footer>

        </div>
    );
}

