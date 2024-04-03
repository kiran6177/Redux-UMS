const jwt = require('jsonwebtoken');

const createToken = (id)=>{
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({id:id},secret,{expiresIn:'1h'});
    return token
}

const verifyToken = (token) =>{
    const secret = process.env.JWT_SECRET   
    const verfied = jwt.verify(token,secret,(err,decoded)=>{
        if(err){
            return false
        }
        return decoded
    })
    return verfied
}

module.exports = {
    createToken,
    verifyToken
}