import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "src/modules/post/pages/CreatePost";
import PostList from "src/modules/post/pages/PostList";
import { SET } from "src/store";
import Modal from "../components/Modal";

function Home(props) {
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const totalItem = useSelector((state) => state.post.totalItem);
  const [isShowModal, setIsShowModal] = useState(() => false);
  const dispatch = useDispatch();

  const createLearnit = () => {
    setIsShowModal(true);
    dispatch(SET(["showModal", true]));
  };

  const onCancel = () => {
    setIsShowModal(false);
  };

  return (
    <div className="h-full">
      {totalItem === 0 ? (
        <div className="container mx-auto h-full">
          <div className="flex justify-center items-center h-full">
            <div className="rounded-xl bg-white xl:w-4/6 w-5/6 shadow-md flex border border-gray-300">
              <div className="space-y-4 sm:w-full pb-5">
                <header className="text-center h-20 flex justify-center items-center border-b border-gray-300 bg-gray-100">
                  <h3 className="text-3xl opacity-50">
                    Hello {currentUser.username}
                  </h3>
                </header>
                <div>
                  <div className="text-2xl text-center">Welcome to Learnit</div>
                  <div className="text-lg text-center opacity-50">
                    Click the button below to track your first skill to learn
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className="text-lg bg-indigo-400 text-white p-2 border rounded-lg hover:bg-indigo-500"
                    onClick={createLearnit}
                  >
                    Learnit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PostList />
      )}
      {isShowModal && (
        <Modal
          title="What do you want to learn?"
          content={<CreatePost />}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

export default Home;
