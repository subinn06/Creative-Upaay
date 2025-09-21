const makeId = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);

const ADD = "tasks/ADD";
const UPDATE = "tasks/UPDATE";
const DELETE = "tasks/DELETE";
const MOVE = "tasks/MOVE";
const SET = "tasks/SET";

export const addTask = (payload) => ({ type: ADD, payload });
export const updateTask = (payload) => ({ type: UPDATE, payload });
export const deleteTask = (id) => ({ type: DELETE, payload: id });
export const moveTask = (id, newStatus, newIndex = null) => ({ type: MOVE, payload: { id, newStatus, newIndex } });
export const setTasks = (items) => ({ type: SET, payload: items });

const initialState = { items: [] };

function ensurePositions(items) {
  const grouped = items.reduce((acc, t) => {
    acc[t.status] = acc[t.status] || [];
    acc[t.status].push(t);
    return acc;
  }, {});
  Object.keys(grouped).forEach(status => {
    grouped[status]
      .sort((a,b) => (typeof a.position === "number" ? a.position : 0) - (typeof b.position === "number" ? b.position : 0))
      .forEach((t, idx) => { t.position = idx; });
  });
  return items;
}

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case ADD: {
      const id = makeId();
      const now = Date.now();
      const status = action.payload.status || "todo";
      const shifted = state.items.map(i => i.status === status ? { ...i, position: (typeof i.position === "number" ? i.position + 1 : 1) } : i);
      const t = {
        id,
        title: action.payload.title || "Untitled",
        description: action.payload.description || "",
        status,
        category: action.payload.category || "General",
        priority: action.payload.priority || "Medium",
        dueDate: action.payload.dueDate || null,
        members: action.payload.members || [],
        createdAt: now,
        position: 0,
      };
      return { ...state, items: ensurePositions([t, ...shifted]) };
    }
    case UPDATE:
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, ...action.payload } : i) };
    case DELETE: {
      const filtered = state.items.filter(i => i.id !== action.payload);
      return { ...state, items: ensurePositions(filtered) };
    }
    case MOVE: {
      const { id, newStatus, newIndex } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (!item) return state;

      const srcStatus = item.status;
      const destStatus = newStatus || srcStatus;
      const without = state.items.filter(i => i.id !== id);
      const srcArray = without.filter(i => i.status === srcStatus).sort((a,b) => (a.position||0) - (b.position||0));
      const destArray = without.filter(i => i.status === destStatus).sort((a,b) => (a.position||0) - (b.position||0));

      if (srcStatus === destStatus) {
        const fromIndex = (item.position != null ? item.position : srcArray.length);
        const toIndex = (newIndex != null ? newIndex : srcArray.length - 1);
        const arr = srcArray.slice();
        const idx = Math.max(0, Math.min(toIndex, arr.length));
        arr.splice(idx, 0, { ...item, position: idx });

        const rebuilt = without
          .filter(i => i.status !== srcStatus)
          .concat(arr.map((t, i) => ({ ...t, position: i })));

        return { ...state, items: ensurePositions(rebuilt) };
      }

      const insertIndex = (newIndex != null ? Math.max(0, Math.min(newIndex, destArray.length)) : destArray.length);
      const moved = { ...item, status: destStatus };
      const newDest = destArray.slice();
      newDest.splice(insertIndex, 0, moved);
      const others = without.filter(i => i.status !== srcStatus && i.status !== destStatus);
      const rebuiltList = [
        ...others,
        ...srcArray.map((t, i) => ({ ...t, position: i })),
        ...newDest.map((t, i) => ({ ...t, position: i })),
      ];

      return { ...state, items: ensurePositions(rebuiltList) };
    }
    case SET:
      return { ...state, items: action.payload };
    default:
      return state;
  }
}
