import { useState } from "react";
import {
  TextField,
  Button,
  Avatar,
  Box,
  Container,
  Typography,
  Alert,
  Snackbar,
  InputAdornment,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import api from "../../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Cadastro() {
  const [user, setUser] = useState({
    cpf: "",
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    data_nascimento: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // ✅ corrigido
  const onChange = (event) => {
    const { name, value } = event.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.postUser(user); // ✅ corrigido

      showAlert("success", response.data.message || "Cadastro realizado!");

      // 👉 opcional: redirecionar depois de cadastrar
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Erro ao cadastrar";

      showAlert("error", msg);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ margin: 1, bgcolor: "primary.main" }}>
          <AddIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          CADASTRO
        </Typography>

        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
          
          <TextField
            margin="normal"
            required
            fullWidth
            label="CPF"
            name="cpf"
            value={user.cpf}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome"
            name="nome"
            value={user.nome}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            onChange={onChange}
          />

          <TextField
            type={showPassword ? "text" : "password"}
            margin="normal"
            required
            fullWidth
            label="Senha"
            name="senha"
            value={user.senha}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Telefone"
            name="telefone"
            value={user.telefone}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Data de nascimento"
            name="data_nascimento"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={user.data_nascimento}
            onChange={onChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            CADASTRAR
          </Button>

          <Button fullWidth variant="outlined" component={Link} to="/">
            Já possui conta? Faça login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;