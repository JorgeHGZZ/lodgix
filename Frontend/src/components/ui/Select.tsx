import styles from '../../styles/Select.module.css';


interface SelectProps{
    nombre: string;
    id: string;
    titulo: string;
    opciones: {value: string, label:string}[];
    value?: string;
    onChange?: (value: string) => void;
}

function Select({ nombre, id, titulo, opciones, value, onChange }: SelectProps) {
    return (
        <select
            className={styles.Select}
            name={nombre}
            id={id}
            title={titulo}
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
        >
            {opciones.map((opcion) => (
                <option className={styles.option} key={opcion.value} value={opcion.value}>
                    {opcion.label}
                </option>
            ))}
        </select>
    )
}

export default Select;