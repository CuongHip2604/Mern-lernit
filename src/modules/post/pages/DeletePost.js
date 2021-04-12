import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { deletePost } from "../store";
import { SET } from "src/store";

DeletePost.propTypes = {
  id: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
};

function DeletePost(props) {
  const { id, onCancel, onDelete } = props;
  const dispatch = useDispatch();

  const confirm = async () => {
    const res = await dispatch(deletePost({ _id: id }));
    unwrapResult(res);
    dispatch(SET(["showModal", false]));
    onDelete();
  };

  const cancel = () => {
    if (!onCancel) return;
    onCancel();
  };

  return (
    <div className="text-xl">
      <p>Are you sure want to delete?</p>
      <div className="flex justify-end pt-5">
        <button
          type="submit"
          className="bg-indigo-400 p-2 rounded-lg text-white hover:bg-indigo-600 cursor-pointer"
          onClick={confirm}
        >
          Confirm
        </button>
        <button
          type="button"
          className="ml-2 rounded-lg text-white bg-red-400 hover:bg-red-600"
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeletePost;
