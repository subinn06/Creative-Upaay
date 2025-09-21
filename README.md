#Project Overview

This project is a Task Management Dashboard built with React.js.
It replicates a Figma design and implements key features for managing tasks in a Kanban-style board.


#Features

Pixel-perfect UI based on the provided Figma design.

Kanban Board Layout with three sections:
To Do
On Progress
Done

Task Management:
Add, edit, delete tasks
Move tasks between columns (via dropdown or drag-and-drop)
Filter tasks by category, priority, and due date
Search by title/description

Redux for State Management: centralized state handling.

Persistence with Local Storage: tasks are saved and reloaded on refresh.

Bonus: Drag-and-drop task reordering (powered by react-beautiful-dnd).


#Steps to Run Locally

1. Clone the repository
git clone <your-repo-url>
cd creative-upaay-dashboard

2. Install dependencies
npm install

3. Start the development server
npm start

The app will be available at http://localhost:3000


#Technologies Used

Frontend Framework: React.js

UI Library: Material-UI (MUI)

State Management: Redux

Persistence: Local Storage

Drag & Drop: react-beautiful-dnd

Styling: MUI components + custom styles


#Known Limitations

Members Feature: Task cards show members count, but assigning members is not yet implemented.

Sidebar Navigation: The navigation items (Home, Messages, etc.) are static and non-functional.

Project Switching: Sidebar lists projects visually, but only the Mobile App project is active.

Topbar Search: A global search bar exists, but it is not yet wired to the Redux filters (use the FilterBar / ProjectHeader filters instead).

StrictMode Compatibility: react-beautiful-dnd may throw warnings/errors under React 18 StrictMode. Disabling StrictMode in index.js or using prefixed droppableIds solves this.


#Folder Structure

src/
├── assets/          # Images and icons
├── components/      # Reusable UI components (Sidebar, Topbar, Board, TaskCard, etc.)
│   └── Board/       # Kanban board components
├── redux/           # Redux store, reducers, actions
├── utils/           # LocalStorage helper
├── App.js           # Main App layout
└── index.js         # Entry point


#Future Improvements

Add member assignment to tasks.

Connect sidebar navigation to routes.

Wire up Topbar global search.

Dark/light mode toggle.

Improve mobile responsiveness further.