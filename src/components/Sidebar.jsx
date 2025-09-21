import React from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import HomeIcon from "@mui/icons-material/GridView";
import MessageIcon from "@mui/icons-material/ChatBubbleOutline";
import TaskIcon from "@mui/icons-material/AssignmentOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutline";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";

import ProjectLogo from "../assets/icon.png";
import LampIcon from "../assets/lamp.png";

const drawerWidth = 260;

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    borderRight: "none",
    padding: theme.spacing(2, 1),
  },
}));

const Sidebar = ({ activeProject = "Mobile App", onSelectProject }) => {
  const navItems = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Messages", icon: <MessageIcon /> },
    { label: "Tasks", icon: <TaskIcon /> },
    { label: "Members", icon: <PeopleIcon /> },
    { label: "Settings", icon: <SettingsIcon /> },
  ];

  const projects = [
    { name: "Mobile App", color: "success.main" },
    { name: "Website Redesign", color: "warning.main" },
    { name: "Design System", color: "secondary.main" },
    { name: "Wireframes", color: "info.main" },
  ];

  return (
    <SidebarContainer>
      <Drawer variant="permanent" anchor="left">
        <Box display="flex" alignItems="center" gap={1.5} px={2} py={1}>
          <Avatar src={ProjectLogo} alt="logo" sx={{ bgcolor: "transparent" }} />
          <Typography variant="h6" fontWeight={600}>
            Project M.
          </Typography>
        </Box>

        <List sx={{ mt: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton sx={{ py: 1.2, px: 2 }}>
                <ListItemIcon sx={{ minWidth: 32, color: "grey.600" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" color="grey.800">
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box px={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="grey.600" fontWeight={600}>
            MY PROJECTS
          </Typography>
          <IconButton size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        <List>
          {projects.map((proj) => (
            <ListItem key={proj.name} disablePadding>
              <ListItemButton
                selected={proj.name === activeProject}
                onClick={() => onSelectProject?.(proj.name)}
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 2,
                  "&.Mui-selected": {
                    bgcolor: "primary.lighter",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: proj.color,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      color={proj.name === activeProject ? "primary.main" : "grey.800"}
                      fontWeight={proj.name === activeProject ? 600 : 400}
                    >
                      {proj.name}
                    </Typography>
                  }
                />
                {proj.name === activeProject && (
                  <MoreHorizIcon sx={{ fontSize: 18, color: "grey.500" }} />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

  <Box
    mt={3}
    mx={2}
    mb={3}
    p={2.5}
    borderRadius={3}
    textAlign="center"
    bgcolor="grey.100"
    position="relative"
  >
  
  <Box
    sx={{
      width: 48,
      height: 48,
      borderRadius: "50%",
      bgcolor: "grey.100",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: -24,
      left: "calc(50% - 24px)",
      boxShadow: 1,
    }}
  >
    <Avatar
      src={LampIcon}
      alt="lamp"
      sx={{ width: 28, height: 28, bgcolor: "grey.100" }}
    />
  </Box>

  <Typography variant="subtitle2" fontWeight={600} mt={3} gutterBottom>
    Thoughts Time
  </Typography>
  <Typography variant="caption" color="grey.600">
    We don’t have any notice for you, till then you can share your
    thoughts with your peers.
  </Typography>

  <Button
    fullWidth
    sx={{
      mt: 2,
      borderRadius: 2,
      textTransform: "none",
      bgcolor: "white",
      color: "grey.900",
      boxShadow: 1,
      "&:hover": {
        bgcolor: "grey.200",
      },
    }}
  >
    Write a message
  </Button>
</Box>

    </Drawer>
    </SidebarContainer>
  );
}

export default Sidebar;