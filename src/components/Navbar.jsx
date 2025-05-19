import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-header">Yaku Awari</div>
    <ul className="navbar-list">
      <li>
        <Link to="/" className="navbar-link">
          Inicio
        </Link>
      </li>
      <li>
        <Link to="/reportes" className="navbar-link">
          Reportes
        </Link>
      </li>
      <li>
        <Link to="/configuracion" className="navbar-link">
          Configuración
        </Link>
      </li>
    </ul>
    <div className="navbar-footer">© 2025 Yaku Awari</div>
  </nav>
);

export default Navbar;