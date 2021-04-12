import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { SET } from "src/store";
import PostForm from "../components/PostForm";
import { createPost } from "../store";
import { snakeCase, toUpper } from "lodash-es";

function CreatePost(props) {
  const dispatch = useDispatch();

  const onSubmit = async (value) => {
    value.status = toUpper(snakeCase(value.status));
    const res = await dispatch(createPost(value));
    unwrapResult(res);
    dispatch(SET(["showModal", false]));
  };

  return <PostForm onSubmit={onSubmit} />;
}

export default CreatePost;
