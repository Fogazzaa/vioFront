import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios/axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function Cadastro() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    cpf: "",
    name: "",
    data_nascimento: "",
    email: "",
    password: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Cadastro();
  };

  async function Cadastro() {
    await api.postCadastro(user).then(
      (response) => {
        alert(response.data.message);
        localStorage.setItem('authenticated', true)
        navigate("/home");
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
      }
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ margin: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro - VIO
          </Typography>
          <Box
            component="form"
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              margin="normal"
              value={user.name}
              onChange={onChange}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              margin="normal"
              value={user.email}
              onChange={onChange}
            />
            <TextField
              required
              fullWidth
              id="cpf"
              label="CPF"
              name="cpf"
              margin="normal"
              value={user.cpf}
              onChange={onChange}
            />
            <TextField
              required
              fullWidth
              id="data_nascimento"
              name="data_nascimento"
              margin="normal"
              type="date"
              value={user.data_nascimento}
              onChange={onChange}
            />
            <TextField
              required
              fullWidth
              id="password"
              label="Senha"
              name="password"
              type="password"
              margin="normal"
              value={user.password}
              onChange={onChange}
            />
            <Button fullWidth type="submit" variant="contained">
              Entrar
            </Button>
            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    text: {
      primary: "#000",
    },
  },
  typography: {
    fontFamily: "Roboto Mono, monospace",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          backgroundColor: "#000",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
          textAlign: "center",
        },
      },
    },
  },
});

export default Cadastro;