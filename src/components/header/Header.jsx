import { AppBar, Toolbar, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#d52d2d" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          color="inherit"
          onClick={() => console.log("Perfil foi clicado")}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
