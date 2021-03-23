import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchPasswordResetSubmit } from "./stateSlices/passwordResetPasswordSlice";

const PasswordResetFormSecond = ({ history, match }) => {
  const { successSubmit, errorSubmit } = useSelector(
    (state) => state.passwordResetPassword
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please enter your password"),
      confirmPassword: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { password, confirmPassword } = values;
      dispatch(
        fetchPasswordResetSubmit({
          password,
          confirmPassword,
          token: match.params.token,
        })
      );
      if (successSubmit) {
        history.push("/registerLogin");
      }
    },
  });

  return (
    <div className="col-10 col-sm-8 col-md-5 mx-auto">
      <div className="login-form-wrapper">
        <div className="col-10 col-sm-8 col-md-5 mx-auto">
          <h1 className="font-weight-bold">Reset Password</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group col-10 col-sm-8 col-md-5 mx-auto mt-5">
            {errorSubmit && (
              <div className="alert alert-danger" role="alert">
                {errorSubmit}
              </div>
            )}
          </div>
          <div className="form-group col-10 col-sm-8 col-md-5 mx-auto">
            <label htmlFor="password">Password</label>
            <input
              className="form-control form-control-lg"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <small className="form-text text-danger">
                {formik.errors.password}
              </small>
            ) : null}
          </div>
          <div className="form-group col-10 col-sm-8 col-md-5 mx-auto">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="form-control form-control-lg"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <small className="form-text text-danger">
                {formik.errors.confirmPassword}
              </small>
            ) : null}
          </div>

          <div className="col-10 col-sm-8 col-md-5 mx-auto">
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block login-button"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetFormSecond;
