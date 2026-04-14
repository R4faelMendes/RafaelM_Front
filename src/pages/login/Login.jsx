import { useState } from "react";
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
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import api from "../../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Login() {
  const [user, setUser] = useState({
    cpf: "",
    senha: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita o recarregamento da página
    try {
      const response = await api.postLogin(user);
      showAlert("success",response.data.message);
      localStorage.setItem("auth", "true");
      return navigate("/home", { state: { usuario: response.data.user } });
    } catch (error) {
      showAlert("error",error.response.data.error);
    }
  };

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          <LockOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="cpf"
            id="cpf"
            name="cpf"
            value={user.cpf}
            onChange={onChange}
          />

          <TextField
            type={showPassword ? "text" : "password"}
            margin="normal"
            required
            fullWidth
            label="senha"
            id="senha"
            name="senha"
            value={user.senha}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
            ENTRAR
          </Button>
          <Button
            fullWidth
            variant="contained"
            component={Link}
            to={"/cadastro"}
          >
            Faça o seu cadastro
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
