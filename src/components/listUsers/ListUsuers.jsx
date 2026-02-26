import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import api from "../../axios/axios";

// Imports para criação de tabela
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

// TableHead é onde colocamos os titulos
import TableHead from '@mui/material/TableHead';

// TableBody é onde colocamos o conteúdo
import TableBody from '@mui/material/TableBody';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';



function ListUsers() {
  // constante criada para receber a lista usúario da nossa API
  const [users, setUser] = useState([]);

  //Função para criar a chamada da API
  async function getUsers() {
    await api.getUsers().then(
      (response) => {
        console.log(response);
        setUser(response.data.users);
      },
      (error) => {
        console.log(error)
      },
    );
  }
  useEffect(() => {
    getUsers();
  }, []);

  const listUsers = users.map((user) => {
    // Para cada linha do meu array de users eu retorno um component
    return(
        <TableRow>
            <TableCell align="center">{user.nome}</TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="center">Apagar</TableCell>

        </TableRow>
    )
  })

  return (
    <div>
      <TableContainer style={{margin:'4px'}} component={Paper}>
        <Table size="small" arial-label="a dense table">
            <TableHead style={{backgroundColor:"red",borderStyle:"solid"}}>
                <TableRow>
                    <TableCell align="center"> NOME</TableCell>
                    <TableCell align="center"> EMAIL</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{listUsers}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default ListUsers;