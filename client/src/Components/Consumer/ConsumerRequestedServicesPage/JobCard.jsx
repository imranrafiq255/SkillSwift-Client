import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  consumerDeleteCustomServiceAction,
} from "../../Redux/Consumer/Actions/ConsumerActions";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import LoaderCircles from "../../Loader/LoaderCircles";
import { Toaster } from "react-hot-toast";
const JobCard = ({ job }) => {
  const dispatch = useDispatch();
  const { deleteLoading, deleteError, deleteMessage } = useSelector(
    (state) => state?.consumerDeleteCustomServiceReducer
  );
  const deleteCustomService = (id) => {
    if (id) {
      dispatch(consumerDeleteCustomServiceAction(id));
    }
  };
  const [isSellerFound, setSellerFound] = useState(false);
  const deleteCustomServiceWithSellerFound = (id) => {
    if (id) {
      dispatch(consumerDeleteCustomServiceAction(id));
    }
  };
  useEffect(() => {
    if (!deleteLoading && deleteError && !isSellerFound) {
      handleShowFailureToast(deleteError);
      dispatch(clearErrors());
    } else if (!deleteLoading && deleteMessage && !isSellerFound) {
      handleShowSuccessToast(deleteMessage);
      dispatch(clearErrors());
    } else if (!deleteLoading && deleteMessage && isSellerFound) {
      dispatch(clearErrors());
      handleShowSuccessToast("Thanks for ordering custom service");
    }
  }, [deleteLoading, deleteMessage, deleteError, dispatch, isSellerFound]);
  return (
    <div className="w-full max-w-xs rounded-lg border shadow-md p-4 bg-white flex flex-col items-center space-y-4">
      <Toaster />
      <div className="text-base text-gray-700 space-y-2">
        {" "}
        {/* Increased font size */}
        <p>
          <strong>Job Title:</strong> {job?.serviceTitle}
        </p>
        <p>
          <strong>Description:</strong> {job?.serviceDescription}
        </p>
        <p>
          <strong>Budget:</strong> {job?.serviceBudget}
        </p>
        <p>
          <strong>Location:</strong> {job?.consumer?.consumerAddress}
        </p>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        {" "}
        {/* Ensured buttons stack and take full width */}
        {deleteLoading ? (
          <div className="bg-green-500 text-white font-semibold py-2 w-full rounded-full hover:bg-green-600 transition flex justify-center items-center">
            <LoaderCircles />
          </div>
        ) : (
          <button
            className="bg-green-500 text-white font-semibold py-2 w-full rounded-full hover:bg-green-600 transition"
            onClick={() => {
              setSellerFound(true);
              deleteCustomServiceWithSellerFound(job?._id);
            }}
          >
            Found Service Provider
          </button>
        )}
        {deleteLoading ? (
          <div className="bg-red-500 text-white font-semibold py-2 w-full rounded-full hover:bg-red-600 transition flex justify-center items-center">
            <LoaderCircles />
          </div>
        ) : (
          <button
            className="bg-red-500 text-white font-semibold py-2 w-full rounded-full hover:bg-red-600 transition"
            onClick={() => deleteCustomService(job?._id)}
          >
            Delete Ad
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
