var express = require('express');
var app = express();
var db = require('./db');

app.get('/',(req,res)=>{
    res.status(200).send('Hi');
})
    
var UserController = require('./user/UserController');
app.use('/users', UserController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;