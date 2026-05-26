import { useState } from "react";
//import TextField from "@mui/material/TextField"
//import Button from "@mui/material"
import {
  TextField,
  Button,
  Avatar,
  CssBaseline,
  Box,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import api from "../../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility"

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

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const togglePasswordVisibility = ()=> {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita o recarregamento da página
    try {
      const response = await api.postCadastro(user);
      showAlert("success", response.data.message);
    } catch (error) {
      showAlert("error", error.response.data.error);
    }
  };

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
    <Container component="main" maxWidth="xs">
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
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ margin: 1, backgroundColor: "blue" }}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Faça seu cadastro
        </Typography>
        {/* marginTop:*/}
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="CPF"
            id="cpf"
            name="cpf"
            value={user.cpf}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome"
            id="nome"
            name="nome"
            value={user.nome}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            id="email"
            name="email"
            value={user.email}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            id="senha"
            name="senha"
            value={user.senha}
            onChange={onChange}
            type={showPassword? "text":"password"}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={togglePasswordVisibility} edge="end">
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
            id="telefone"
            name="telefone"
            value={user.telefone}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Data de Nascimento"
            id="data_nascimento"
            name="data_nascimento"
            value={user.data_nascimento}
            onChange={onChange}
          />
          <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
            Entrar
          </Button>

          <Button fullWidth variant="contained" component={Link} to={"/"}>
            Já possui conta? Faça login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;
