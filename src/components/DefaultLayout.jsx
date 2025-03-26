import Box from "@mui/material/Box";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
        maxHeight: "80vh",
      }}
    >
      {/* Cabeçalho */}
      <Header />

      {/* Conteúdo Centralizado */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {children}
      </Box>

      {/* Rodapé */}
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
