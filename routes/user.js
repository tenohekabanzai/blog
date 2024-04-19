const express = require('express');
const User = require('../models/user');
const {createHmac} = require("crypto");
const {createToken,validateToken} = require('../services/auth');
const {checkForAuthCookie} = require('../middlewares/auth');
const Blog = require('../models/blog');
const router = express.Router();

router.get('/',checkForAuthCookie('token'),async(req,res)=>{

    const allBlogs = await Blog.find();
    res.render('home',{user:req.user, blogs: allBlogs});

});

router.get('/signin',(req,res)=>{
    return res.render('signin');
});

router.get('/signup',(req,res)=>{
    return res.render('signup');
});

router.post('/signin',async(req,res)=>{
    
    const {email,password} = req.body;
    const resp = await User.find({email : email});

    if(resp.length==0)
    {
        console.log('New User? Sign Up First!')
        return res.render('signup',{error: 'New User, SignUp First!'});
    }

    const salt = resp[0].salt;
    const providedHash = createHmac('sha256',salt).update(password).digest("hex");

    if(providedHash !== resp[0].password)
    {
        return res.render('signin',{error:'User not found!, Enter Correct Password'});
    }
    const token = createToken(resp[0]);
    res.cookie('token',token);
    return res.redirect('/');
})

router.post('/signup',async(req,res)=>{
    const {fullName,email,password} = req.body;
    const resp = await User.create({fullName,email,password,});
    return res.redirect('/');
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.render('./signin',{error:"logged out successfully!"});
})


module.exports = router;
