import React from "react";
import PostForm from "../components/PostForm";
import { snakeCase, toUpper } from "lodash-es";
import { unwrapResult } from "@reduxjs/toolkit";
import { SET } from "src/store";
import { useDispatch } from "react-redux";
import { setPostDetail, updatePost } from "../store";
import PropTypes from "prop-types";

UpdatePost.propTypes = {
  onSubmit: PropTypes.func,
};

function UpdatePost(props) {
  const { onSubmit } = props;
  const dispatch = useDispatch();

  const handleSubmit = async (value) => {
    value.status = toUpper(snakeCase(value.status));
    const res = await dispatch(updatePost(value));
    unwrapResult(res);
    dispatch(SET(["showModal", false]));
    dispatch(setPostDetail(null));
    onSubmit();
  };

  return <PostForm onSubmit={handleSubmit} isUpdate={true} />;
}

export default UpdatePost;
