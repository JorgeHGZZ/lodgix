import "../../styles/maintenance.css";


function Maintenance(){
    return ( 
    <>
         <div>
            <h1 className="h1">Mantenimiento</h1>
            {/* <p>Si ves esto, el Outlet está funcionando.</p> */}
        </div> 
       
          <div className="maintenance-container">

      <div className="maintenance-header">

        <div className="filters">
          <input type="text" placeholder="Buscar habitación..." />
          
          <select>
            <option>Prioridad</option>
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>

          <select>
            <option>Estado</option>
            <option>Pendiente</option>
            <option>En proceso</option>
            <option>Completado</option>
          </select>

          <button className="btn-add">Buscar</button>
          <button className="btn-add">+ Reportar problema</button>
         
        </div>
      </div>

      <br></br>

      <table className="maintenance-table">
        <thead>
          <tr>
            <th>Habitación</th>
            <th>Problema</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Técnico</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>203</td>
            <td>Aire acondicionado</td>
            <td className="priority-high">Alta</td>
            <td className="status-progress">En proceso</td>
            <td>08/03/2026</td>
            <td>Juan</td>
          </tr>

          <tr>
            <td>105</td>
            <td>Fuga en baño</td>
            <td className="priority-medium">Media</td>
            <td className="status-pending">Pendiente</td>
            <td>07/03/2026</td>
            <td>Pedro</td>
          </tr>
        </tbody>
      </table>

    </div>
    </>
    )
}

export default Maintenance;