import Box from "@mui/material/Box";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "gray",
        width: "100%",
        height: "40px",
        position: "fixed",
        bottom: 0,
      }}
    />
  );
};

export default Footer;
