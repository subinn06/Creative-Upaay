const SET_FILTERS = "ui/SET_FILTERS";
export const setFilters = (payload) => ({ type: SET_FILTERS, payload });

const initialState = { filters: { category: "All", priority: "All", due: "All", search: "" } };

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}
