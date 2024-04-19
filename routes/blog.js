const {Router} = require('express');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const {checkForAuthCookie} = require('../middlewares/auth.js');
const multer  = require('multer');
const path = require('path');
const User = require('../models/user.js');
const Blogrouter = Router();

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.resolve(`./public/uploads`));
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});


Blogrouter.get('/add-new',checkForAuthCookie('token'),(req,res)=>{
    res.render('addBlog',{
        user: req.user,
    });
});

Blogrouter.post('/add-new',checkForAuthCookie('token'),upload.single("coverImage"),async(req,res)=>{

    const {title,body} = req.body;
    
    const resp = await Blog.create({
        body: body,
        title: title,
        createdBy: req.user.id,
        coverImageURL: `/uploads/${req.file.filename}`,
    });
    
    return res.redirect("/");
})

Blogrouter.get('/:id',checkForAuthCookie('token'),async(req,res)=>{
    const resp = await Blog.findById(req.params.id);
    const creator = await User.findById(resp.createdBy);
    const comments = await Comment.find({blogId: resp._id})
    return res.render("blog",{
        user: req.user,
        blog: resp,
        creater : creator,
        comments: comments,
    });
})

Blogrouter.post('/comment/:blogId',checkForAuthCookie('token'),async(req,res)=>{
    
    const content = req.body.content;
    const blogId = req.params.blogId;
    
    const resp = await Comment.create({
        content: content,
        blogId: blogId,
        createdBy: req.user.id,
    });

    return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = Blogrouter;