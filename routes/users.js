var express = require('express');
var User = require('../models/user.js');
var Notification = require('../models/notification.js');
var Service = require('../models/service.js');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');
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

router.get('/',function (req,res) {
	var userName = req.query.username;
	var error = {};
	var result ={};

	User.findOne({username:userName},function(err,doc){
		if(err){
            res.contentType('application/json');
            res.status(500);
            error.code = err.code;
            error.message = err.message;
        }else if(doc == null){
        	res.contentType('application/json');
            res.status(404);
            error.message="User Not Found";
    	}else{
            var data = doc.toObject();
            delete data.password;
            result.data=data;
            res.contentType('application/json');
        }
        res.send(JSON.stringify({"result":result, "error":error}));
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
				var expires = moment().add(1,'day').valueOf();
				var token = jwt.encode({
					iss:doc._id,
					exp:expires 
				},'TA_PRONTO_PRA_PAGAR_P1');
				res.status(200);
				result.code=200;
				var data = doc.toObject();
				delete data.password;
				result.data = data;
				result.token= token;
				result.expires = expires;
				res.send(JSON.stringify({"result":result,"error":error}));
			}else{
				res.status(401);
				error.code=401;
				error.message="Unauthorized";
				res.send(JSON.stringify({"result":result,"error":error}));	
			}
		}else{
			res.status(403);
			error.code=403;
			error.message="User Not Found";
			res.send(JSON.stringify({"result":result,"error":error}));	
		}
	});
});
module.exports = router;