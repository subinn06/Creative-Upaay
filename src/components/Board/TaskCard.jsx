import React, { useState } from "react";
import { Card, CardContent, Box, Typography, IconButton, Menu, MenuItem, Select } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { deleteTask, moveTask } from "../../redux/reducers/tasksReducer";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, onEdit, index }) => {
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);
  const openMenu = (e) => setAnchor(e.currentTarget);
  const closeMenu = () => setAnchor(null);

  const handleDelete = () => { dispatch(deleteTask(task.id)); closeMenu(); };
  const handleMoveSelect = (e) => {
  dispatch(moveTask(task.id, e.target.value));
};

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            marginBottom: 8,
          }}
        >
          <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid rgba(0,0,0,0.03)", boxShadow: snapshot.isDragging ? "0 10px 30px rgba(20,20,40,0.12)" : "0 6px 20px rgba(20,20,40,0.06)" }}>
            <CardContent sx={{ p:2 }}>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Box component="span" sx={{ display:"inline-block", px:1, py:0.35, borderRadius:1, bgcolor:"#FFF5E6", color:"#B86B2C", fontWeight:700, fontSize:12 }}>{task.priority}</Box>
                  <Typography variant="h6" sx={{ mt:1, fontWeight:800 }}>{task.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt:1 }}>{task.description}</Typography>
                </Box>
                <IconButton size="small" onClick={openMenu}><MoreVertIcon /></IconButton>
              </Box>

              <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt:2 }}>
                <Typography variant="caption" color="text.secondary">{(task.members && task.members.length) ? `${task.members.length} members` : "No members"}</Typography>
                <Select size="small" value={task.status} onChange={handleMoveSelect}>
                  <MenuItem value="todo">To Do</MenuItem>
                  <MenuItem value="inprogress">On Progress</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              </Box>

              <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={closeMenu}>
                <MenuItem onClick={() => { closeMenu(); onEdit && onEdit(); }}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;