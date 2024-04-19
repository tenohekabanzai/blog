
const {validateToken} = require('../services/auth');
const checkForAuthCookie=(cookieName)=>{
    return (req,res,next)=>{
        
        const token = req.cookies[cookieName];
        
        if(!token)
        return res.render('signin',{error:'Signin Please!'});
        
        try {
            const user = validateToken(token);
            req.user = user;
        } catch (error) {}
       
        next();
    }
    
}

module.exports = {checkForAuthCookie};