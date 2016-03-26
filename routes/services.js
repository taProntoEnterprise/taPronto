var express = require('express');
var Service = require('../models/service.js');
var router = express.Router();

router.get('/',function(req,res){
	var error = {};
	var result = {};
	var userId = req.query.userId;

	Service.find({provider:userId},function(err,doc){
		if(err){
                res.contentType('application/json');
                res.status(500);
                error.code = err.code;
                error.message = err.message;

            }else{
                result.data = doc;
                res.contentType('application/json');
                res.send(JSON.stringify({"result":result, "error":error}));
            }
	});
});

router.get('/:serviceId',function(req,res){
	var error = {};
	var result = {};
	var serviceId = req.params.serviceId;

	Service.findOne({_id:serviceId},function(err,doc){
		if(err){
                res.contentType('application/json');
                res.status(500);
                error.code = err.code;
                error.message = err.message;

            }else{
                result.data = doc;
                res.contentType('application/json');
                res.send(JSON.stringify({"result":result, "error":error}));
            }
	});
});

router.post('/', function(req, res) {
	var service = new Service(req.body);
	var error= {};
	var result = {};
	console.log(req.query);
	console.log("");
	console.log(req.headers);
	var userId = req.query.userId;
	service.provider = userId;

	service.save(function(err) {
		if (err) {
			error.code = err.code;
			error.message = err.message;
      		//11000: duplicated key
      		error.code == 11000 ? res.status(409) : res.status(500);
      	}else{
		      res.status(201);
		}
  		res.send(JSON.stringify({"result": result, "error": error}));
	});
});

router.put('/:serviceId',function(req,res){
	var result = {};
	var error = {};
	var serviceId = req.params.serviceId;
	var newService = new Service(req.body).toObject();
	delete newService._id;

	Service.update({_id:serviceId},newService,{},function(err,doc){
		if(err){
			res.contentType('application/json');
            res.status(500);
            error.code=err.code;
            error.message=err.message;
		}else{
			res.contentType('application/json');
            res.status(200);
            newService._id=serviceId;
            result.data=newService;
        }
        res.send(JSON.stringify({"result":result, "error":error}));
	});
});

module.exports = router;