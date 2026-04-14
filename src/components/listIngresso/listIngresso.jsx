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

function Ingresso() {
  // constante criada para receber a lista usúario da nossa APIF
  const [ingressos, setIngresso] = useState([]);
  const [state, setState] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [ingressoToDelete, setIngressoToDelete] = useState(null);

  const handleOpenModal = (ingresso) => {
    setIngressoToDelete(ingresso);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {};

  //Função para criar a chama    getUsers();
  async function getIngresso() {
    await api.getIngresso().then(
      (response) => {
        console.log(response);
        setIngresso(response.data.ingressos);
      },
      (error) => {
        console.log(error);
      },
    );
  }
  useEffect(() => {
    getIngresso();
  }, [state]);

  async function deleteIngresso() {
    try {
      const response = await api.deleteIngresso(ingressoToDelete.id_ingresso);
      setModalOpen(false);
      setIngressoToDelete(null);
      setState(state + 1);
      showAlert("success",response.data.message);

    } catch (error) {
      setModalOpen(false);
      setIngressoToDelete(null);
      console.error("Erro ao deletar", error);
      showAlert("error",error.response.data.error);

    }
  }
  const listIngresso = ingressos.map((user) => {
    // Para cada linha do meu array de users eu retorno um component
    return (
      <TableRow>
        <TableCell align="center">{user.id_ingresso}</TableCell>
        <TableCell align="center">{user.preco}</TableCell>
        <TableCell align="center">{user.tipo}</TableCell>
        <TableCell align="center">{user.fk_id_evento}</TableCell>
        <TableCell align="center">{user.nome_evento}</TableCell>
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
        onConfirm={deleteIngresso}
        userName={ingressoToDelete?.nome}
      />
      <TableContainer style={{ margin: "2px" }} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "red", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">ID INGRESSO</TableCell>
              <TableCell align="center">PREÇO</TableCell>
              <TableCell align="center">TIPO</TableCell>
              <TableCell align="center">FK ID INGRESSO</TableCell>
              <TableCell align="center">NOME INGRESSO</TableCell>
              <TableCell align="center">
                <IconButton></IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{listIngresso}</TableBody>
        </Table>

        <Button fullWidth variant="contained" component={Link} to={"/home"}>
          voltar
        </Button>
      </TableContainer>
    </div>
  );
}
export default Ingresso;
