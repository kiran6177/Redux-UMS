const {verifyToken} = require('../utils/jwt');
const User = require('../models/userModel');

const isLogin = async (req,res,next)=>{
    try {
        if(req.headers && req.headers['authorization']){
            const token = req.headers['authorization'].split(' ')[1]
            const decoded = await verifyToken(token)
            console.log(decoded);
            if(decoded){
                    req.admin = decoded.id
                    next()
            }else{
                res.status(401).json({error:'Unauthorized'})
            }
        }else{
            res.status(401).json({error:'Unauthorized'})
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    isLogin
}