var express = require('express');
var app = express();
var path=require('path');
var db = require('./db');

app.use(express.static(path.join(__dirname,'public')));
// app.get('/',(req,res)=>{
//     res.status(200).send('Hi');
// })
    
var UserController = require('./user/UserController');
app.use('/users', UserController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;