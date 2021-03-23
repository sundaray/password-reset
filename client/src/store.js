import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./components/stateSlices/loginSlice";
import registerReducer from "./components/stateSlices/registerSlice";
import passwordResetEmailReducer from "./components/stateSlices/passwordResetEmailSlice";
import passwordResetPasswordReducer from "./components/stateSlices/passwordResetPasswordSlice";

const loggedInUserFromStorage = localStorage.getItem("loggedInUser")
  ? JSON.parse(localStorage.getItem("loggedInUser"))
  : null;

const preloadedState = {
  login: {
    user: loggedInUserFromStorage,
  },
};

export default configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    passwordResetEmail: passwordResetEmailReducer,
    passwordResetPassword: passwordResetPasswordReducer,
  },
  preloadedState,
});
