import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchLoginInfo } from "./stateSlices/loginSlice";
import { motion } from "framer-motion";

const paragraphVariants = {
  initial: { y: ".5rem", opacity: 0 },
  animate: {
    y: "0rem",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const LoginForm = ({ history }) => {
  const { user, error: loginError } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email address"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(fetchLoginInfo(values));
      console.log(user);
    },
  });

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    history.push("/");
  }

  return (
    <div className="login-form-wrapper">
      <div className="col-10 col-sm-8 col-md-5 mx-auto">
        <h1 className="font-weight-bold">Login</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group col-10 col-sm-8 col-md-5 mx-auto mt-5">
          {loginError && (
            <div className="alert alert-danger" role="alert">
              {loginError}
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

        <div className="col-10 col-sm-8 col-md-5 mx-auto">
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block login-button"
          >
            Login
          </button>
        </div>
        <div className="col-10 col-sm-8 col-md-5 mx-auto mt-3">
          <p className="forgot-password">
            <Link to="/account/forgot">Forgot password?</Link>
          </p>
          <motion.p
            variants={paragraphVariants}
            initial="initial"
            animate="animate"
            className="register-cta"
          >
            Don't have an account? <Link to="/register">Register</Link>
          </motion.p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
