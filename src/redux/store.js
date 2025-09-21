import { createStore } from "redux";
import rootReducer from "./reducers";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

const persisted = loadFromLocalStorage();

let enhancer;
if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
  try {
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION__();
  } catch (err) {
    console.error("Redux DevTools init failed:", err);
    enhancer = undefined;
  }
}

const store = enhancer
  ? createStore(rootReducer, persisted, enhancer)
  : createStore(rootReducer, persisted);

store.subscribe(() => {
  try {
    const s = store.getState();
    saveToLocalStorage({ tasks: s.tasks, ui: s.ui });
  } catch (err) {
    console.error("Persist failed:", err);
  }
});

export default store;

