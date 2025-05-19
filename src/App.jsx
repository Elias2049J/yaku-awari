import logo from './assets/logo.jpg'
import './App.css'
import Navbar from './components/Navbar'
import Tables from './components/Tables'
import Reports from './components/Reports'
import Notification from './components/Notification'
import Bottombar from './components/BottomBar'
import { Routes, Route} from "react-router-dom"

const distritos = ["Magdalena", "San Juan de Lurigancho"];
const itemsBottombar = [
  { label: "Ver Alertas", component: 
    <>
      <hr />
      <Notification status="exito" message="El flujo de agua de la matriz 24 ha sido redirigido hacia la matriz 15"/>
      <Notification status="alerta" message="La matriz 01 tiene riesgo de fuga"/>
      <Notification status="atencion" message="Todas las matrices en funcionamiento"/>
      <Notification status="peligro" message={`Se ha detectado una rotura de matriz en el distrito ${distritos[1]}`}/>
      <Notification status="atención" message="La matriz 45 tuvo una caida en la presión"/>
      <Notification status="info" message="Todas las matrices en funcionamiento"/>
      <Notification status="info" message="Los datos han sido actualizados"/>
      <Notification status="info" message="Los datos han sido actualizados"/>
    </> },
  { label: "Ver Datos Lidar", component: <><hr/><Tables/></> },
  { label: "Ocultar todo", component: null },

];

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={
            <>
              <img src={logo} className="logo"/>
              <h1 className='main-title'>Bienvenido al Sistema Yaku-Awari</h1>
            </>
            }/>
          <Route path='/reportes' element={
            <>
              <div>
                <h2 className='reporte-title'>Reportes</h2>
              </div>
              <Reports/>
            </>
            }/>
          <Route path='configuracion' element={
            <>
              <img src={logo} className="logo"/>
              <div>
                <h2 className='config-title'>Configuración</h2>
              </div>
            </>
          }/>
        </Routes>
        <Bottombar items={itemsBottombar}/>
      </div>

    </>
  )
}

export default App