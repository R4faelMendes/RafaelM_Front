import { AppBar, Toolbar } from "@mui/material";

function HeaderIndex(){
    return(
        <AppBar position="static" sx={{backgroundColor:"#D52D2D"}}>
            <Toolbar sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <h2>SISTEMA VIO</h2>                
            </Toolbar>
        </AppBar>
    )
}

export default HeaderIndex;