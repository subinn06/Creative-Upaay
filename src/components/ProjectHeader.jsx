import React, { useState } from "react";
import { Box, Typography, Button, Menu, MenuItem, Divider } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import TodayIcon from "@mui/icons-material/Today";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../redux/reducers/uiReducer";

import InviteBanner from "../assets/invite.png";
import ShareControls from "../assets/share.png";

const ProjectHeader = () => {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.ui.filters);

  const [filterAnchor, setFilterAnchor] = useState(null);
  const openFilter = Boolean(filterAnchor);
  const handleFilterOpen = (e) => setFilterAnchor(e.currentTarget);
  const handleFilterClose = () => setFilterAnchor(null);

  const [todayAnchor, setTodayAnchor] = useState(null);
  const openToday = Boolean(todayAnchor);
  const handleTodayOpen = (e) => setTodayAnchor(e.currentTarget);
  const handleTodayClose = () => setTodayAnchor(null);

  const categories = ["All", "General", "Work", "Personal", "Urgent"];
  const priorities = ["All", "High", "Medium", "Low"];

  const applyFilter = (payload) => {
    dispatch(setFilters(payload));
    handleFilterClose();
  };

  const applyDue = (value) => {
    dispatch(setFilters({ due: value }));
    handleTodayClose();
  };

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="space-between"
      px={0}
      py={2}
      sx={{ width: "100%" }}
    >
      <Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h4" fontWeight={800} color="text.primary">
            Mobile App
          </Typography>

          <Box display="flex" gap={0.5} ml={1}>
            <Box sx={{ bgcolor: "primary.lighter", borderRadius: 1, px: 0.5, py: 0.25 }}>
              <Typography variant="caption" sx={{ color: "primary.main" }}>
                 ↀ
              </Typography>
            </Box>
            <Box sx={{ bgcolor: "primary.lighter", borderRadius: 1, px: 0.5, py: 0.25 }}>
              <Typography variant="caption" sx={{ color: "primary.main" }}>
            
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Button
            color="#000"
            variant="outlined"
            size="small"
            startIcon={<FilterListIcon />}
            endIcon={<ExpandMoreIcon />}
            onClick={handleFilterOpen}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Filter
          </Button>

          <Button
            color="#000"
            variant="outlined"
            size="small"
            startIcon={<TodayIcon />}
            endIcon={<ExpandMoreIcon />}
            onClick={handleTodayOpen}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Today
          </Button>

          <Menu anchorEl={filterAnchor} open={openFilter} onClose={handleFilterClose}>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2">Category</Typography>
            </Box>
            {categories.map((c) => (
              <MenuItem
                key={c}
                selected={filters.category === c}
                onClick={() => applyFilter({ category: c })}
              >
                {c}
              </MenuItem>
            ))}

            <Divider />

            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2">Priority</Typography>
            </Box>
            {priorities.map((p) => (
              <MenuItem
                key={p}
                selected={filters.priority === p}
                onClick={() => applyFilter({ priority: p })}
              >
                {p}
              </MenuItem>
            ))}

            <Divider />

            <MenuItem
              onClick={() => {
                dispatch(setFilters({ category: "All", priority: "All", search: "" }));
                handleFilterClose();
              }}
            >
              Clear filters
            </MenuItem>
          </Menu>

          <Menu anchorEl={todayAnchor} open={openToday} onClose={handleTodayClose}>
            <MenuItem onClick={() => applyDue("All")}>All</MenuItem>
            <MenuItem onClick={() => applyDue("Today")}>Today</MenuItem>
            <MenuItem onClick={() => applyDue("This week")}>This week</MenuItem>
            <MenuItem onClick={() => applyDue("This month")}>This month</MenuItem>
            <Divider />
            <MenuItem onClick={() => applyDue("Upcoming")}>Upcoming</MenuItem>
            <MenuItem onClick={() => applyDue("Overdue")}>Overdue</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box textAlign="right">
        <Box component="img" src={InviteBanner} alt="Invite" sx={{ height: 36, display: "block", ml: "auto" }} />
        <Box component="img" src={ShareControls} alt="Share controls" sx={{ height: 40, display: "block", mt: 2, ml: "auto" }} />
      </Box>
    </Box>
  );
}

export default ProjectHeader;