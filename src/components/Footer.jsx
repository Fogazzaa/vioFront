import Box from "@mui/material/Box";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        width: "100%",
        height: "55px",
        position: "fixed",
        bottom: 0,
      }}
    />
  );
};

export default Footer;
