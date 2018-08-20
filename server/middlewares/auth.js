const jwt = require('jsonwebtoken');

let verifyToken = (req,res,next)=>{
    let token = req.get('Authorization')
    if(!token){
        token = req.query.token;
    }
    if(!token){
        res.status(401).send({ok:false,err:{message:'Invalid authorization'}});
    }
    jwt.verify(token, process.env.SEED, (err,decoded)=>{
        if(err){
            res.status(401).send({ok:false,err});
        }
        req.user = decoded.user;
        next();
    }) 
}

let verifyAdminRole = (req,res,next)=>{
    if(req.user.role !== "ADMIN_ROLE"){
        res.status(401).send({ok:false,err:{message:'Access denied!'}})
    }
    next();

}

module.exports = {verifyToken,verifyAdminRole}