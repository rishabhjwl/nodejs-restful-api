var express = require('express');
var app = express();
var path=require('path');
var cookieParser = require('cookie-parser')
var db = require('./db');
var VerifyToken = require('./auth/VerifyToken');

app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')));
app.use('/login', express.static('public/login.html'));
app.use('/profile', VerifyToken, express.static('public/profile.html'));
app.use('/ab',(req,res)=>{
    res.redirect('/login')
})
// app.get('/',(req,res)=>{
//     res.status(200).send('Hi');
// })
    
var UserController = require('./user/UserController');
app.use('/users', UserController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;