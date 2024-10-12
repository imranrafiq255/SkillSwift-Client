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
const JobListingForm = ({ onCancel }) => {
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
      .max(30, "Job title must be less than or 20 characters")
      .required("Job title is required"),
    serviceDescription: Yup.string()
      .min(10, "serviceDescription must be at least 10 characters")
      .max(256, "serviceDescription must be less than or 256 characters")
      .required("serviceDescription is required"),
    serviceBudget: Yup.number()
      .typeError("serviceBudget must be a number")
      .positive("serviceBudget must be positive")
      .min(1000, "serviceBudget can not be less 1000")
      .required("serviceBudget is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(clearErrors());
    dispatch(consumerAddCustomServiceAction(values));
    resetForm();
  };
  useEffect(() => {
    if (!addLoading && addError) {
      handleShowFailureToast(addError);
      dispatch(clearErrors());
      onCancel();
    }
    if (!addLoading && addMessage) {
      dispatch(clearErrors());
      navigate("/consumer-requested-services");
      setTimeout(() => {
        handleShowSuccessToast(addMessage);
      }, 200);
      onCancel();
    }
  }, [addError, addMessage, dispatch, navigate, addLoading, onCancel]);
  return (
    <div>
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="serviceTitle"
                className="block text-sm font-medium"
              >
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
              <label
                htmlFor="serviceDescription"
                className="block text-sm font-medium"
              >
                Short serviceDescription
              </label>
              <Field
                as="textarea"
                id="serviceDescription"
                name="serviceDescription"
                rows="3"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter a brief serviceDescription"
              />
              <ErrorMessage
                name="serviceDescription"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="serviceBudge"
                className="block text-sm font-medium"
              >
                serviceBudget
              </label>
              <Field
                type="number"
                id="serviceBudget"
                name="serviceBudget"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter serviceBudget amount"
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
                onClick={onCancel}
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              {addLoading ? (
                <div className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition flex justify-center items-center">
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
