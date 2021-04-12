import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services";

const initialState = {
  currentUser: {},
  accessToken: null,
};

export const login = createAsyncThunk(
  "authentication/login",
  async (params) => {
    const res = await API.login(params);
    return res.data;
  }
);

export const handleRegister = createAsyncThunk(
  "authentication/register",
  async (params) => {
    const res = await API.register(params);
    return res.data;
  }
);

const store = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = {};
      state.accessToken = null;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
  },
});

const { actions, reducer } = store;
export const { logout } = actions;
export default reducer;
