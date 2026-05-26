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

function listEventos() {
  // Constante criada para receber a lista de usuários da nossa API
  const [eventos, setEventos] = useState([]);
  const [state, setState] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [eventoToDelete, setEventoToDelete] = useState(null);

  const handleOpenModal = (evento) => {
    setEventoToDelete(evento);
    setModalOpen(true);
  };

  // Função para criar a chamada da API
  async function getEventos() {
    await api.getEventos().then(
      (response) => {
        console.log(response);
        setEventos(response.data.events);
      },
      (error) => {
        console.log(error);
      },
    );
  }
  useEffect(() => {
    getEventos();
  }, [state]);

  async function deleteEvento() {
    try {
      const response = await api.deleteEvento(eventoToDelete.id_evento);
      setModalOpen(false);
      setEventoToDelete(null);
      showAlert("success", response.data.message);
      setState(state + 1);
    } catch (error) {
      setModalOpen(false);
      setEventoToDelete(null);
      console.error("Erro ao deletar", error);
      showAlert("error", error.response.data.error);
    }
  }

  const ListEventos = eventos.map((evento) => {
    // Para cada linha do meu array de users eu retorno um component
    return (
      <TableRow>
        <TableCell align="center">{evento.nome}</TableCell>
        <TableCell align="center">{evento.descricao}</TableCell>
        <TableCell align="center">{evento.data_hora}</TableCell>
        <TableCell align="center">{evento.local}</TableCell>
        <TableCell align="center">{evento.nome_organizador}</TableCell>
        <TableCell align="center">
          <IconButton onClick={() => handleOpenModal(evento)}>
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
        onConfirm={deleteEvento}
        targetName={eventoToDelete?.nome}
      />
      <TableContainer style={{ margin: "2px" }} component={Paper}>
        <Table size="small" aria-label="">
          <TableHead style={{ backgroundColor: "red", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">NOME</TableCell>
              <TableCell align="center">DESCRIÇÃO</TableCell>
              <TableCell align="center">DATA E HORA</TableCell>
              <TableCell align="center">LOCAL</TableCell>
              <TableCell align="center">NOME DO ORGANIZADOR</TableCell>
              <TableCell align="center">EXCLUIR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{ListEventos}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default listEventos;
