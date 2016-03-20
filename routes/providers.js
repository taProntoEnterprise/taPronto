'use strict';
var express = require('express');
var Notification = require('../models/notification.js');
var Provider = require('../models/provider.js');
var User = require('../models/user.js');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/',function(req,res){
	var error = {};
	var result = {};
	var userId = req.query.userId;
	console.log(userId);
	Provider.findOne({user:userId}, function(err,doc){
		if(err){
                res.contentType('application/json');
                res.status(404);
                error.code = err.code;
                error.message = err.message;
        } else {
                result.data = doc;
                res.contentType('application/json');
				res.status(200);
                res.send(JSON.stringify({"result":result, "error":error}));
        }
	});
});

router.post('/',function(req,res){
	var provider = new Provider(req.body);
	provider.user = req.query.userId;
	var error = {};
	var result = {};
	provider.save(function(err) {
		if (err) {
			error.code = err.code;
			error.message = err.message;
      		//11000: duplicated key
      		error.code == 11000 ? res.status(409) : err.code;
			res.status(error.code);
			res.send(JSON.stringify({"result": result, "error": error}));
      	}else{
			result.data = provider;
		    res.status(201);
			User.findById(req.query.userId, function(err2,doc){
				if(err2){
						res.contentType('application/json');
						res.status(404);
						error.code = err2.code;
						error.message = err2.message;
				} else {
						doc.provider = provider._id;
						doc.save();
				}
				res.send(JSON.stringify({"result": result, "error": error}));
			});
		}
	});
});


router.put('/',function (req,res) {
	var result = {};
	var error = {};
	var userId= req.query.userId;
	var newProvider = new Provider(req.body).toObject();
	delete newProvider._id;
	Provider.update({user:userId},newProvider,{},function (err,doc) {
		 if(err){
		 	error.code=err.code;
		 	error.message=err.message;
		 	res.contentType('application/json');
		 	res.status(500);
		 }else{
		 	newProvider._id=userId;
		 	result.data=newProvider;
		 	res.contentType('application/json');
			res.status(200);
		 }
		 res.send(JSON.stringify({"result": result, "error": error}));

	});

});

module.exports = router;