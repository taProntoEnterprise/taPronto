var express = require('express');
var Notification = require('../models/notification.js');
var Provider = require('../models/provider.js');
var User = require('../models/user.js');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/:id',function(req,res){
	var error = {};
	var result = {};
	Provider.findById(req.params.id, function(err,doc){
		if(err){
                res.contentType('application/json');
                res.status(404);
                error.code = err.code;
                error.message = err.message;
        } else {
                result = doc;
                res.contentType('application/json');
				res.status(200);
                res.send(JSON.stringify({"result":result, "error":error}));
        }
	});
});

router.post('/:userId/addprovider',function(req,res){
	var provider = new Provider(req.body);
	provider.user = req.params.userId;
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
			result = provider;
		    res.status(201);
			User.findById(req.params.userId, function(err,doc){
				if(err){
						res.contentType('application/json');
						res.status(404);
						error.code = err.code;
						error.message = err.message;
				} else {
						doc.provider = provider.id;
						console.log(doc);
						doc.save();
				}
				res.send(JSON.stringify({"result": result, "error": error}));
			});
		}
	});
});

module.exports = router;