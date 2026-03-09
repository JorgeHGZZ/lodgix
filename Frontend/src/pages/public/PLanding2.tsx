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
                        Your Gateway to <br />
                        Comfort and Convenience
                    </h1>
                    <p>Book now and get the best prices</p>
                </div>
            </section>

            {/* HOTELS */}
            <section className={styles.hotels}>
                <div className={styles.sectionHeader}>
                    <h2>Our Popular Rooms We Recommend for You</h2>
                    <p>
                        Discover our most popular rooms designed for comfort and relaxation.
                        Choose the perfect room for your stay and enjoy a memorable experience.
                    </p>
                </div>

                <div className={styles.hotelGrid}>
                    <div className={styles.hotelCard}>
                        <img src={Hotel1} />
                        <h3>Deluxe King Room</h3>
                        <p>1 King Bed • City View</p>

                        <div className={styles.cardFooter}>
                            <span>$120 / night</span>
                            <span><FaStar /> 4.9</span>
                        </div>
                    </div>

                    <div className={styles.hotelCard}>
                        <img src={Hotel2} />
                        <h3>Superior Double Room</h3>
                        <p>2 Double Beds • Garden View</p>

                        <div className={styles.cardFooter}>
                            <span>$119 / night</span>
                            <span><FaStar /> 4.8</span>
                        </div>
                    </div>

                    <div className={styles.hotelCard}>
                        <img src={Hotel3} />
                        <h3>Luxury Suite</h3>
                        <p>King Bed • Ocean View</p>

                        <div className={styles.cardFooter}>
                            <span>$209 / night</span>
                            <span><FaStar /> 4.9</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MEMORIES */}
            <section className={styles.memories}>
                <h2>Unforgettable Memories Unparalleled Comfort</h2>
                <p>
                    Experience ultimate travel comfort with our innovative hotel booking
                    app.
                </p>
                <button>Read More</button>
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
                        <p>Cities</p>
                    </div>

                    <div>
                        <h3>35,000+</h3>
                        <p>Exclusive Hotels</p>
                    </div>

                    <div>
                        <h3>1.5M+</h3>
                        <p>Exclusive Rooms</p>
                    </div>
                </div>
            </section>


            {/* FOOTER */}
            <footer className={styles.footer}>
                <h3>Subscribe to News and Resources</h3>

                <div className={styles.subscribe}>
                    <input placeholder="youremail@gmail.com" />
                    <button>Send</button>
                </div>

                <p>© GreenDoors</p>
            </footer>

        </div>
    );
}

export default Landing2;