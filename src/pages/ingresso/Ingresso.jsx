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



function ListIngressos() {
  const [ingressos, setIngressos] = useState([]);

  async function getIngressos() {
    await api.getIngressos().then(
      (response) => {
        console.log(response);
        setIngressos(response.data.ingressos);
      },
      (error) => {
        console.log(error)
      },
    );
  }
  useEffect(() => {
    getIngressos();
  }, []);
  console.log("ingressos:", ingressos);
    const listIngressos = ingressos.map((ingress) =>{
      return(
    <TableRow>
      <TableCell align="center">{ingress.preco}</TableCell>
      <TableCell align="center">{ingress.tipo}</TableCell>
      <TableCell align="center">Apagar</TableCell>

    </TableRow>
  )})

  return (
    <div>
      <TableContainer style={{margin:'4px'}} component={Paper}>
        <Table size="small" arial-label="a dense table">
            <TableHead style={{backgroundColor:"red",borderStyle:"solid"}}>
                <TableRow>
                    <TableCell align="center"> Preço do Ingresso</TableCell>
                    <TableCell align="center"> Tipo</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{listIngressos}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default ListIngressos;