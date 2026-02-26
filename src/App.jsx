// Import de páginas
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";
import Evento from "./pages/evento/Evento";
import Organizador from "./pages/organizador/Organizador";
import Ingresso from "./pages/ingresso/Ingresso";

//Import das funções do router
import { 
  BrowserRouter,
  Routes,
  Route
 } from "react-router-dom";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/cadastro" element={<Cadastro/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/evento" element={<Evento/>}/>
          <Route path="/organizador" element={<Organizador/>}/>
          <Route path="/ingresso" element={<Ingresso/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;