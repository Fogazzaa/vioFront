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

function listIngressos() {
  const [ingressos, setIngressos] = useState([]);

  async function getIngressos() {
    await api.getIngressos().then(
      (response) => {
        console.log(response.data.ingressos);
        setIngressos(response.data.ingressos);
      },
      (error) => {
        console.log("Erro", error);
      }
    );
  }

  const listIngressosRows = ingressos.map((ingresso) => {
    return (
      <TableRow key={ingresso.id_ingresso}>
        <TableCell align="center">{ingresso.preco}</TableCell>
        <TableCell align="center">{ingresso.tipo}</TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    getIngressos();
    if (!localStorage.getItem("authenticated")) {
      navigate("/");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Lista de Ingressos
        </Typography>
        <TableContainer component={Paper} style={{ width: "100%" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Preço</TableCell>
                <TableCell align="center">Tipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{listIngressosRows}</TableBody>
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

export default listIngressos;
