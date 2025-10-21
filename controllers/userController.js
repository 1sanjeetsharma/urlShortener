const {v4: uuidv4} = require("uuid");
const {setUser} = require("../services/auth");
const UserModel = require("../models/user");
async function handleUserSignup(req, res) {
    
    const {name, email, password} = req.body;
    console.log("signup data: ", {name, email, password});
    await UserModel.create({
        name,
        email,password
    });
    // return res.redirect("home");
    return res.redirect("/");
}
async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    console.log("login data: ", { email, password});
    const user =await UserModel.findOne({email, password});
    if(!user){
        return res.redirect('/login', {error: "Invalid credentials"});
        }
        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId);
    return res.redirect("/");
    }
    module.exports = {handleUserSignup, handleUserLogin};
