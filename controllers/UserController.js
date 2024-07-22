require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../Models/Users");
const SessionHistory = require("../Models/SessionHistory");
const sendApiResponse = require("../utilities/sendApiResponse");
const moment = require("moment");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    sendApiResponse(
      res,
      {},
      500,
      "Email and password both fields are required."
    );
    return false;
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
      sendApiResponse(res, {}, 500, "Incorrect password.");
      return false;
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

    res.json({
      error: false,
      data: {
        loggedin: true,
        token,
        email: user.email,
        userid: user.userid,
      },
      user: signedUser,
      message: "Successfully logged in",
    });
  } else {
    res.json({ error: true, message: "The account does not exist." });
  }
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    let encPassword = bcrypt.hashSync(password, salt);
    let user = {
      name,
      email,
      password: encPassword,
    };
    user = await User.create(user);
    sendApiResponse(res, user, 200, "User has been successfully created.");
  } catch (error) {
    sendApiResponse(res, {}, 500, "Something went wrong!");
  }
};

const logout = async (req, res) => {
  const user = req.user;
  const { token } = req.body;

  await jwt.destroy(token);
  await SessionHistory.findOneAndUpdate(
    {
      token: token,
      user: user._id,
    },
    { logoutAt: moment() }
  );

  sendApiResponse(res, {}, 200, "You have successfully logged out!");
};

module.exports = {
  signIn,
  signUp,
  logout,
};
