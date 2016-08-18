var express = require('express');
var Service = require('../models/service.js');
var router = express.Router();
var jwt = require('../routes/jwtauth.js');
var fs = require('fs');
var Process = require('process');


router.get('/',jwt,function(req,res){
  file = "adsdLog.txt";
  logStatistics(file,"GET_req_start:"+new Date());

	var error = {};
	var result = {};

	//remove after token based authentication is ready
	 var userId = null;
  if(req.user){
    userId = req.user._id;
  }else{
    userId = req.query.userId;
  }

	Service.find({provider:userId},function(err,doc){
		if(err){
      logStatistics(file,"GET_db_res:"+new Date())

      res.contentType('application/json');
      res.status(500);
      error.code = err.code;
      error.message = err.message;
      logStatistics(file,"req_end"+new Date())

    }else{
      logStatistics(file,"GET_db_res:"+new Date())

      result.data = doc;
      res.contentType('application/json');
      res.send(JSON.stringify({"result":result, "error":error}));
      logStatistics(file,"GET_req_end"+new Date())
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

router.post('/', jwt,function(req, res) {
   file = "adsdLog.txt";
  logStatistics(file,"POST_req_start:"+new Date());
	var service = new Service(req.body);
	var error= {};
	var result = {};
	

	//remove after token based authentication is ready
	 var userId = null;
  if(req.user){
    userId = req.user._id;
  }else{
    userId = req.query.userId;
  }

	service.provider = userId;

	service.save(function(err) {
		if (err) {
       logStatistics(file,"POST_db_res:"+new Date())
			error.code = err.code;
			error.message = err.message;
      		//11000: duplicated key
      		error.code == 11000 ? res.status(409) : res.status(500);
      	}else{
           logStatistics(file,"POST_db_res:"+new Date())
		      res.status(201);
		}
  		res.send(JSON.stringify({"result": result, "error": error}));
      logStatistics(file,"POST_req_end"+new Date())

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

var logStatistics = function(file, message){
    fs.appendFile(file, message+"\n", (err) => {
        if (err){
          console.log("ERROR WRITNG FILE");
          throw err;
        } 
    });

}

module.exports = router;