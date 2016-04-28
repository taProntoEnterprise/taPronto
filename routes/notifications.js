var express = require('express');
var Notification = require('../models/notification.js');
var router = express.Router();
var jwt = require('../routes/jwtauth.js');
var Person = require('../models/person.js');


router.get('/',jwt,function(req,res){
	var error = {};
	var result = {};
	var userId = req.user._id;
    if(!userId){userId = req.query.userId;}
    var isBlocked = req.query.blocked =='true';
	Notification.find({notified:userId,delivered:false,blocked:isBlocked},function(err,doc){
		if(err){
            res.contentType('application/json');
            res.status(500);
            error.code = err.code;
            error.message = err.message;

        }else{
            result.data= doc;
            res.status(200);
            res.contentType('application/json');
        }
        res.send(JSON.stringify({"result":result, "error":error}));
	});
});

router.get('/:notificationId',jwt,function(req,res){
	var error = {};
	var result = {};
	var notificationId = req.params.notificationId;
	Notification.findOne({_id:notificationId},function(err,doc){
		if(err){
            res.contentType('application/json');
            res.status(500);
            error.code = err.code;
            error.message = err.message;

        }else if (doc == null){
        	res.status(404);
            error.code = 404;
            error.message = "Notification Not Found";
    	}else{
            result.data= doc;
            res.status(200);
            res.contentType('application/json');
        }
        res.send(JSON.stringify({"result":result, "error":error}));
	});
});

router.post('/',jwt, function(req, res) {
	var error= {};
	var result = {};
	var notification = new Notification(req.body);
	var notifier = notification.notifier;
	var notified = notification.notified;
	var blockedProviders = [];

	Person.findOne({user:notified},function (err,doc){
		 if(err){
		 	res.status(404);
            error.code = 404;
            error.message = "Client Not Found";
			res.send(JSON.stringify({"result": result, "error": error}));
		 }else{
		 	blockedProviders=doc.blockedProviders;
		 	var blocked = !(blockedProviders.indexOf(notifier) == -1);
		 	notification.blocked=blocked;
		 	notification.save(function(err2) {
		 		if (err2) {
					error.code = err2.code;
					error.message = err2.message;
      				//11000: duplicated key
      				error.code == 11000 ? res.status(409) : res.status(500);
      			}else{
      				res.contentType('application/json');
		      		res.status(201);
				}
  				res.send(JSON.stringify({"result": result, "error": error}));
			});
		 }

	});

	
});

router.put('/:notificationId',jwt,function (req,res){
	var result = {};
	var error = {};
	var notificationId = req.params.notificationId;
	var newNotification = new Notification(req.body).toObject();
	delete newNotification._id;
	delete newNotification.code;

	Notification.update({_id:notificationId},newNotification,{},function (err,doc) {
		if(err){
			res.contentType('application/json');
            res.status(500);
            error.code=err.code;
            error.message=err.message;
		}else{
			res.contentType('application/json');
            res.status(200);
            newNotification._id=notificationId;
            result.data=newNotification;
        }
        res.send(JSON.stringify({"result":result, "error":error}));
	});

});

module.exports = router;