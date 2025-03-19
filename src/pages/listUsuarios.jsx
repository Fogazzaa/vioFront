import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import api from '../axios/axios';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

function listUsuarios() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    await api.getUsers().then(
      (response) => {
        console.log(response.data.users);
        setUsers(response.data.users);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  const listUsersRows = users.map((user) => {
    return (
      <TableRow key={user.id_usuario}>
        <TableCell align="center">{user.name}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{user.cpf}</TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        {users.length === 0 ? (
          <Typography>Carregando Usuários</Typography>
        ) : (
          <div>
            <Typography variant="h5" gutterBottom>
              Lista de usuários
            </Typography>
            <TableContainer component={Paper} style={{ width: "100%" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">CPF</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{listUsersRows}</TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="outlined"
              component={Link}
              to="/"
              style={{ marginTop: "20px" }}
            >
              SAIR
            </Button>
          </div>
        )}
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

export default listUsuarios;