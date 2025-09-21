import React, { useState } from "react";
import { Box, Typography, IconButton, Badge } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import TaskModal from "../TaskModal";
import { addTask, updateTask } from "../../redux/reducers/tasksReducer";
import { Droppable } from "react-beautiful-dnd";

const matchesDue = (taskDueIso, token) => {
  if (token === "All") return true;
  if (!taskDueIso) return token === "Upcoming" || token === "All";
  const due = new Date(taskDueIso);
  const now = new Date();
  if (token === "Today") return due.toDateString() === now.toDateString();
  if (token === "This week") {
    const start = new Date(now); start.setDate(now.getDate() - now.getDay());
    const end = new Date(start); end.setDate(start.getDate() + 7);
    return due >= start && due < end;
  }
  if (token === "This month") return due.getMonth() === now.getMonth() && due.getFullYear() === now.getFullYear();
  if (token === "Upcoming") return due >= now;
  if (token === "Overdue") return due < now;
  return true;
};

const Column = ({ id, title, color }) => {
  const dispatch = useDispatch();
  const tasksAll = useSelector(s => (s.tasks && s.tasks.items ? s.tasks.items : []));
  const filters = useSelector(s => s.ui.filters);

  let visible = tasksAll
    .filter(t => t.status === id)
    .filter(t => (filters.category === "All" ? true : t.category === filters.category))
    .filter(t => (filters.priority === "All" ? true : t.priority === filters.priority))
    .filter(t => {
      if (!filters.search) return true;
      const q = filters.search.toLowerCase();
      return (t.title || "").toLowerCase().includes(q) || (t.description || "").toLowerCase().includes(q);
    })
    .filter(t => matchesDue(t.dueDate, filters.due));

  visible = visible.slice().sort((a, b) => {
    const pa = typeof a.position === "number" ? a.position : 0;
    const pb = typeof b.position === "number" ? b.position : 0;
    if (pa !== pb) return pa - pb;
    return (a.createdAt || 0) - (b.createdAt || 0);
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleAdd = (payload) => dispatch(addTask({ ...payload, status: id }));
  const handleEdit = (payload) => dispatch(updateTask({ ...editing, ...payload, id: editing.id }));

  return (
    <Box sx={{ bgcolor: "#F5F6F8", borderRadius: 2, p: 2.25, display: "flex", flexDirection: "column", minHeight: "64vh" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color }} />
          <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
          <Badge badgeContent={visible.length} sx={{ "& .MuiBadge-badge": { bgcolor: "#E9E9EE", color: "text.primary", fontSize: 12, minWidth: 20, height:20, borderRadius:10, ml:1 } }} />
        </Box>

        <IconButton size="small" sx={{ bgcolor: "white" }} onClick={() => { setEditing(null); setOpen(true); }}>
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={{ height: 4, bgcolor: color, borderRadius: 2, mt: 2, mb: 2 }} />

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: 1,
              minHeight: 80,
              transition: "background 200ms",
              background: snapshot.isDraggingOver ? "rgba(0,0,0,0.02)" : "transparent",
              p: snapshot.isDraggingOver ? 1 : 0,
              borderRadius: 1,
            }}
          >
            {visible.length === 0 ? (
              <Box sx={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", color:"grey.500" }}>No tasks yet</Box>
            ) : visible.map((t, index) => (
              <TaskCard key={t.id} task={t} index={index} onEdit={() => { setEditing(t); setOpen(true); }} />
            ))}

            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      <TaskModal open={open} onClose={() => { setOpen(false); setEditing(null); }} initial={editing} onSubmit={(payload) => {
        if (editing) handleEdit(payload); else handleAdd(payload);
        setOpen(false);
      }} />
    </Box>
  );
}

export default Column;