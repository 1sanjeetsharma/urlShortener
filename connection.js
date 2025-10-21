const mongoose = require("mongoose");
function connectDB(db_addr) {
  return mongoose
    .connect(db_addr)
    .then(() => {
      console.log("Database connected");
    })
    .catch((e) => {
      console.log("error connecting db: ", e);
    });
}
module.exports = connectDB;
