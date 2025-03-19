import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

function Home() {
  const [auth, setAuth] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Bem-vindo ao sistema de Eventos
        </Typography>
        <Typography variant="h6" gutterBottom>
          Lista de Usuários
        </Typography>
        <Button variant="outlined" component={Link} to="/usuarios">
          Lista de Usuários
        </Button>
        <Typography variant="h6" gutterBottom>
          Lista de Eventos
        </Typography>
        <Button variant="outlined" component={Link} to="/eventos">
          Lista de Eventos
        </Button>
        <Typography variant="h6" gutterBottom>
          Lista de Organizadores
        </Typography>
        <Button variant="outlined" component={Link} to="/organizadores">
          Lista de Organizadores
        </Button>
        <Typography variant="h6" gutterBottom>
          Lista de Ingressos
        </Typography>
        <Button variant="outlined" component={Link} to="/ingressos">
          Lista de Ingressos
        </Button>
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
          color: "#000",
          borderColor: "#000",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
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
          minHeight: "100vh", // Garante que o Container ocupa a altura total da tela
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: "16px", // Adiciona espaçamento abaixo dos elementos Typography
          textAlign: "center", // Centraliza o texto
        },
      },
    },
  },
});

export default Home;
