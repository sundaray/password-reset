import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchPasswordResetEmailInfo } from "./stateSlices/passwordResetEmailSlice";

const PasswordResetFormFirst = () => {
  const { successMessage, error } = useSelector(
    (state) => state.passwordResetEmail
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      dispatch(fetchPasswordResetEmailInfo(values));
    },
  });

  return (
    <div className="login-form-wrapper">
      <div className="col-10 col-sm-8 col-md-5 mx-auto">
        <h1 className="font-weight-bold">Reset Password</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group col-10 col-sm-8 col-md-5 mx-auto mt-5">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage.message}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <label htmlFor="email">Email Address</label>
          <input
            className="form-control form-control-lg"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <small className="form-text text-danger">
              {formik.errors.email}
            </small>
          ) : null}
        </div>

        <div className="col-10 col-sm-8 col-md-5 mx-auto">
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block login-button"
          >
            Send Password Reset Link
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetFormFirst;
