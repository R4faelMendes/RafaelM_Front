import { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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

import ConfirmDelete from "../dialogDelete/ConfirmDelete";

function ListUsers() {
  // constante criada para receber a lista usúario da nossa APIF
  const [users, setUser] = useState([]);
  const [state, setState] = useState(0);
  //Contantes para controlar a exclusão de um usuário
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleOpenModal = (user) => {
    setUserToDelete(user);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {};

  //Função para criar a chamada da API
  async function getUsers() {
    await api.getUsers().then(
      (response) => {
        console.log(response);
        setUser(response.data.users);
      },
      (error) => {
        console.log(error);
      },
    );
  }
  useEffect(() => {
    getUsers();
  }, [state]);

  async function deleteUser() {
    try {
      await api.deleteUser(userToDelete.cpf);
      setModalOpen(false);
      setUserToDelete(null);
      setState(state + 1);
    } catch (error) {
      setModalOpen(false);
      setUserToDelete(null);
      console.error("Erro ao deletar", error);
      alert(error.response.data.error);
    }
  }

  const listUsers = users.map((user) => {
    // Para cada linha do meu array de users eu retorno um component
    return (
      <TableRow>
        <TableCell align="center">{user.nome}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">
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
      onClose={()=>setModalOpen(false)}
      onConfirm={deleteUser}
      userName={userToDelete?.name}
      />
      <TableContainer style={{ margin: "2px" }} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "red", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">NOME</TableCell>
              <TableCell align="center">EMAIL</TableCell>
              <TableCell align="center">
                <IconButton></IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{listUsers}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default ListUsers;
