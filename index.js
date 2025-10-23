const express = require("express");
const connectDB = require("./connection");
const app = express();
const urlRoute = require("./routes/urls");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const path = require("path");
const staticRoute = require("./routes/staticRoute");
const { restrictTo, checkForAuthentication } = require("./middlewares/auth");
// db connection
connectDB("mongodb://127.0.0.1:27017/urlShortener");
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(checkForAuthentication);
app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.use("/",staticRoute);
app.use('/user', userRoute);

//server listening
app.listen(8000, () => {
  console.log("server started at port: 8000");
});
