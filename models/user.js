const mongoose = require("mongoose");
const user_schema = new mongoose.Schema(
  {
    name:{ type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const user = mongoose.model("user", user_schema);
module.exports = user;
