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

function listOrganizadores() {
  // Constante criada para receber a lista de usuários da nossa API
  const [organizadores, setOrganizadores] = useState([]);
  const [state, setState] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [organizadorToDelete, setOrganizadorToDelete] = useState(null);

  const handleOpenModal = (organizador) => {
    setOrganizadorToDelete(organizador);
    setModalOpen(true);
  };

  // Função para criar a chamada da API
  async function getOrganizadores() {
    await api.getOrganizadores().then(
      (response) => {
        console.log(response);
        setOrganizadores(response.data.organizadores);
      },
      (error) => {
        console.log(error);
      },
    );
  }
  useEffect(() => {
    getOrganizadores();
  }, [state]);

  async function deleteOrganizador() {
    try {
      const response = await api.deleteOrganizador(organizadorToDelete.id_organizador);
      setModalOpen(false);
      setOrganizadorToDelete(null);
      showAlert("success", response.data.message);
      setState(state + 1);
    } catch (error) {
      setModalOpen(false);
      setOrganizadorToDelete(null);
      console.error("Erro ao deletar", error);
      showAlert("error", error.response.data.error);
    }
  }

  const ListOrganizadores = organizadores.map((organizador) => {
    // Para cada linha do meu array de users eu retorno um component
    return (
      <TableRow>
        <TableCell align="center">{organizador.nome}</TableCell>
        <TableCell align="center">{organizador.email}</TableCell>
        <TableCell align="center">{organizador.telefone}</TableCell>
        <TableCell align="center">
          <IconButton onClick={() => handleOpenModal(organizador)}>
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

  // Funcionalidade para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  // Funcionalidade para fechar o alerta
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
        onConfirm={deleteOrganizador}
        targetName={organizadorToDelete?.nome}
      />
      <TableContainer style={{ margin: "2px" }} component={Paper}>
        <Table size="small" aria-label="">
          <TableHead style={{ backgroundColor: "red", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">NOME</TableCell>
              <TableCell align="center">EMAIL</TableCell>
              <TableCell align="center">TELEFONE</TableCell>
              <TableCell align="center">EXCLUIR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{ListOrganizadores}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default listOrganizadores;
