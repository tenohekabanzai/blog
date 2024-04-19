const jwt = require('jsonwebtoken');
const user = require('../models/user');
const secret = "Tito";

const createToken=(user)=>{
    const payload = {
        id: user.id,
        fullname: user.fullName,
        email: user.email,
        profileImageURL : user.profileImageURL,
        role: user.role,
    };
    const token = jwt.sign(payload,secret);
    return token;
};  

const validateToken=(token)=>{
    if(jwt.verify(token,secret))
    {
        return jwt.decode(token,secret);
    }
    
    else
    return null;
};


module.exports = {createToken,validateToken};
