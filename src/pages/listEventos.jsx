import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";

function listEventos() {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  async function getEventos() {
    await api.getEventos().then(
      (response) => {
        console.log(response.data.eventos);
        setEventos(response.data.eventos);
      },
      (error) => {
        console.log("Erro", error);
      }
    );
  }

  const listEventosRows = eventos.map((evento) => {
    return (
      <TableRow key={evento.id_evento}>
        <TableCell align="center">{evento.nome}</TableCell>
        <TableCell align="center">{evento.descricao}</TableCell>
        <TableCell align="center">{evento.data_hora}</TableCell>
        <TableCell align="center">{evento.local}</TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    getEventos();
    if (!localStorage.getItem("authenticated")) {
      navigate("/");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Lista de eventos
        </Typography>
        <TableContainer component={Paper} style={{ width: "100%" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Descrição</TableCell>
                <TableCell align="center">Data e Hora</TableCell>
                <TableCell align="center">Local</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{listEventosRows}</TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Crie Eventos
        </Typography>
        <Button variant="outlined" component={Link} to="/evento/novo">
          Crie Eventos
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
          marginTop: 50,
          justifyContent: "flex-start",
          minHeight: "80vh",
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
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f0f0", // Cor de fundo clara para o cabeçalho
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)", // Adiciona borda sutil às células
        },
      },
    },
  },
});

export default listEventos;
