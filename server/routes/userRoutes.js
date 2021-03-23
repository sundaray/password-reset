const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

const router = express.Router();

router.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      const err = new Error("User already registered");
      err.status = 400;
      next(err);
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.json({
      _id: user._id,
      firstName: user.firstName,
      token: generateToken(user._id),
    });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        token: generateToken(user._id),
      });
    } else {
      const err = new Error("Invalid email or password");
      err.status = 401;
      next(err);
    }
  })
);

module.exports = router;
