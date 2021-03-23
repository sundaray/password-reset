const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold.underline);
    process.exit(1);
  }
};
2;
module.exports = connectDB;
