import React from "react";
import { Box, TextField, MenuItem, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../redux/reducers/uiReducer";

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.ui.filters);

  const handleChange = (key) => (e) => {
    dispatch(setFilters({ [key]: e.target.value }));
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", bgcolor: "transparent", borderRadius: 1 }}>
        <IconButton size="small" aria-label="search">
          <SearchIcon />
        </IconButton>
        <TextField
          size="small"
          placeholder="Search..."
          value={filters.search}
          onChange={handleChange("search")}
          variant="outlined"
        />
      </Box>

      <TextField size="small" select label="Category" value={filters.category} onChange={handleChange("category")}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="General">General</MenuItem>
        <MenuItem value="Work">Work</MenuItem>
        <MenuItem value="Personal">Personal</MenuItem>
        <MenuItem value="Urgent">Urgent</MenuItem>
      </TextField>

      <TextField size="small" select label="Priority" value={filters.priority} onChange={handleChange("priority")}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </TextField>

      <TextField size="small" select label="Due" value={filters.due} onChange={handleChange("due")}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Today">Today</MenuItem>
        <MenuItem value="This week">This week</MenuItem>
        <MenuItem value="This month">This month</MenuItem>
        <MenuItem value="Upcoming">Upcoming</MenuItem>
        <MenuItem value="Overdue">Overdue</MenuItem>
      </TextField>
    </Box>
  );
}

export default FilterBar;