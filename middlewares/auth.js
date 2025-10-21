const {getUser}= require('../services/auth');
async function restrictToLoggedInUserOnly(req, res, next){
    const userUid= req.cookies.uid;
    if(!userUid){
        return res.status(401).redirect('/login');
    }
    req.user= getUser(userUid);
    next();
}

async function checkAuth(req, res, next){
    const userUid = req.cookies.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}
module.exports= {restrictToLoggedInUserOnly, checkAuth};