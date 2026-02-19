// Import de páginas
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;