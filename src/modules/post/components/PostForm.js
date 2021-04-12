import React, { useEffect } from "react";
import { startCase, capitalize } from "lodash-es";
import * as yub from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { STATUS } from "src/shared/plugins/constants";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { SET } from "src/store";

PostForm.propTypes = {
  onSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
};

PostForm.defaultProps = {
  isUpdate: false,
};

function PostForm(props) {
  const { onSubmit, isUpdate } = props;
  const postDetail = useSelector((state) => state.post.postDetail);

  const schema = yub.object().shape({
    title: yub.string().required(),
    description: yub.string(),
    url: yub.string(),
    status: yub.string().required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      url: "",
      status: "To learn",
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const submitForm = (value) => {
    if (!onSubmit) return;

    if (isUpdate) {
      value["_id"] = postDetail._id;
    }

    onSubmit(value);
    reset();
  };
  const cancelForm = () => {
    dispatch(SET(["showModal", false]));
    reset();
  };

  useEffect(() => {
    const setData = () => {
      if (isUpdate && postDetail) {
        setValue("title", postDetail.title, { shouldDirty: true });
        setValue("description", postDetail.description, { shouldDirty: true });
        setValue("url", postDetail.url, { shouldDirty: true });
        setValue("status", capitalize(startCase(postDetail.status)), {
          shouldDirty: true,
        });
      }
    };
    setData();
  }, [postDetail, isUpdate, setValue]);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="my-5">
        <input
          type="text"
          name="title"
          {...register("title")}
          placeholder="Title"
          className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <span className="text-red-600 text-sm pl-2">
          {errors?.title?.message}
        </span>
      </div>
      <textarea
        type="text"
        name="description"
        {...register("description")}
        placeholder="Description"
        rows="4"
        className="my-5 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <input
        type="text"
        name="url"
        {...register("url")}
        placeholder="Youtube Tutorial URL"
        className="my-5 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <div className="my-5">
        <select
          name="status"
          {...register("status")}
          className="block w-full text-gray-500 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {STATUS.map((status, index) => (
            <option key={index}>{capitalize(startCase(status))}</option>
          ))}
        </select>
        <span className="text-red-600 text-sm pl-2">
          {errors?.status?.message}
        </span>
      </div>
      <div className="flex justify-end pt-5">
        <button
          type="submit"
          className="bg-indigo-400 p-2 rounded-lg text-white hover:bg-indigo-600 cursor-pointer"
        >
          Submit
        </button>
        <button
          type="button"
          className="ml-2 rounded-lg text-white bg-red-400 hover:bg-red-600"
          onClick={cancelForm}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default PostForm;
