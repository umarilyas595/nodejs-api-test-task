require("dotenv").config();

const mongoose = require("mongoose");

let connection = "mongodb://127.0.0.1:27017/node_api";
mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db1 = mongoose.connection;
db1.on("error", console.error.bind(console, "connection error:"));
db1.once("open", function () {
  // we're connected!
  console.log("DB Connection successful!");
});

module.exports = mongoose;
