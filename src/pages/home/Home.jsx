import ListUsers from "../../components/listUsers/ListUsuers";
import Evento from "../evento/Evento";
import Organizador from "../organizador/Organizador";
import Ingresso from "../ingresso/Ingresso";
import { Link,useNavigate } from "react-router-dom";
function Home () {
    return (
        <div>
            <h1 align="center">Tela Home</h1>
            <div><ListUsers/></div>
            <div><Link to={`/evento`}>Eventos</Link></div>
            <div><Link to={`/organizador`}>Organizador</Link></div>
            <div><Link to={`/ingresso`}>Ingressos</Link></div>

            
        </div>//Pag Evento,pag organizador,pag ingresso
    );
}

export default Home;