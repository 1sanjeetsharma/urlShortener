const {getUser}= require('../services/auth');
async function restrictToLoggedInUserOnly(req, res, next){
    const userUid= req.headers["authorization"];
    if(!userUid){
        return res.status(401).redirect('/login');
    }
    const token= userUid.split(" ")[1];
    const user= getUser(token);
    if(!user){
        return res.status(401).redirect('/login');
    }
    req.user= user;
    next();
}

async function checkForAuth(req, res, next){
    const userUid = req.headers["authorization"];
    
    const token= userUid ? userUid.split(" ")[1] : null;
    const user = getUser(token);
    console.log("user in checkAuth middleware:", user, token);
    req.user = user;
    next();
}
module.exports= {restrictToLoggedInUserOnly, checkAuth};