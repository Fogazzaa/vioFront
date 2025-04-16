import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Login();
  };

  async function Login() {
    await api.postLogin(user).then(
      (response) => {
        alert(response.data.message);
        localStorage.setItem("authenticated", true);
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
          <Avatar
            sx={{
              margin: 1,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login - VIO
          </Typography>
          <Box
            component="form"
            sx={{
              mt: 1,
            }}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              required
              fullWidth
              id="email"
              label="e-mail"
              name="email"
              margin="normal"
              value={user.email}
              onChange={onChange}
            />
            <TextField
              required
              fullWidth
              id="password"
              label="senha"
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
              to="/cadastro"
              sx={{ mt: 2 }}
            >
              Cadastro
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

export default Login;