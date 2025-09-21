import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";

const theme = createTheme({ palette: { mode: "light" } });

const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
   <CssBaseline />
   <App />
 </ThemeProvider>
);