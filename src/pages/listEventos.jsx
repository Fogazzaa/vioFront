import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CriarIngressoModal from "../components/CriarIngressoModal";
import AddIcon from "@mui/icons-material/AddCircleOutline";
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

  async function deleteEvento(id_evento) {
    try {
      await api.deleteEvento(id_evento);
      await getEventos();
      showAlert("success", "Evento Deletado");
    } catch (error) {
      console.log("Erro ", error);
      showAlert("error", error.response.data.error);
    }
  }

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModalIngresso = (evento) => {
    setEventoSelecionado(evento);
    setModalOpen(true);
  };

  const fecharModalIngresso = () => {
    setModalOpen(false);
    setEventoSelecionado("");
  };

  const listEventosRows = eventos.map((evento) => {
    return (
      <TableRow key={evento.id_evento}>
        <TableCell align="center">{evento.nome}</TableCell>
        <TableCell align="center">{evento.descricao}</TableCell>
        <TableCell align="center">{evento.data_hora}</TableCell>
        <TableCell align="center">{evento.local}</TableCell>
        <TableCell align="center"><img src={`http://localhost:5000/api/v1/evento/imagem/${evento.id_evento}`} alt="Imagem do Evento" style={{width:"80 px", height:"80px" , objectFit:"cover"}}/></TableCell>
        <TableCell align="center">
          <IconButton onClick={() => deleteEvento(evento.id_evento)}>
            <DeleteOutlineIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => abrirModalIngresso(evento)}>
            <AddIcon />
          </IconButton>
        </TableCell>
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
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <CriarIngressoModal
        open={modalOpen}
        onClose={fecharModalIngresso}
        eventoSelecionado={eventoSelecionado}
      />
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
                  <TableCell align="center">Imagem</TableCell>
                  <TableCell align="center">Deletar</TableCell>
                  <TableCell align="center">Criar Ingresso</TableCell>
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
    </div>
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
