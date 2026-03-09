import styles from "../../styles/HomeCard.module.css"

interface HomeCardProps {
    title: string;
    numero: number;
}

function HomeCard({ title, numero }: HomeCardProps) {
    return(
        <div className={styles.HomeCard}>
            <h2>{title}</h2>
            <p>{numero}</p>
        </div>
    )
}

export default HomeCard;