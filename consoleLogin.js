const inquirer = require("inquirer");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./Models/Users");
const SessionHistory = require("./Models/SessionHistory");
const moment = require("moment");

var questions = [
  {
    type: "input",
    name: "email",
    message: "Enter email: ",
  },
  {
    type: "input",
    name: "password",
    message: "Enter password: ",
  },
];

inquirer.prompt(questions).then(async (answers) => {
  const email = answers["email"];
  const password = answers["password"];

  if (!email || !password) {
    console.log("Email and password both fields are required");
  }

  const userData = await User.findOne({
    email: email,
  });
  if (
    typeof userData !== "undefined" &&
    userData !== null &&
    userData.length !== null
  ) {
    let checkPassword = bcrypt.compareSync(password, userData.password); // true
    if (!checkPassword) {
      console.log("Incorrect password");
    }
    const user = {
      email: userData.email,
      userid: userData._id,
    };
    const signedUser = await User.findOne({ _id: user.userid }).exec();
    const token = await jwt.sign(
      { user: signedUser },
      process.env.ACCESS_TOKEN_SECRET
    );

    let sessionLog = new SessionHistory({
      user: userData._id,
      token: token,
      loginAt: moment(),
    });
    await sessionLog.save();

    console.log("You have successfully logged in. Here is the token: ", token);
  } else {
    console.log("The account does not exist");
  }
});
