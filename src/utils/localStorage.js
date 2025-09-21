export const STORAGE_KEY = "appState_v1";

export const loadFromLocalStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch (err) {
    console.error("Failed to load state:", err);
    return undefined;
  }
};

export const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state:", err);
  }
};
