import { useEffect, useState } from "react";
import "./Tables.css";

const clasificaciones = ["Todas", "Terreno", "Vegetación", "Edificio"];
const PAGE_SIZE = 5;

function Tables() {
    const [data, setData] = useState([]);
    const [sortBy, setSortBy] = useState("id");
    const [sortDir, setSortDir] = useState("asc");
    const [filterClas, setFilterClas] = useState("Todas");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchLidar = async() => {
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

  // filtrar
  const filtrado = data.filter(
    (row) => filterClas === "Todas" || row.clasificacion === filterClas
  );

  // ordenar
  const ordenado = [...filtrado].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  // paginacion
  const totalPaginas = Math.ceil(ordenado.length / PAGE_SIZE);
  const paginados = ordenado.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  //cmbiar orden
  const cambiarOrden = (col) => {
    if (sortBy === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  };

  // cambiar filtro
  const cambiarFiltro = (e) => {
    setFilterClas(e.target.value);
    setPage(1);
  };

  // cambiar página
  const cambiarPágina = (newPage) => {
    if (newPage >= 1 && newPage <= totalPaginas) setPage(newPage);
  };

  if (loading) {
    return <div className="table-container">Cargando datos...</div>;
  } else {
    return (
    <div className="table-container">
      <div className="table-controls">
        <label>
          Filtrar por clasificación:{" "}
          <select value={filterClas} onChange={cambiarFiltro}>
            {clasificaciones.map((clas) => (
              <option key={clas} value={clas}>
                {clas}
              </option>
            ))}
          </select>
        </label>
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th onClick={() => cambiarOrden("id")}>
              ID {sortBy === "id" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => cambiarOrden("x")}>
              X {sortBy === "x" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => cambiarOrden("y")}>
              Y {sortBy === "y" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => cambiarOrden("z")}>
              Z {sortBy === "z" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => cambiarOrden("intensidad")}>
              Intensidad {sortBy === "intensidad" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => cambiarOrden("clasificacion")}>
              Clasificación {sortBy === "clasificacion" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginados.length === 0 ? (
            <tr>
              <td colSpan={6} className="no-data">
                Sin datos
              </td>
            </tr>
          ) : (
            paginados.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.x}</td>
                <td>{row.y}</td>
                <td>{row.z}</td>
                <td>{row.intensidad}</td>
                <td>{row.clasificacion}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="table-pagination">
        <button onClick={() => cambiarPágina(page - 1)} disabled={page === 1}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPaginas}
        </span>
        <button onClick={() => cambiarPágina(page + 1)} disabled={page === totalPaginas}>
          Siguiente
        </button>
      </div>
    </div>
  );
  }
}

export default Tables;