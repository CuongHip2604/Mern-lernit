import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../components/PostItem";
import { getPosts, setPostDetail } from "../store";
import { PlusIcon } from "@heroicons/react/outline";
import { SET } from "src/store";
import Modal from "src/shared/components/Modal";
import CreatePost from "./CreatePost";
import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";

function PostList(props) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.post.filter);
  const posts = useSelector((state) => state.post.posts);
  const [isEdit, setIsEdit] = useState(() => false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(() => false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  useEffect(() => {
    const getListpost = async () => {
      const res = await dispatch(getPosts(filter));
      unwrapResult(res);
    };
    getListpost();
  }, [dispatch, filter]);

  const createLearnit = () => {
    setIsShowModal(true);
    dispatch(SET(["showModal", true]));
  };

  const handleOnEdit = (data) => {
    setIsEdit(true);
    dispatch(setPostDetail(data));
    setIsShowModal(true);
    dispatch(SET(["showModal", true]));
  };

  const onCancel = () => {
    setIsShowModal(false);
    setIsEdit(false);
    dispatch(setPostDetail(null));
  };

  const handleOnDelete = (id) => {
    setIdDelete(id);
    setIsShowModalDelete(true);
    dispatch(SET(["showModal", true]));
  };

  const handleCancelDelete = () => {
    setIsShowModalDelete(false);
    setIdDelete(null);
  };

  return (
    <div className="h-full relative">
      <div className="grid h-full md:grid-rows-4 sm:grid-rows-4 grid-rows-4 gap-4 sm:gap-6 sm:p-6 p-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 2xl:gap-10">
        {posts.map((item, index) => (
          <PostItem
            item={item}
            key={index}
            onEdit={handleOnEdit}
            onDelete={handleOnDelete}
          />
        ))}
      </div>
      <div className="rounded-full bg-indigo-400 h-12 w-12 cursor-pointer absolute right-8 bottom-8 z-40">
        <PlusIcon
          className="h-full w-full text-white"
          onClick={createLearnit}
        />
      </div>
      {isShowModal && (
        <Modal
          title={isEdit ? "Making progress?" : "What do you want to learn?"}
          content={isEdit ? <UpdatePost /> : <CreatePost />}
          onCancel={onCancel}
        />
      )}
      {isShowModalDelete && (
        <Modal
          content={<DeletePost id={idDelete} onCancel={handleCancelDelete} />}
        />
      )}
    </div>
  );
}

export default PostList;
