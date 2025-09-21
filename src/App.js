import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ProjectHeader from "./components/ProjectHeader";
import Board from "./components/Board/Board";
import { CssBaseline, Box } from "@mui/material";

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Topbar />
          <Box
            component="main"
            sx={{
              width: "100%",
              px: { xs: 3, md: 6 },
              py: 4,
            }}
          >
            <ProjectHeader />
            <Board />
          </Box>
        </Box>
      </Box>
    </Provider>
  );
}

export default App;