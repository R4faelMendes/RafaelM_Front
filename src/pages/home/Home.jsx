import ListUsers from "../../components/listUsers/ListUsers";
import { Button } from "@mui/material";
import { Link} from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

function Home(){
    const navigate = useNavigate()

    const handleLogout = ()=> {
        localStorage.removeItem("token")
        navigate("/");
    }

    // const location = useLocation();
    // const user = location.state.usuario;

    return(
        <div>
            {/* <h1>Bem-vindo {user?.nome}!!</h1> */}
            <h1>Bem-vindo!!</h1>

            <Button fullWidth onClick={handleLogout}>
                sair
            </Button>

            <br />
            <br />
            
            <nav>
                <Button fullWidth variant="contained" onClick={()=> {navigate("/organizador")}}>Organizador</Button>
                <br />
                <br />
                <Button fullWidth variant="contained" onClick={()=> {navigate("/eventos")}}>Eventos</Button>
                <br />
                <br />
                <Button fullWidth variant="contained" onClick={()=> {navigate("/ingressos")}}>Ingressos</Button>
                <br />
                <br />
            </nav>

            <ListUsers/>
        </div>
    )
}

export default Home;