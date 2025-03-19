import { useState, useEffect } from "react";
import api from "../axios/axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

function listOrganizadores() {
  const [organizadores, setOrganizadores] = useState([]);

  async function getOrganizadores() {
    await api.getOrganizadores().then(
      (response) => {
        console.log(response.data.orgs);
        setOrganizadores(response.data.orgs);
      },
      (error) => {
        console.log("Erro", error);
      }
    );
  }

  const listOrganizadoresRows = organizadores.map((organizador) => {
    return (
      <TableRow key={organizador.id_organizador}>
        <TableCell align="center">{organizador.nome}</TableCell>
        <TableCell align="center">{organizador.email}</TableCell>
        <TableCell align="center">{organizador.telefone}</TableCell>
        <TableCell align="center">{organizador.senha}</TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    getOrganizadores();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Lista de Organizadores
        </Typography>
        <TableContainer component={Paper} style={{ width: "100%" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">E-mail</TableCell>
                <TableCell align="center">Telefone</TableCell>
                <TableCell align="center">Senha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{listOrganizadoresRows}</TableBody>
          </Table>
        </TableContainer>
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
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
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
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f0f0",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        },
      },
    },
  },
});

export default listOrganizadores;