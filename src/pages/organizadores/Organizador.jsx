import ListOrganizadores from "../../components/listOrganizadores/listOrganizadores";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Organizador(){
    const navigate = useNavigate()

    return(
        <div>
            <h1>Organizadores</h1>
            <ListOrganizadores/>

             <br/>
            <br/>

            <Button fullWidth variant="contained" onClick={()=> {navigate("/home")} }>Voltar</Button>
        </div>
    )
}

export default Organizador;