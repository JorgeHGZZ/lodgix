import "../../styles/clean-service.css";

function CleanService(){
    return (
        <>
        <div>
            <h1>Servicio de limpieza</h1>
            {/* <p>Si ves esto, el Outlet está funcionando.</p> */}
        </div>

         <div className="cleaning-container">

      <div className="cleaning-header">

        <div className="filters">
          <input type="text" placeholder="Buscar habitación..." />

          <select>
            <option>Estado</option>
            <option>Pendiente</option>
            <option>En limpieza</option>
            <option>Limpia</option>
          </select>

           <button className="btn-add">Buscar</button>

          <button className="btn-add">+ Asignar limpieza</button>
        </div>
      </div>

      <table className="cleaning-table">
        <thead>
          <tr>
            <th>Habitación</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Empleado</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>301</td>
            <td className="status-cleaning">En limpieza</td>
            <td>Estándar</td>
            <td>María</td>
          </tr>

          <tr>
            <td>204</td>
            <td className="status-done">Limpia</td>
            <td>Profunda</td>
            <td>Ana</td>
          </tr>
        </tbody>
      </table>

    </div>
        
        </>
    )
}

export default CleanService;