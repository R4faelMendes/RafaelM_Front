import ListIngressos from "../../components/listIngresso/listIngressos";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Ingresso(){
    const navigate = useNavigate()

    return(
        <div>
            <h1>Ingressos</h1>
            <ListIngressos/>

            <br/>
            <br/>

            <Button fullWidth variant="contained" onClick={()=> {navigate("/home")} }>Voltar</Button>
        </div>
    )
}

export default Ingresso;