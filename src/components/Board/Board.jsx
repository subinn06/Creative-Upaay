import React from "react";
import { Box } from "@mui/material";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveTask } from "../../redux/reducers/tasksReducer";

const COLUMNS = [
  { id: "todo", title: "To Do", color: "#6B46FF" },
  { id: "inprogress", title: "On Progress", color: "#F6AD55" },
  { id: "done", title: "Done", color: "#48BB78" },
];

const Board = () => {
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    dispatch(moveTask(draggableId, destination.droppableId, destination.index));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 3,
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        {COLUMNS.map((col) => (
          <Box
            key={col.id}
            sx={{
              flex: "1 1 0",
              minWidth: 260,
              maxWidth: "33.333%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Column id={col.id} title={col.title} color={col.color} />
          </Box>
        ))}
      </Box>
    </DragDropContext>
  );
}

export default Board;