const db = require("../db");

const schema = new db.Schema(
  {
    user: {
      type: db.Schema.Types.ObjectId,
      ref: "users",
    },
    token: {
      type: String,
    },
    loginAt: {
      type: String,
    },
    logoutAt: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = db.model("session_history", schema);
