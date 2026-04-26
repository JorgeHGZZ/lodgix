import "../../styles/reports.css";

function Reports(){
    return (
        <div>
            <h1>Reportes</h1>
            {/* <p>Si ves esto, el Outlet está funcionando.</p> */}

        <div className="reports-container">

      <div className="reports-filters">
        <select>
          <option>Últimos 7 días</option>
          <option>Últimos 30 días</option>
          <option>Este mes</option>
        </select>

        <select>
          <option>Tipo</option>
          <option>Ingresos</option>
          <option>Ocupación</option>
          <option>Limpieza</option>
        </select>

        <button className="btn-primary">Generar reporte</button>
      </div>

      {/* KPIs */}
      <div className="reports-stats">

        <div className="stat-card">
          <p>Ingresos</p>
          <h3>$45,230</h3>
        </div>

        <div className="stat-card">
          <p>Ocupación</p>
          <h3>78%</h3>
        </div>

        <div className="stat-card">
          <p>Habitaciones disponibles</p>
          <h3>12</h3>
        </div>

        <div className="stat-card">
          <p>Limpiezas realizadas</p>
          <h3>34</h3>
        </div>

      </div>

      <div className="chart-card">
        <h2>Ingresos por día</h2>

        <div className="chart">
          <div className="bar" style={{height:"60%"}}></div>
          <div className="bar" style={{height:"80%"}}></div>
          <div className="bar" style={{height:"40%"}}></div>
          <div className="bar" style={{height:"90%"}}></div>
          <div className="bar" style={{height:"70%"}}></div>
        </div>
      </div>

      {/* TABLA */}
      <div className="reports-table-container">

        <h2>Historial de reportes</h2>

        <table className="reports-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Resultado</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>10/03/2026</td>
              <td>Ingresos</td>
              <td>$5,200</td>
              <td className="status-done">Completado</td>
            </tr>

            <tr>
              <td>09/03/2026</td>
              <td>Ocupación</td>
              <td>82%</td>
              <td className="status-pending">Pendiente</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
    </div>
    );
}

export default Reports;