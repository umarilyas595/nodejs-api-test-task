const db = require("../db");

const usersSchema = new db.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = db.model("users", usersSchema);
