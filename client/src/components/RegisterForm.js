import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchRegisterInfo } from "./stateSlices/registerSlice";
import { fetchLoginInfo } from "./stateSlices/loginSlice";

const RegisterForm = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };
  const { user } = useSelector((state) => state.login);
  const { user: registeredUser, error } = useSelector(
    (state) => state.register
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Please enter your first name"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Please enter your last name"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email address"),
      password: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Please enter your password"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      dispatch(fetchRegisterInfo(values));
      if (registeredUser) {
        dispatch(fetchLoginInfo({ email, password }));
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        history.replace(from);
      }
    },
  });

  return (
    <div className="register-form-wrapper">
      <div className="col-10 col-sm-8 col-md-5 mx-auto">
        <h1 className="font-weight-bold">Register</h1>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group col-10 col-sm-8 col-md-5 mx-auto mt-5">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <label htmlFor="firstName">First Name</label>
          <input
            className="form-control form-control-lg"
            id="firstName"
            type="text"
            {...formik.getFieldProps("firstName")}
          />

          {formik.touched.firstName && formik.errors.firstName ? (
            <small className="form-text text-danger">
              {formik.errors.firstName}
            </small>
          ) : null}
        </div>
        <div className="form-group col-10 col-sm-8 col-md-5 mx-auto">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="form-control form-control-lg"
            id="lastName"
            type="text"
            {...formik.getFieldProps("lastName")}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <small className="form-text text-danger">
              {formik.errors.lastName}
            </small>
          ) : null}
        </div>
        <div className="form-group col-10 col-sm-8 col-md-5 mx-auto">
          <label htmlFor="email">Email</label>
          <input
            className="form-control form-control-lg"
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <small className="form-text text-danger">
              {formik.errors.email}
            </small>
          ) : null}
        </div>
        <div className="form-group col-10 col-sm-8 col-md-5 mx-auto">
          <label htmlFor="password">Password</label>
          <input
            className="form-control form-control-lg"
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <small className="form-text text-danger">
              {formik.errors.password}
            </small>
          ) : null}
        </div>

        <div className="col-10 col-sm-8 col-md-5 mx-auto">
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block register-button"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
