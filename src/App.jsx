// Imports de Páginas
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";

import Evento from "./pages/evento/Evento";
import Ingresso from "./pages/ingresso/Ingresso";
import Organizador from "./pages/organizador/Organizador";
import { CssBaseline } from "@mui/material";

import DefaultLayoutIndex from "./components/defaultLayoutIndex/DefaultLayoutIndex";

// Import Component
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Import das funções do router
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayoutIndex><Login /></DefaultLayoutIndex>} />
          <Route path="/cadastro" element={<DefaultLayoutIndex><Cadastro /></DefaultLayoutIndex>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="/evento" element={<ProtectedRoute><Evento/></ProtectedRoute>}/>
          <Route path="/ingresso" element={<ProtectedRoute><Ingresso /> </ProtectedRoute>}/>
          <Route path="/organizador" element={<ProtectedRoute> <Organizador /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
