import React from "react";
import { XIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { SET } from "src/store";

Modal.propTypes = {
  content: PropTypes.element,
  title: PropTypes.string,
  closeText: PropTypes.string,
  submitText: PropTypes.string,
  isShowCancel: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

Modal.defaultProps = {
  title: "Notice",
  closeText: "Cancel",
  isShowCancel: true,
  submitText: "Submit",
};

function Modal(props) {
  const { title, content, onCancel } = props;
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.root.showModal);

  const closeModal = () => {
    dispatch(SET(["showModal", false]));
    if (!onCancel) return;

    onCancel();
  };

  return (
    <>
      {showModal && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-xl mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
            <div className="modal-content sm:py-4 text-left sm:px-6 p-4">
              {/* header */}
              <div className="flex justify-between items-center pb-3">
                <p className="sm:text-2xl text-xl font-bold">{title}</p>
                <div className="modal-close cursor-pointer z-50">
                  <XIcon
                    className="fill-current text-black h-6 w-6"
                    onClick={closeModal}
                  />
                </div>
              </div>
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Modal;
