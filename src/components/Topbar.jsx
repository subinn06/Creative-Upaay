import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import ProfilePic from "../assets/profile.png";

const Topbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      color="inherit"
      sx={{ bgcolor: "white", borderBottom: 1, borderColor: "grey.200" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: 520,
            bgcolor: "grey.100",
            borderRadius: 3,
            px: 1.5,
            py: 0.5,
          }}
        >
          <SearchIcon sx={{ color: "grey.500", fontSize: 20 }} />
          <InputBase
            placeholder="Search for anything..."
            inputProps={{ "aria-label": "search" }}
            sx={{ ml: 1, flex: 1, fontSize: "0.95rem", color: "grey.800" }}
          />
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton aria-label="calendar" size="large" sx={{ color: "grey.700" }}>
            <CalendarTodayIcon />
          </IconButton>

          <IconButton aria-label="help" size="large" sx={{ color: "grey.700" }}>
            <HelpOutlineIcon />
          </IconButton>

          <IconButton aria-label="notifications" size="large" sx={{ color: "grey.700" }}>
            <NotificationsNoneIcon />
          </IconButton>

          <Box display="flex" alignItems="center" ml={1}>
            <Box textAlign="right" mr={1}>
              <Typography variant="body2" fontWeight={600}>
                Palak Jain
              </Typography>
              <Typography variant="caption" color="grey.600">
                Rajasthan, India
              </Typography>
            </Box>

            <Avatar src={ProfilePic} alt="Palak Jain" sx={{ width: 36, height: 36 }} />
            <ArrowDropDownIcon sx={{ ml: 0.5, color: "grey.700" }} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;