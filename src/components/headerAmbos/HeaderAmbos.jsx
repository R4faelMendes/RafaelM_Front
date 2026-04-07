import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function HeaderAmbos() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#ff2200" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton
          color="inherit"
          onClick={() => console.log("Perfil foi clicado")}
        >
          <Typography>Sistema vio</Typography>
          
        </IconButton>
        
      </Toolbar>
    </AppBar>
  );
}
export default HeaderAmbos;
