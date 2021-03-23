const express = require("express");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "pgcim14.hemant@spjimr.org",
  from: "rawgrittt@gmail.com", // Use the email address or domain you verified above
  subject: "PASSWORD RESET LINK",
  html:
    "<p>Click on the link below to <strong>reset your password</strong></p>",
};

const router = express.Router();

// router.get(
//   "/reset/:token",
//   asyncHandler(async (req, res, next) => {
//     const user = await User.findOne({
//       passwordResetToken: req.params.token,
//       passwordResetExpires: { $gt: Date.now() },
//     });

//     if (user) {
//       res.json(user);
//     } else {
//       const err = new Error("Password reset token is invalid or has expired");
//       err.status = 404;
//       next(err);
//     }
//   })
// );
router.post(
  "/reset/:token",
  asyncHandler(async (req, res, next) => {
    if (req.body.password === req.body.confirmPassword) {
      next();
    } else {
      const err = new Error("Passwords don't match.");
      err.status = 404;
      next(err);
    }
    const user = await User.findOne({
      passwordResetToken: req.params.token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (user) {
      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      const err = new Error("Password reset token is invalid or has expired");
      err.status = 404;
      next(err);
    }
  })
);
router.post(
  "/forgot",
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      user.passwordResetToken = crypto.randomBytes(20).toString("hex");
      user.passwordResetExpires = Date.now() + 3600000;
      await user.save();

      res.json({
        message: "You have been emailed a password reset link",
      });

      // const resetUrl = `http://${req.headers.host}/account/reset/${user.passwordResetToken}`;
      //SEND PASSWORD RESET LINK TO THEIR EMAIL

      const msg = {
        to: user.email,
        from: "rawgrittt@gmail.com", // Use the email address or domain you verified above
        subject: "PASSWORD RESET LINK",
        html:
          "<p>Click on the link below to <strong>reset your password</strong></p>",
      }(async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      })();
    } else {
      const err = new Error("No account with that email exists");
      err.status = 404;
      next(err);
    }
  })
);

module.exports = router;
