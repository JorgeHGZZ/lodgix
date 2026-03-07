import styles from '../../styles/Select.module.css';


interface SelectProps{
    nombre: string;
    id: string;
    titulo: string;
    opciones: {value: number, label:string}[];
}



function Select({ nombre, id, titulo, opciones }: SelectProps) {
    return (
        <select className={styles.Select} name={nombre} id={id} title={titulo}>
            {opciones.map((opcion) => (
                <option className={styles.option} key={opcion.value} value={opcion.value}>
                    {opcion.label}
                </option>
            ))}
        </select>
    )
}

export default Select;