var express = require('express');
var Order = require('../models/order.js');
var Person = require('../models/person.js');
var Provider = require('../models/provider.js');
var User = require('../models/user.js')
var Notification = require('../models/notification.js');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var jwt = require('../routes/jwtauth.js');
var gcm = require('node-gcm');


router.get('/', jwt, function(req,res){
	var error = {};
	var result = {};
    var provider = req.query.provider;
    var isBlocked = req.query.blocked=='true';
    
     var userId = null;
      if(req.user){
        userId = req.user._id;
      }else{
        userId = req.query.userId;
      }
    if(provider && provider=='true'){
        Order.find({provider:userId,blocked:isBlocked}).populate('service client provider')
        .exec(function(err,doc){
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
    }else{
        Order.find({client:userId,blocked:isBlocked}).populate('service client provider')
        .exec(function(err,doc){
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
    }
});

router.get('/:orderId/',function(req,res){
	var error = {};
	var result = {};
	var orderId = req.params.orderId;
	Order.findOne({_id:orderId}).populate('service').exec(function(err,doc){
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

            var newNotification = {};
            newNotification.order = newOrder._id;
            newNotification.notifier = newOrder.provider;
            newNotification.notified = newOrder.client;
            var notification = new Notification(newNotification);
            notification.save(function(err2) {
                if (err2) {
                    error.code = err2.code;
                    error.message = err2.message;
                    //11000: duplicated key
                    res.send(JSON.stringify({"result":result, "error":error}));
                }else{
                    res.status(201);
                    result.notification = newNotification;
                    User.findOne({_id:newNotification.notified},function(err3,doc3){
                        if(err3){
                            res.status(404);
                            error.code = 404;
                            error.message = "User Not Found";
                            res.send(JSON.stringify({"result": result, "error": error}));
                        }else if(!doc3.gcmIds){
                            res.status(201);
                            result.message = "The user doesn't have any registred device"
                        }else{
                            res.status(200);
                            result.sent="Ok";
                            gcmSender(doc3.gcmIds,notification.message,"Order Updated", newNotification.notified, newOrder._id);
                        }
                    });

                }
                    res.send(JSON.stringify({"result":result, "error":error}));
            });
        }
    });
});

router.post('/', jwt,function(req, res) {
    var new_order = new Order(req.body);
	var error= {};
	var result = {};
    var client = new_order.client;
    var blockedProviders = [];
     var userId = null;
  if(req.user){
    userId = req.user._id;
  }else{
    userId = req.query.userId;
  }

    Person.findOne({user:client},function (err,doc) {
         if(err){
            res.status(500);
            error.code = 500;
            res.send(JSON.stringify({"result": result, "error": error}));
         }else if(!doc){
            res.status(404);
            error.code = 404;
            error.message = "Client Not Found";
            res.send(JSON.stringify({"result": result, "error": error}));
         }else{
            blockedProviders = doc.blockedProviders;
            var blocked = !(blockedProviders.indexOf(userId) == -1);
            new_order.blocked=blocked;
        	new_order.save(function(err2) {
        		if (err2) {
        			error.code = err2.code;
        			error.message = err2.message;
              		//11000: duplicated key
              		error.code == 11000 ? res.status(409) : res.status(500);
              	}else{res.status(201);}
          		res.send(JSON.stringify({"result": result, "error": error}));
        	});
         } 
    });
    
});

var gcmSender = function(registrationIds,messageText,title,userId,orderId){
    var message = new gcm.Message();
    var sender = new gcm.Sender('AIzaSyD_n-5MPVMxqbrPGgcGvdwDdpsZ0MULelI');
    // Value the payload data to send...
    message.addData('message', messageText);
    message.addData('title', title );
    message.addData('userId', userId );
    message.addData('orderId', orderId );
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