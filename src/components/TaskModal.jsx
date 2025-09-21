import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from "@mui/material";
const PRIORITIES = ["High","Medium","Low"];
const CATEGORIES = ["General","Work","Personal","Urgent"];

const TaskModal = ({ open, onClose, onSubmit, initial = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setPriority(initial.priority || "Medium");
      setCategory(initial.category || "General");
      setDueDate(initial.dueDate ? initial.dueDate.split("T")[0] : "");
    } else {
      setTitle(""); setDescription(""); setPriority("Medium"); setCategory("General"); setDueDate("");
    }
  }, [initial, open]);

  const submit = () => {
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initial ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Title" value={title} onChange={e=>setTitle(e.target.value)} margin="dense" />
        <TextField fullWidth multiline minRows={3} label="Description" value={description} onChange={e=>setDescription(e.target.value)} margin="dense" />
        <TextField select margin="dense" label="Priority" value={priority} onChange={e=>setPriority(e.target.value)} fullWidth>
          {PRIORITIES.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
        </TextField>
        <TextField select margin="dense" label="Category" value={category} onChange={e=>setCategory(e.target.value)} fullWidth>
          {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField type="date" margin="dense" label="Due date" value={dueDate} onChange={e=>setDueDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>{initial ? "Save" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskModal;