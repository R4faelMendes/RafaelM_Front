import { useState, useEffect } from "react";
import { IconButton, Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../axios/axios";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

import ConfirmDelete from "../dialogDelete/ConfirmDelete";

// Decodifica o JWT para extrair o CPF do usuário logado
function getCpfFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.cpf; // ajuste a chave conforme o payload do seu token
  } catch {
    return null;
  }
}

function ListUsers() {
  const [users, setUser] = useState([]);
  const [state, setState] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleOpenModal = (user) => {
    setUserToDelete(user);
    setModalOpen(true);
  };

  async function getUsers() {
    await api.getUsers().then(
      (response) => {
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
      showAlert("success", response.data.message);

      // Só faz logout se o usuário deletou a própria conta
      const loggedCpf = getCpfFromToken();
      if (loggedCpf && loggedCpf === userToDelete.cpf) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
      }

      setUserToDelete(null);
      setState((prev) => prev + 1);
    } catch (error) {
      setModalOpen(false);
      setUserToDelete(null);
      console.error("Erro ao deletar", error);
      showAlert("error", error.response?.data?.error ?? "Erro ao deletar usuário");
    }
  }

  const userRows = users.map((user) => (
    <TableRow key={user.cpf}>
      <TableCell align="center">{user.nome}</TableCell>
      <TableCell align="center">{user.email}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => handleOpenModal(user)}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

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
        targetName={userToDelete?.nome}
      />

      <TableContainer style={{ margin: "2px" }} component={Paper}>
        <Table size="small" aria-label="lista de usuários">
          <TableHead style={{ backgroundColor: "red", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">NOME</TableCell>
              <TableCell align="center">EMAIL</TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{userRows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListUsers;