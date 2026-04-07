import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDelete from "../dialogDelete/ConfirmDelete";

import api from "../../axios/axios";

// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";

// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

function Organizador() {
  // constante criada para receber a lista usúario da nossa APIF
  const [organizadores, setOrganizador] = useState([]);
  const [state, setState] = useState(0);
  //Contantes para controlar a exclusão de um usuário
  const [modalOpen, setModalOpen] = useState(false);
  const [organizadorToDelete, setOrganizadorToDelete] = useState(null);

  const handleOpenModal = (organizador) => {
    setOrganizadorToDelete(organizador);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {};

  //Função para criar a chama    getUsers();
  async function getOrganizador() {
    await api.getOrganizador().then(
      (response) => {
        console.log(response);
        setOrganizador(response.data.organizadores);
      },
      (error) => {
        console.log(error);
      },
    );
  }
  useEffect(() => {
    getOrganizador();
  }, [state]);

  async function deleteOrganizador(id_organizador) {
    try {
      await api.deleteOrganizador(organizadorToDelete.id_organizador);
      setModalOpen(false);
      setOrganizadorToDelete(null);
      setState(state + 1);
    } catch (error) {
      setModalOpen(false);
      setOrganizadorToDelete(null);
      console.error("Erro ao deletar", error);
      alert(error.response);
    }
  }

  const listOrganizador = organizadores.map((user) => {
    // Para cada linha do meu array de users eu retorno um component
    return (
      <TableRow>
        <TableCell align="center">{user.nome}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{user.senha}</TableCell>
        <TableCell align="center">{user.telefone}</TableCell>
        <TableCell align="center">
          {" "}
          <IconButton onClick={() => handleOpenModal(user)}>
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      <ConfirmDelete
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteOrganizador}
        userName={organizadorToDelete?.nome}
      />
      <TableContainer style={{ margin: "2px" }} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "red", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">NOME</TableCell>
              <TableCell align="center">EMAIL</TableCell>
              <TableCell align="center">SENHA</TableCell>
              <TableCell align="center">TELEFONE</TableCell>
              <TableCell align="center">
                <IconButton></IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{listOrganizador}</TableBody>
        </Table>

        <Button fullWidth variant="contained" component={Link} to={"/home"}>
          voltar
        </Button>
      </TableContainer>
    </div>
  );
}
export default Organizador;
