var express = require('express');
var Service = require('../models/service.js');
var router = express.Router();

router.get('/',function(req,res){
	var error = {};
	var result = {};

	Service.find(function(err,doc){
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
router.post('/addservice', function(req, res) {
	var service = new Service(req.body);
	var error= {};
	var result = {};
	service.save(function(err) {
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

module.exports = router;