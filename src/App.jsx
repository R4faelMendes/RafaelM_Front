//Imports de Páginas
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";
import Organizador from "./pages/organizadores/Organizador";
import Eventos from "./pages/eventos/Eventos";
import Ingresso from "./pages/ingresso/Ingressos";
import AdicionarIngressos from "./pages/addIngresso/adicionarIngresso";
import CreateEvent from "./pages/addEvento/createEvento";

// Import Component
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import DefaultLayoutIndex from "./components/defaultLayoutIndex/DefaultLayoutIndex";

//Import das funções do router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <div>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DefaultLayoutIndex>
                <Login />
              </DefaultLayoutIndex>
            }
          />
          <Route
            path="/cadastro"
            element={
              <DefaultLayoutIndex>
                <Cadastro />
              </DefaultLayoutIndex>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizador"
            element={
              <ProtectedRoute>
                <Organizador />
              </ProtectedRoute>
            }
          />
          <Route
            path="/eventos"
            element={
              <ProtectedRoute>
                <Eventos />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/criar/evento"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            } />
          <Route
            path="/ingressos"
            element={
              <ProtectedRoute>
                <Ingresso />
              </ProtectedRoute>
            }
          />
          <Route
            path="/evento/novo"
            element={
              <ProtectedRoute>
                <AdicionarIngressos />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
