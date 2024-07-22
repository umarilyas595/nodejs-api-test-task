require("dotenv").config();

var express = require("express");
var router = express.Router();
const cors = require("cors");
const verifyTheToken = require("../middlewares/Auth");
router.use(cors());

const { signIn, signUp, logout } = require("../controllers/UserController");

router.post("/login", signIn);
router.post("/signup", signUp);
router.post("/logout", verifyTheToken, logout);

module.exports = router;
