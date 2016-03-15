var express = require('express');
var User = require('../models/user.js');
var Notification = require('../models/notification.js');
var Service = require('../models/service.js');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/',function(req,res){
	var error = {};
	var result = {};

	User.find(function(err,doc){
		if(err){
                res.contentType('application/json');
                res.status(500);
                error.code = err.code;
                error.message = err.message;

            }else{
                result = doc;
                res.contentType('application/json');
                res.send(JSON.stringify({"result":result, "error":error}));
            }
	});
});

router.post('/adduser', function(req, res) {
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
		      //result.uri = "/users/user/" + user.username;
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

router.post('/receivednotifications',function(req,res){
	var error = {};
	var result = {};
	var personId = mongoose.Types.ObjectId(req.body.person);
	console.log("peguei o OID "+ personId);
	Notification.find({notified:personId},function(err,doc){
		if(err){
                res.contentType('application/json');
                res.status(500);
                error.code = err.code;
                error.message = err.message;

            }else{
                result = doc;
                res.contentType('application/json');
                res.send(JSON.stringify({"result":result, "error":error}));
            }
	});
});

router.post('/sentnotifications',function(req,res){
	var error = {};
	var result = {};
	var personId = mongoose.Types.ObjectId(req.body.person);
	Notification.find({notifier:personId},function(err,doc){
		if(err){
                res.contentType('application/json');
                res.status(500);
                error.code = err.code;
                error.message = err.message;

            }else{
                result = doc;
                res.contentType('application/json');
                res.send(JSON.stringify({"result":result, "error":error}));
            }
	});
});

router.post('/providedservices',function(req,res){
	var error = {};
	var result = {};
	var personId = mongoose.Types.ObjectId(req.body.person);
	Service.find({generator:personId},function(err,doc){
		if(err){
                res.contentType('application/json');
                res.status(500);
                error.code = err.code;
                error.message = err.message;

            }else{
                result = doc;
                res.contentType('application/json');
                res.send(JSON.stringify({"result":result, "error":error}));
            }
	});
});

router.post('/contractedservices',function(req,res){
	var error = {};
	var result = {};
	var personId = mongoose.Types.ObjectId(req.body.person);
	Service.find({client:personId},function(err,doc){
		if(err){
                res.contentType('application/json');
                res.status(500);
                error.code = err.code;
                error.message = err.message;

            }else{
                result = doc;
                res.contentType('application/json');
                res.send(JSON.stringify({"result":result, "error":error}));
            }
	});
});

module.exports = router;