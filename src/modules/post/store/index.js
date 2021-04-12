import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PARAMS } from "src/shared/plugins/constants";
import API from "../services";

const initialState = {
  posts: [],
  totalItem: null,
  filter: {
    limit: PARAMS.LIMIT,
    offset: PARAMS.OFFSET,
  },
  postDetail: null,
};

export const getPosts = createAsyncThunk("post/getPosts", async (params) => {
  const res = await API.getListPost(params);
  return res.data;
});

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params, { dispatch, getState }) => {
    try {
      const res = await API.createPost(params);
      const state = getState();
      await dispatch(getPosts(state.post.filter));
      return res.data;
    } catch (error) {}
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (params, { dispatch, getState }) => {
    try {
      const res = await API.updatePost(params);
      const state = getState();
      await dispatch(getPosts(state.post.filter));
      return res.data;
    } catch (error) {}
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (params, { dispatch, getState }) => {
    try {
      const res = await API.deletePost(params);
      const state = getState();
      await dispatch(getPosts(state.post.filter));
      return res.data;
    } catch (error) {}
  }
);

const store = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostDetail: (state, action) => {
      state.postDetail = action.payload;
    },
  },
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.totalItem = action.payload.total;
    },
  },
});

const { reducer, actions } = store;
export const { setPostDetail } = actions;
export default reducer;
