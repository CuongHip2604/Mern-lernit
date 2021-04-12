import React from "react";
import PostForm from "../components/PostForm";
import { snakeCase, toUpper } from "lodash-es";
import { unwrapResult } from "@reduxjs/toolkit";
import { SET } from "src/store";
import { useDispatch } from "react-redux";
import { setPostDetail, updatePost } from "../store";

function UpdatePost(props) {
  const dispatch = useDispatch();

  const onSubmit = async (value) => {
    value.status = toUpper(snakeCase(value.status));
    const res = await dispatch(updatePost(value));
    unwrapResult(res);
    dispatch(SET(["showModal", false]));
    dispatch(setPostDetail(null));
  };

  return <PostForm onSubmit={onSubmit} isUpdate={true} />;
}

export default UpdatePost;
