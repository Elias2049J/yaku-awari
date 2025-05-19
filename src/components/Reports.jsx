import { useEffect, useState } from "react";
import "./Tables.css";

function promedio(arr, key) {
  if (!arr.length) return 0;
  return (arr.reduce((sum, x) => sum + (x[key] ?? 0), 0) / arr.length).toFixed(2);
}

function Reports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLidar = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/lidar");
        const dataLidar = await res.json();
        setData(dataLidar);
      } catch (error) {
        setData([]);
        console.log("Error al obtener datos del servidor: ", error);
      }
      setLoading(false);
    };
    fetchLidar();
  }, []);

// datos ejemplo
  const calidadAgua = [
    { sector: "Magdalena", cloro: 0.7, turbiedad: 0.8, ph: 7.2 },
    { sector: "San Juan de Lurigancho", cloro: 0.5, turbiedad: 1.2, ph: 6.8 },
  ];
  const fallas = [
    { equipo: "Bomba 1", tipo: "Vibración alta", fecha: "2025-05-10", estado: "Pendiente" },
    { equipo: "Válvula 3", tipo: "Fuga detectada", fecha: "2025-05-12", estado: "Resuelto" },
  ];
  const presion = [
    { sector: "Magdalena", presion: 2.8, caudal: 120 },
    { sector: "San Juan de Lurigancho", presion: 2.1, caudal: 98 },
  ];
  const energia = [
    { estacion: "Estación Norte", consumo: 320, costo: 480 },
    { estacion: "Estación Sur", consumo: 280, costo: 420 },
  ];

  // patrones de consumo y posibles fugas usando datos lidar fake
  const resumenClasificacion = {};
  data.forEach((row) => {
    resumenClasificacion[row.clasificacion] = (resumenClasificacion[row.clasificacion] || 0) + 1;
  });

  if (loading) {
    return <div className="table-container">Cargando reportes...</div>;
  } else {
    return (
    <div>
      {/* report consumo y distribucion */}
      <div className="table-container">
        <h3>Consumo y Distribución</h3>
        <p>Monitorea el flujo de agua en diferentes sectores e identifica patrones de consumo y posibles fugas.</p>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Clasificación</th>
              <th>Cantidad de puntos</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(resumenClasificacion).map(([clas, cant]) => (
              <tr key={clas}>
                <td>{clas}</td>
                <td>{cant}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          {resumenClasificacion["Terreno"] && resumenClasificacion["Terreno"] < 3
            ? "Posible fuga detectada en Terreno."
            : "No se detectan fugas significativas."}
        </p>
      </div>

      {/* report calidad agua */}
      <div className="table-container">
        <h3>Calidad del Agua</h3>
        <p>Registra niveles de cloro, turbiedad y pH en tiempo real. Genera alertas si los valores están fuera de rango.</p>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Sector</th>
              <th>Cloro (mg/L)</th>
              <th>Turbiedad (NTU)</th>
              <th>pH</th>
              <th>Alerta</th>
            </tr>
          </thead>
          <tbody>
            {calidadAgua.map((row) => (
              <tr key={row.sector}>
                <td>{row.sector}</td>
                <td>{row.cloro}</td>
                <td>{row.turbiedad}</td>
                <td>{row.ph}</td>
                <td>
                  {(row.cloro < 0.5 || row.cloro > 1.5 || row.turbiedad > 1.0 || row.ph < 6.5 || row.ph > 8.5)
                    ? <span className="inactivo">Fuera de rango</span>
                    : <span className="activo">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* reporte fallas y mant */}
      <div className="table-container">
        <h3>Fallas y Mantenimiento</h3>
        <p>Detecta anomalías en bombas y válvulas. Programa mantenimiento preventivo basado en datos históricos.</p>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Tipo de Falla</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {fallas.map((row, i) => (
              <tr key={i}>
                <td>{row.equipo}</td>
                <td>{row.tipo}</td>
                <td>{row.fecha}</td>
                <td>
                  {row.estado === "Resuelto"
                    ? <span className="activo">{row.estado}</span>
                    : <span className="inactivo">{row.estado}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* report presion caudal */}
      <div className="table-container">
        <h3>Presión y Caudal</h3>
        <p>Analiza la presión en tuberías y estaciones de rebombeo. Ajusta automáticamente el suministro según la demanda.</p>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Sector</th>
              <th>Presión (bar)</th>
              <th>Caudal (L/s)</th>
            </tr>
          </thead>
          <tbody>
            {presion.map((row) => (
              <tr key={row.sector}>
                <td>{row.sector}</td>
                <td>{row.presion}</td>
                <td>{row.caudal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Presión promedio: {promedio(presion, "presion")} psi. Caudal promedio: {promedio(presion, "caudal")} L/s.
        </p>
      </div>

      {/* report energia y costos */}
      <div className="table-container">
        <h3>Energía y Costos Operativos</h3>
        <p>Evalúa el consumo energético de las estaciones de bombeo y optimiza costos ajustando la operación de equipos.</p>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Estación</th>
              <th>Consumo (kWh)</th>
              <th>Costo (S/)</th>
            </tr>
          </thead>
          <tbody>
            {energia.map((row) => (
              <tr key={row.estacion}>
                <td>{row.estacion}</td>
                <td>{row.consumo}</td>
                <td>{row.costo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Consumo total: {energia.reduce((sum, e) => sum + e.consumo, 0)} kWh. Costo total: S/ {energia.reduce((sum, e) => sum + e.costo, 0)}.
        </p>
      </div>
    </div>
  );
  }
}

export default Reports;