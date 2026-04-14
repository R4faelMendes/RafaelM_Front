import { useState, useEffect } from "react";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
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
      const response = await api.deleteUser(userToDelete.cpf);
      setModalOpen(false);
      setUserToDelete(null);
      setState(state + 1);
      showAlert("success",response.data.message)
    } catch (error) {
      setModalOpen(false);
      setUserToDelete(null);
      console.error("Erro ao deletar", error);
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

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  //Funcionalidade para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  //Funcionalidade para fechar o alerta
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>

      <ConfirmDelete
        open={modalOpen}
        onClose={() => setModalOpen(false)}
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
