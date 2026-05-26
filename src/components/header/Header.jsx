import { AppBar, Toolbar, IconButton } from "@mui/material";
import AccoountCircleIcon from "@mui/icons-material/AccountCircle";

function Header(){
    return(
        <AppBar position="static" sx={{backgroundColor:"#D52D2D"}}>
            <Toolbar sx={{display:"flex", justifyContent:"flex-end"}}>
                <IconButton color="inherit" onClick={()=> console.log("Perfil foi clicado")}>
                    <AccoountCircleIcon fontSize="large"/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header;