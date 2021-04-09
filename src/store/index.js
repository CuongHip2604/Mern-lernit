import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import modules from "./modules";

const initialState = {
  sidebarShow: "responsive",
  loading: false,
};

const root = createSlice({
  name: "root",
  initialState,
  reducers: {
    SET(state, action) {
      const [variable, value] = action.payload;
      state[variable] = value;
    },
  },
});

const { actions, reducer } = root;
export const { SET } = actions;

const rootReducers = combineReducers({
  ...modules,
  root: reducer,
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
