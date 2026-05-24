import styles from '../../styles/Topbar.module.css';
import Select from '../ui/Select';
import StatusBar from '../ui/Statusbar';


interface TopbarProps {
    selectedFloor?: string;
    onFloorChange?: (floor: string) => void;
}

const Pisos = [
    { value: '', label: 'Todos los pisos' },
    { value: '1', label: 'Piso 1' },
    { value: '2', label: 'Piso 2' },
    { value: '3', label: 'Piso 3' },
    { value: '4', label: 'Piso 4' },
    { value: '5', label: 'Piso 5' },
];

function Topbar({ selectedFloor = '', onFloorChange }: TopbarProps) {
    return (
        <div className={styles.topbar}>
            <Select
                nombre='Pisos'
                id="pisos"
                titulo="Selecciona piso"
                opciones={Pisos}
                value={selectedFloor}
                onChange={onFloorChange}
            />
            <StatusBar />
        </div>
    )
}

export default Topbar;