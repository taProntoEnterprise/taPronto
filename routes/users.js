var express = require('express');
var User = require('../models/user.js');
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
			console.log(doc.password +" - "+password);
			if(doc.password == password){
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
			res.status(404);
			error.code=404;
			error.message="Not Found";
			res.send(JSON.stringify({"result":result,"error":error}));	
		}
	});
});

module.exports = router;