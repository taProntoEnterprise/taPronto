var express = require('express');
var User = require('../models/user.js');
var Notification = require('../models/notification.js');
var Service = require('../models/service.js');
var mongoose = require('mongoose');
var router = express.Router();

router.post('/', function(req, res) {
	var user = new User(req.body);
	var error= {};
	var result = {};
	user.save(function(err) {
		if (err) {
			error.code = err.code;
			error.message = err.message;
      		//11000: duplicated key
      		error.code == 11000 ? res.status(409) : res.status(500);
      	}else{
		      res.status(201);
		      var data = user.toObject();
		      delete data.password;
		      result.data = data;
		}
  		res.send(JSON.stringify({"result": result, "error": error}));
	});
});


router.post('/login',function(req,res){
	var username = req.body.username;
	var password = req.body.password;

	var result = {};
	var error= {};
	
	User.findOne({username:username},function(err,doc){
		if(doc){
			if(doc.verifyPass(password)){
				res.status(200);
				result.code=200;
				result.data = doc;
				res.send(JSON.stringify({"result":result,"error":error}));
			}else{
				res.status(401);
				error.code=401;
				error.message="Unauthorized";
				res.send(JSON.stringify({"result":result,"error":error}));	
			}
		}else{
			res.status(400);
			error.code=400;
			error.message="Bad Request";
			res.send(JSON.stringify({"result":result,"error":error}));	
		}
	});
});
module.exports = router;