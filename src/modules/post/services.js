import { callAPI } from "src/shared/services";

const API = {
  getListPost: (params) => {
    return callAPI("GET", "posts", { params }).then((res) => res.data);
  },
  createPost: (params) => {
    return callAPI("POST", "posts", params).then((res) => res.data);
  },
  updatePost: (params) => {
    return callAPI("PUT", `posts/${params._id}`, params).then(
      (res) => res.data
    );
  },
  deletePost: (params) => {
    return callAPI("DELETE", `posts/${params._id}`, params).then(
      (res) => res.data
    );
  },
};

export default API;
