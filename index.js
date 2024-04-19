const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const blogRouter = require('./routes/blog.js');
const router = require('./routes/user.js');
require('dotenv').config();

const app = express();
mongoose.connect('mongodb+srv://10ohekabanzai:f22pakfaamca@cluster0.aiqo1in.mongodb.net/blog').then(()=>console.log('DB connected'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));

// setting server side rendering
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use('/',router);
app.use('/blog',blogRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>console.log('Server running on PORT 5000'));