import ListEventos from "../../components/listEventos/listEventos";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Eventos(){
    const navigate = useNavigate()

    return(
        <div>
            <h1>Eventos</h1>
            <ListEventos/>

            <Button fullWidth color="error" variant="contained" component={Link} to="/criar/evento">
                crie evento
            </Button>

            <br/>
            <br/>

            <Button fullWidth variant="contained" onClick={()=> {navigate("/home")} }>Voltar</Button>
        </div>
    )
}

export default Eventos;