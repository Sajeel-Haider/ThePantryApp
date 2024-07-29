"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f95959",
    },
    secondary: {
      main: "#455d7a",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "3rem",
      },
      "@media (min-width:960px)": {
        fontSize: "4rem",
      },
    },
    body1: {
      fontSize: "0.4rem",
      "@media (min-width:600px)": {
        fontSize: "0.6rem",
      },
      "@media (min-width:960px)": {
        fontSize: "0.8rem",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
