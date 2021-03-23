const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const {
  notFound,
  globalErrorHandler,
} = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const passwordResetRoutes = require("./routes/passwordResetRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/account", passwordResetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/download", downloadRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.use(notFound);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`.yellow.bold);
});
