import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  consumerAddCustomServiceAction,
} from "../../Redux/Consumer/Actions/ConsumerActions";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoaderCircles from "../../Loader/LoaderCircles";

const JobListingForm = ({ onCancel, toggleRefresh }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addLoading, addError, addMessage } = useSelector(
    (state) => state.consumerAddCustomServiceReducer
  );

  const initialValues = {
    serviceTitle: "",
    serviceDescription: "",
    serviceBudget: "",
  };

  const validationSchema = Yup.object({
    serviceTitle: Yup.string()
      .min(3, "Job title must be at least 3 characters")
      .max(30, "Job title must be less than or 30 characters")
      .required("Job title is required"),
    serviceDescription: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .max(256, "Description must be less than or 256 characters")
      .required("Description is required"),
    serviceBudget: Yup.number()
      .typeError("Budget must be a number")
      .positive("Budget must be positive")
      .min(1000, "Budget cannot be less than 1000")
      .required("Budget is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(clearErrors());
    dispatch(consumerAddCustomServiceAction(values));
  };

  useEffect(() => {
    if (!addLoading && addError) {
      handleShowFailureToast(addError);
      dispatch(clearErrors());
      onCancel();
    }
    if (!addLoading && addMessage) {
      handleShowSuccessToast(addMessage);
      toggleRefresh();
      dispatch(clearErrors());
      onCancel();
    }
  }, [addError, addMessage, dispatch, navigate, addLoading, onCancel, toggleRefresh]);

  return (
    <div>
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="serviceTitle" className="block text-sm font-medium">
                Job Title
              </label>
              <Field
                type="text"
                id="serviceTitle"
                name="serviceTitle"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter job title"
              />
              <ErrorMessage
                name="serviceTitle"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="serviceDescription" className="block text-sm font-medium">
                Short Description
              </label>
              <Field
                as="textarea"
                id="serviceDescription"
                name="serviceDescription"
                rows="3"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter a brief description"
              />
              <ErrorMessage
                name="serviceDescription"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="serviceBudget" className="block text-sm font-medium">
                Budget
              </label>
              <Field
                type="number"
                id="serviceBudget"
                name="serviceBudget"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter Budget amount"
              />
              <ErrorMessage
                name="serviceBudget"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onCancel();
                }}
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              {addLoading ? (
                <div className="bg-blue-500 text-white py-2 px-4 rounded-md flex justify-center items-center">
                  <LoaderCircles />
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobListingForm;
