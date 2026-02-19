import { useState, useEffect, use } from "react";
import { Button } from "@mui/material";
import api from "../../axios/axios";

function ListUsers (){
    //COnstante criada para receber a lista de Usuários da nossa API
    const [users,setUser] = useState([]);

    function getUser(){

    }
    useEffect(()=>{

    },[]);

    return (
        <div>
            <p>Local onde devemos exibir nossa lista de usuários</p>
        </div>
    )
}

export default ListUsers;