const {getUser}= require('../services/auth');
 function restrictTo(roles){
    return function (req,res,next){
        console.log("restrictTo middleware", req.user);
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)){
                return res.status(403).send("unAuthorized access");
            }   
            return next();
    }
 }

async function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token;
    console.log("checkForAuthentication middleware", tokenCookie);
    req.user = null;
    if(!tokenCookie){ return next();
    }
    const token = tokenCookie;
    const user = getUser(token);
 
    req.user = user;
    next();
}
module.exports= {restrictTo, checkForAuthentication};