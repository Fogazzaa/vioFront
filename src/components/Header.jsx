import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position = "fixed" sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={handleLogout}
            style={{ marginLeft: "10px", width: "30px" }}
          >
            SAIR
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/home")}
            style={{ marginLeft: "10px", width: "80px" }}
          >
            VOLTAR
          </Button>
          <IconButton
            color="inherit"
            sx={{ color: "#ffffff" }}
            onClick={() => console.log("Perfil clicado!")}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

export default Header;
