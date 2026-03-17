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
  IconButton
} from "@mui/material";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import api from "../../axios/axios"
import { Link,useNavigate } from "react-router-dom";
import  VisibilityOffIcon  from "@mui/icons-material/VisibilityOff";
import  VisibilityIcon  from "@mui/icons-material/Visibility";


function Login() {
  const [user, setUser] = useState({ cpf: "", senha: "" });
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({...user, [name]: value });
    console.log(user);
  };

  const togglePasswordVisibilit = ()=>{
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await api.postLogin(user)
      alert("O servidor disse: " + response.data.message)
      localStorage.setItem("auth","true")
      return navigate("home");
    } catch (error){
      alert("Erro: " + error.response)
      
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Welcome to Senai
        </Typography>
        <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={handleSubmit}
          noValidate
        >
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
            margin="normal"
            required
            fullWidth
            label="senha"
            id="senha"
            name="senha"
            value={user.senha}
            onChange={onChange}
            type={showPassword?"text":"password"}
            InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibilit} edge="end">
                    {showPassword?<VisibilityIcon/>:<VisibilityOffIcon/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
            ENTRAR
          </Button>
          <Button fullWidth variant="contained" component={Link} to="/cadastro">
            Faça seu cadastro
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;