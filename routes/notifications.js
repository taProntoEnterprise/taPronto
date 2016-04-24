var express = require('express');
var Notification = require('../models/notification.js');
var router = express.Router();
var jwt = require('../routes/jwtauth.js');


router.get('/',jwt,function(req,res){
	var error = {};
	var result = {};
	var userId = req.user;
    if(!userId){userId = req.query.userId;}
	Notification.find({notified:userId,delivered:false},function(err,doc){
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
router.post('/',jwt, function(req, res) {
	var notification = new Notification(req.body);
	console.log(notification);
	var error= {};
	var result = {};
	notification.save(function(err) {
		if (err) {
			console.log(err);
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