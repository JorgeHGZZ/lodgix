import BarChart from "../../components/ui/BarChart";
import HomeCard from "../../components/layout/HomeCard";
import styles from "../../styles/Home.module.css"

const data = [
    { name: "Ene", ventas: 400 },
    { name: "Feb", ventas: 300 },
    { name: "Mar", ventas: 500 },
    { name: "Abr", ventas: 200 },
    { name: "May", ventas: 700 },
    { name: "Jun", ventas: 600 },
    { name: "Jul", ventas: 800 },
    { name: "Ago", ventas: 400 },
    { name: "Sep", ventas: 300 },
    { name: "Oct", ventas: 500 },
    { name: "Nov", ventas: 200 },
    { name: "Dic", ventas: 700 },
];


function Home() {
    return (
        <div>
            <h1>Inicio</h1>
            <div className={styles.HomeCardContainer}>
                <HomeCard title="Habitaciones totales" numero={40} />
                <HomeCard title="Habitaciones disponibles" numero={25} />
                <HomeCard title="Habitaciones ocupadas" numero={15} />
            </div>

            <BarChart data={data} />
        </div>
    );
}

export default Home;