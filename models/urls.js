const mongoose = require("mongoose");
const Url_schema = new mongoose.Schema(
  {
    short_id: { type: String, required: true, unique: true },
    redirect_url: { type: String, required: true },
    visit_history: [
      {
        timestamp: { type: Date, default: Date.now },
        ip: String,
        userAgent: String,
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
  },
  { timestamps: true }
);
const url = mongoose.model("URL", Url_schema);
module.exports = url;
