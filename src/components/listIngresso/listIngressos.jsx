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

function listIngressos() {
  // Constante criada para receber a lista de usuários da nossa API
  const [ingressos, setIngressos] = useState([]);
  const [state, setState] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [ingressoToDelete, setIngressoToDelete] = useState(null);

  const handleOpenModal = (ingresso) => {
    setIngressoToDelete(ingresso);
    setModalOpen(true);
  };

  // Função para criar a chamada da API
  async function getIngressos() {
    await api.getIngressos().then(
      (response) => {
        console.log(response);
        setIngressos(response.data.ingressos);
      },
      (error) => {
        console.log(error);
      },
    );
  }
  useEffect(() => {
    getIngressos();
  }, [state]);

  async function deleteIngresso() {
    try {
      const response = await api.deleteIngresso(ingressoToDelete.id_ingresso);
      setModalOpen(false);
      setIngressoToDelete(null);
      showAlert("success", response.data.message);
      setState(state + 1);
    } catch (error) {
      setModalOpen(false);
      setIngressoToDelete(null);
      console.error("Erro ao deletar", error);
      showAlert("error", error.response.data.error);
    }
  }

  const ListIngressos = ingressos.map((ingresso) => {
    // Para cada linha do meu array de users eu retorno um component
    return (
      <TableRow>
        <TableCell align="center">{ingresso.preco}</TableCell>
        <TableCell align="center">{ingresso.tipo}</TableCell>
        <TableCell align="center">{ingresso.fk_id_evento}</TableCell>
        <TableCell align="center">
          <IconButton onClick={() => handleOpenModal(ingresso)}>
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
        onConfirm={deleteIngresso}
        targetName={ingressoToDelete?.id_ingresso}
      />
      <TableContainer style={{ margin: "2px" }} component={Paper}>
        <Table size="small" aria-label="">
          <TableHead style={{ backgroundColor: "red", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">PREÇO</TableCell>
              <TableCell align="center">TIPO</TableCell>
              <TableCell align="center">ID DO EVENTO</TableCell>
              <TableCell align="center">EXCLUIR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{ListIngressos}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default listIngressos;
