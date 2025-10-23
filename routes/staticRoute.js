const express = require("express");
const router = express.Router();
const path = require("path");
const urlModel = require("../models/urls");
const { nanoid } = require("nanoid");
const { restrictTo } = require("../middlewares/auth");
router.get("/",restrictTo(["NORMAL"]), async (req, res) => {
    try{
        const allurls = await urlModel.find({createdBy: req.user._id});
        res.render('home', {urls: allurls});
    }
    catch(err){
        res.status(500).send("Server Error");
    }
});
router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
    try{
        const allurls = await urlModel.find({});
        res.render('home', {urls: allurls});
    }
    catch(err){
        res.status(500).send("Server Error");
    }
});
router.get("/login", (req, res) => {
    console.log("rendering login page", req.body);
    res.render("login");
});
router.get("/signup", (req, res) => {
     console.log("rendering signup page", req.body);
    res.render("signup");
});

module.exports = router;
