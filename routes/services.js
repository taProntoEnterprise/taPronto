var express = require('express');
var Service = require('../models/service.js');
var router = express.Router();
var jwt = require('../routes/jwtauth.js');
var fs = require('fs');
var Process = require('process');


router.get('/',jwt,function(req,res){
  file = "adsdLog.txt";
  before = new Date();

  logStatistics(file,"GET_req_start:"+ before);
  const startUsage = process.cpuUsage();


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
      now = new Date();
      logStatistics(file,"GET_db_res:"+(now - before));

      res.contentType('application/json');
      res.status(500);
      error.code = err.code;
      error.message = err.message;
      pos = new Date();
      logStatistics(file,"req_end"+(pos - before));

    }else{
      now = new Date();
      logStatistics(file,"GET_db_res:"+(now - before));

      result.data = doc;
      res.contentType('application/json');
      res.send(JSON.stringify({"result":result, "error":error}));
      pos = new Date();
      var cpuUsage = process.cpuUsage(startUsage)["system"];
      logStatistics("adsdCPULog.txt", cpuUsage + "ms GET at: "+pos+"\n");
      logStatistics(file,"GET_req_end"+(pos - before)+"\n");
    }
	});
});

router.get('/:serviceId',function(req,res){
	var error = {};
	var result = {};
	var serviceId = req.params.serviceId;

  const startUsage = process.cpuUsage();

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
    logStatistics("adsdCPULog.txt", cpuUsage+", get");

	});
});

router.post('/', jwt,function(req, res) {
  file = "adsdLog.txt";
  before = new Date();
  logStatistics(file,"POST_req_start:"+before);
  const startUsage = process.cpuUsage();
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
    now = new Date();
    if (err) {
      logStatistics(file,"POST_db_res after: "+(now - before));
			error.code = err.code;
			error.message = err.message;
      //11000: duplicated key
      error.code == 11000 ? res.status(409) : res.status(500);
  	}else{
      logStatistics(file,"POST_db_res after:"+(now - before));
      res.status(201);
		}
  		res.send(JSON.stringify({"result": result, "error": error}));
      var cpuUsage = process.cpuUsage(startUsage)["system"];
      pos = new Date();
      logStatistics(file,"POST_req_end after:"+(pos - before)+"\n");
      logStatistics("adsdCPULog.txt", cpuUsage + "ms POST at: "+pos+"\n");
  });
});

router.put('/:serviceId',function(req,res){
  file = "adsdLog.txt";
  before = new Date();
  logStatistics(file,"PUT_req_start:"+before);
  const startUsage = process.cpuUsage();
	var result = {};
	var error = {};
	var serviceId = req.params.serviceId;
	var newService = new Service(req.body).toObject();
	delete newService._id;

	Service.update({_id:serviceId},newService,{},function(err,doc){
    now = new Date();
		if(err){
      logStatistics(file,"PUT_db_res after: "+(now - before));

			res.contentType('application/json');
      res.status(500);
      error.code=err.code;
      error.message=err.message;
		}else{
      logStatistics(file,"PUT_db_res after: "+(now - before));

			res.contentType('application/json');
      res.status(200);
      newService._id=serviceId;
      result.data=newService;
    }
    res.send(JSON.stringify({"result":result, "error":error}));
    var cpuUsage = process.cpuUsage(startUsage)["system"];
    pos = new Date();
    logStatistics(file,"PUT_req_end after:"+(pos - before)+"\n");
    logStatistics("adsdCPULog.txt", cpuUsage + "ms PUT at: "+pos+"\n");//microseconds

	});
});

var logStatistics = function(file, message){
    fs.appendFile(file, message+"\n",function(err){
        if (err){
          console.log("ERROR WRITNG FILE");
          throw err;
        } 
    });

}

module.exports = router;