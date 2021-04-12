import {
  PencilIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { startCase } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";
import { STATUS } from "src/shared/plugins/constants";

PostItem.propTypes = {
  item: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

function PostItem(props) {
  const { item, onEdit, onDelete } = props;

  const setClass = (setBg = false) => {
    switch (item.status) {
      case STATUS[0]:
        return setBg ? "bg-green-400" : "border-green-400";
      case STATUS[1]:
        return setBg ? "bg-blue-400" : "border-blue-400";
      default:
        return setBg ? "bg-indigo-400" : "border-indigo-400";
    }
  };

  const viewVideo = (url) => {
    window.open(url);
  };

  const handleEdit = (item) => {
    if (!onEdit) return;

    onEdit(item);
  };

  const handleDelete = (id) => {
    if (!onDelete) return;

    onDelete(id);
  };

  return (
    <div
      className={`h-full w-full bg-white shadow-lg border rounded sm:py-4 sm:px-6 p-3 flex flex-col justify-between ${setClass()}`}
    >
      <header className="flex justify-between item-center">
        <p className="text-gray-500 text-2xl font-semibold">
          {startCase(item.title)}
        </p>
        <div className="flex">
          <VideoCameraIcon
            className="h-7 w-7 text-green-500 cursor-pointer ml-5"
            onClick={() => viewVideo(item.url)}
          />
          <PencilIcon
            className="h-7 w-7 text-green-500 cursor-pointer ml-5"
            onClick={() => handleEdit(item)}
          />
          <TrashIcon
            className="h-7 w-7 text-red-500 cursor-pointer ml-5"
            onClick={() => handleDelete(item._id)}
          />
        </div>
      </header>
      <div className="font-semibold uppercase text-sm">
        <div
          className={`rounded-full text-white w-28 h-full ${setClass(true)}`}
        >
          <span className="flex justify-center item-center h-full p-1">
            {startCase(item.status)}
          </span>
        </div>
      </div>
      <div className="text-gray-500 text-lg">{startCase(item.description)}</div>
    </div>
  );
}

export default PostItem;
