import styles from '../../styles/Topbar.module.css';
import Select from '../ui/Select';
import StatusBar from '../ui/Statusbar';


const Pisos= [
    {value: 1, label: 'Piso 1'},
    {value: 2, label: 'Piso 2'},
    {value: 3, label: 'Piso 3'},
    {value: 4, label: 'Piso 4'},
    {value: 5, label: 'Piso 5'},
]

function Topbar(){
    return(
        <div className={styles.topbar}>
            <Select nombre='Pisos' id="pisos" titulo="Selecciona piso" opciones={Pisos} />
            <StatusBar/>
        </div>
    )
}

export default Topbar;