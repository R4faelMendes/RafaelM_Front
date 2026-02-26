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



function ListEventos() {
  const [eventos, setEventos] = useState([]);

  async function getEventos() {
    await api.getEventos().then(
      (response) => {
        console.log(response);
        setEventos(response.data.events);
      },
      (error) => {
        console.log(error)
      },
    );
  }
  useEffect(() => {
    getEventos();
  }, []);

    const listEventos = eventos.map((events) =>{
      return(
    <TableRow>
      <TableCell align="center">{events.nome}</TableCell>
      <TableCell align="center">{events.fk_id_organizador}</TableCell>
      <TableCell align="center">Apagar</TableCell>

    </TableRow>
  )})

  return (
    <div>
      <TableContainer style={{margin:'4px'}} component={Paper}>
        <Table size="small" arial-label="a dense table">
            <TableHead style={{backgroundColor:"red",borderStyle:"solid"}}>
                <TableRow>
                    <TableCell align="center"> Nome do Evento</TableCell>
                    <TableCell align="center"> id organizador</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{listEventos}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default ListEventos;