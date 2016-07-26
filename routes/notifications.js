var express = require('express');
var Notification = require('../models/notification.js');
var router = express.Router();
var jwt = require('../routes/jwtauth.js');
var Person = require('../models/person.js');
var User = require('../models/user.js')
var gcm = require('node-gcm');


router.get('/',jwt,function(req,res){
	var error = {};
	var result = {};
	var userId = null;
	if(req.user){
	    userId = req.user._id;
	}else{
	    userId = req.query.userId;
	}
	
    var isBlocked = req.query.blocked =='true';
    var isDelivered = req.query.delivered  || false;
    console.log(userId + isDelivered + isBlocked);
	Notification.find({notified:userId,delivered:isDelivered,blocked:isBlocked}).populate('order notifier')
        .exec(function(err,doc){
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
		 if(err || !doc){
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
		      		User.findOne({_id:notified},function(err2,doc2){
		      			if(err2){
		 					res.status(404);
            				error.code = 404;
            				error.message = "User Not Found";
							res.send(JSON.stringify({"result": result, "error": error}));
		 				}else if(!doc2.gcmIds){
		 					res.status(201);
		 					result.message = "The user doesn't have any registred device"
		 				}else{
		 					res.status(200);
		 					result.sent="Ok";
		 					gcmSender(doc2.gcmIds,notification.message,"Order Updated");
		 				}
		      		});
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



var gcmSender = function(registrationIds,message,title){
	var message = new gcm.Message();
	var sender = new gcm.Sender('AIzaSyD_n-5MPVMxqbrPGgcGvdwDdpsZ0MULelI');
	// Value the payload data to send...
	message.addData('message', message);
	message.addData('title', title );
	message.addData('msgcnt','2'); // Shows up in the notification in the status bar
	message.collapseKey = 'demo';
	message.delayWhileIdle = true; //Default is false
	message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
	 
	/**
	 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
	 */
	sender.send(message, registrationIds, 4, function (err, result) {
	    console.log(result);
	});

}


module.exports = router;