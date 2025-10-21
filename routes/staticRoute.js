const express = require("express");
const router = express.Router();
const path = require("path");
const urlModel = require("../models/urls");
const { nanoid } = require("nanoid");
router.get("/", async (req, res) => {
    try{
        if(!req.user) return res.redirect("/login");

        const allurls = await urlModel.find({createdBy: req.user._id});
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
// router.post("/", async (req, res) => {
//     try{
//         const short_id = await nanoid(8);
//         const allurls = await urlModel.find({});
//         const id = await urlModel.create({ ...req.body, short_id: short_id, visit_history: [] });
//         res.render('home', {urls: allurls, id: id.short_id});
//     }
// });
module.exports = router;
