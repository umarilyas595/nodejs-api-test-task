require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyTheToken = (req, res, next) => {
  // getting the token from the header
  const bearer = req.headers["authorization"];
  if (bearer) {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = data.user;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyTheToken;
