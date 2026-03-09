import Searchbar from "../../components/layout/Searchbar";

function Reservations() {
    return (
        <>
        <div>
            <h1>Reservaciones</h1>
            {/* <p>Si ves esto, el Outlet está funcionando.</p> */}
        </div> 
        <p>Nombre del cliente que reservo:</p>
        <Searchbar />

        <div className= "cuadro" id="cuadro">

        </div>
        
        </>
    );

   
}


export default Reservations;