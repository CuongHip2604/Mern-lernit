import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { SET } from "src/store";
import PostForm from "../components/PostForm";
import { createPost } from "../store";
import { snakeCase, toUpper } from "lodash-es";
import PropTypes from "prop-types";

CreatePost.propTypes = {
  onSubmit: PropTypes.func,
};

function CreatePost(props) {
  const { onSubmit } = props;
  const dispatch = useDispatch();

  const handleSubmit = async (value) => {
    value.status = toUpper(snakeCase(value.status));
    const res = await dispatch(createPost(value));
    unwrapResult(res);
    dispatch(SET(["showModal", false]));
    onSubmit();
  };

  return <PostForm onSubmit={handleSubmit} />;
}

export default CreatePost;
