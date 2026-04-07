import { Link } from "react-router-dom";
import ListUsers from "../../components/listUsers/listUsers";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate ();
  const handleLogout = () => {
    localStorage.removeItem("auth")
    navigate("/")
  }

  return (
    
    <div>
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <h1 align="center">BEM-VINDO AO SISTEMA DE EVENTOS</h1>
      <ListUsers/>

      <Button fullWidth variant="contained" onClick={() => navigate("/evento")}>
            Evento
      </Button>

      <Button fullWidth variant="contained" onClick={() => navigate("/ingresso")}>
            ingresso
      </Button>

      <Button fullWidth variant="contained" onClick={() => navigate("/organizador")}>
            organizador
      </Button>

      
    
    </div>
  );
}

export default Home;