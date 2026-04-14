import { useState, useEffect } from "react";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../axios/axios";
import ConfirmDelete from "../dialogDelete/ConfirmDelete";

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

import { Link } from "react-router-dom";

function Evento() {
  // constante criada para receber a lista usúario da nossa API
  const [events, setEvento] = useState([]);
  const [state, setState] = useState(0);
  //Contantes para controlar a exclusão de um usuário
  const [modalOpen, setModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleOpenModal = (evento) => {
    setEventToDelete(evento);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {};

  //Função para criar a chama    getUsers();
  async function getEvento() {
    await api.getEvento().then(
      (response) => {
        console.log(response);
        setEvento(response.data.events);
      },
      (error) => {
        console.log(error);
      },
    );
  }
  useEffect(() => {
    getEvento();
  }, [state]);

  async function deleteEvento() {
    try {
      const response = await api.deleteEvento(eventToDelete.id_evento);
      setModalOpen(false);
      setEventToDelete(null);
      setState(state + 1);
      showAlert("success",response.data.message);

    } catch (error) {
      setModalOpen(false);
      setEventToDelete(null);
      console.error("Erro ao deletar", error);
      showAlert("error",error.response.data.error);
    }
  }

  const listEvento = events.map((user) => {
    // Para cada linha do meu array de users eu retorno um component
    return (
      <TableRow>
        <TableCell align="center">{user.nome}</TableCell>
        <TableCell align="center">{user.descricao}</TableCell>
        <TableCell align="center">{user.descricao}</TableCell>
        <TableCell align="center">{user.data_hora}</TableCell>
        <TableCell align="center">{user.local}</TableCell>
        <TableCell align="center">{user.fk_id_organizador}</TableCell>
        <TableCell align="center">
          {" "}
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
        onConfirm={deleteEvento}
        userName={eventToDelete?.nome}
      />
      <TableContainer style={{ margin: "2px" }} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "red", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">NOME</TableCell>
              <TableCell align="center">descricao</TableCell>
              <TableCell align="center">DATA HORA</TableCell>
              <TableCell align="center">DATA LOCAL</TableCell>
              <TableCell align="center">DATA FK ID ORGANIZADOR</TableCell>
              <TableCell align="center">
                <IconButton></IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{listEvento}</TableBody>
        </Table>
        <Button fullWidth variant="contained" component={Link} to={"/home"}>
          voltar
        </Button>

        <Link to="/evento/novo">Criar Evento</Link>
      </TableContainer>
    </div>
  );
}
export default Evento;
