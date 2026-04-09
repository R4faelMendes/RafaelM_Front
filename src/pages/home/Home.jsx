import ListUsers from "../../components/listUsers/listUsers";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state?.usuario;

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <Box sx={{ padding: 3 }}>
      
      {/* Topo */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Título */}
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        Bem-vindo {user?.nome || "Usuário"}
      </Typography>

      {/* Lista */}
      <ListUsers />

      {/* Navegação */}
      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("/evento")}
        >
          Evento
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("/ingresso")}
        >
          Ingresso
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("/organizador")}
        >
          Organizador
        </Button>
      </Box>
    </Box>
  );
}

export default Home;