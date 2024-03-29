var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('./VerifyToken');

router.post('/register', function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      // var token = jwt.sign({ id: user._id }, config.secret, {
      //   expiresIn: 86400 // expires in 24 hours
      // });
      res.status(200).send({ success: true, data: "User created successfully" });
    });
});

router.get('/me', VerifyToken, function(req, res) {
  User.findById(req.userId,{ password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
});

router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(200).send({auth:false, data:'No user found.'});   //404
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(200).send({ auth: false, data: 'Password is ivalid' });    //401
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      const cookieConfig = {
        httpOnly: true, // to disable accessing cookie via client side js
        maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
        // signed: true // if you use the secret with cookieParser
      };
      res.cookie('x-access-token', token, cookieConfig)
      res.status(200).send({ auth: true, token: token });
    });
});

router.get('/logout', function(req, res) {
    res.clearCookie('x-access-token');
    res.status(200).send({ auth: false, token: null });
});

  module.exports = router;