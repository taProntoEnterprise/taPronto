var express = require('express');
var Order = require('../models/order.js');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


router.get('/',function(req,res){
	var error = {};
	var result = {};

	Order.find(function(err,doc){
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

router.get(/\/order\/(\w+)$/,function(req,res){
	var error = {};
	var result = {};
	var orderCode = new String(req.params[0]);

	Order.findOne({code:orderCode},function(err,doc){
		if(err){
            res.contentType('application/json');
            res.status(500);
            error.code = err.code;
            error.message = err.message;

        }else{
            result = orders;//doc;
            res.contentType('application/json');
        }
        res.send(JSON.stringify({"result":result, "error":error}));
	});
});

router.get(/\/orderByClient\/(\w+)$/,function(req,res){
	var error = {};
	var result = {};
	var clientId = new ObjectId(req.params[0]);

	Order.find({_id:clientId},function(err,doc){
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

router.post('/addorder', function(req, res) {
	var new_order = new Order(req.body);
	console.log(new_order);
	var error= {};
	var result = {};
	new_order.save(function(err) {
		if (err) {
			error.code = err.code;
			error.message = err.message;
      		//11000: duplicated key
      		error.code == 11000 ? res.status(409) : res.status(500);
      	}else{res.status(201);}
  		res.send(JSON.stringify({"result": result, "error": error}));
	});
});

module.exports = router;