import { useState } from "react";
import {
  TextField,
  Button,
  Avatar,
  CssBaseline,
  Box,
  Container,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function Cadastro() {
  const [user, setUser] = useState({
    name: "",
    password: "",
    id: "",
    email: "",
    age: "",
    phone: "",
    city: "",
  });
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita o recarregamento da página
    alert(
      "Aqui estão seus dados: \nName:" +
        user.name +
        " \nPassword:" +
        user.password +
        "\nId:" +
        user.id +
        "\nEmail:" +
        user.email +
        "\nAge:" +
        user.age +
        "\nPhone:" +
        user.phone +
        "\nCity:" +
        user.city,
    );
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
            label="name"
            id="name"
            name="name"
            value={user.name}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="password"
            id="password"
            name="password"
            value={user.password}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="id"
            id="id"
            name="id"
            value={user.id}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="email"
            id="email"
            name="email"
            value={user.email}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="age"
            id="age"
            name="age"
            value={user.age}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="phone"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="city"
            id="city"
            name="city"
            value={user.city}
            onChange={onChange}
          />
          <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
            CADASTRAR
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;
