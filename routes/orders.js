var express = require('express');
var Order = require('../models/order.js');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


router.get('/',function(req,res){
	var error = {};
	var result = {};
    var userId = req.query.userId;

	Order.find({client:userId},function(err,doc){
		if(err){
                res.contentType('application/json');
                res.status(500);
                error.code = err.code;
                error.message = err.message;
            }else{
                result.data = doc;
                res.contentType('application/json');
            }
        res.send(JSON.stringify({"result":result, "error":error}));
	});
});

router.get('/:orderId',function(req,res){
	var error = {};
	var result = {};
	var orderId = req.params.orderId;
	Order.find({_id:orderId},function(err,doc){
		if(err){
            res.contentType('application/json');
            res.status(500);
            error.code = err.code;
            error.message = err.message;

        }else{
            result.data = doc;
            res.contentType('application/json');
        }
        res.send(JSON.stringify({"result":result, "error":error}));
	});
});

router.put('/:orderId',function(req,res){
    var result = {};
    var error = {};
    var newOrder = new Order(req.body).toObject();
    delete newOrder._id;
    var orderId = req.params.orderId;
    Order.update({_id:orderId},newOrder,{},function(err,doc){
        if(err){
            res.contentType('application/json');
            res.status(500);
            error.code=err2.code;
            error.message=err2.message;
        }else{
            res.contentType('application/json');
            res.status(200);
            newOrder._id=orderId;
            result.data=newOrder;
        }
        res.send(JSON.stringify({"result":result, "error":error}));
    });
});

router.post('/', function(req, res) {
	var new_order = new Order(req.body);
	var error= {};
	var result = {};
    var userId = req.query.userId;
    new_order.client=userId;
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