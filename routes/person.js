'use strict';
var express = require('express');
var Person = require('../models/person.js');
var User = require('../models/user.js');
var ObjectId = require('mongoose').Types.ObjectId;
var router = express.Router();
var jwt = require('../routes/jwtauth.js');


router.get('/',jwt,function (req,res) {
    var userId = null;
    if(req.user){
      userId = req.user._id;
    }else{
      userId = req.query.userId;
    }

	var error = {};
	var result = {};

	Person.findOne({user:userId},function (err,doc) {
		 if(err){
            res.contentType('application/json');
            res.status(500);
            error.code = err.code;
            error.message = err.message;
        }else if(doc){
            result = doc;
            res.status(200);
            res.contentType('application/json');
        }else{
            res.status(404);
            error.message="Person Not Found!"
            res.contentType('application/json');
        }
        res.send(JSON.stringify({"result":result, "error":error}));
	});

});


router.post('/',jwt,function (req,res) {
    var userId = null;
    if(req.user){
      userId = req.user._id;
    }else{
      userId = req.query.userId;
    }

	var person = new Person(req.body);
	var error = {};
	var result = {};

    person.user=userId;
    person.save(function (err) {
         if(err){
            error.code = err.code;
            error.message = err.message;
            //11000: duplicated key
            error.code == 11000 ? res.status(409) : res.status(500);
            res.send(JSON.stringify({"result": result, "error": error}));
         }else{
            User.findOne({_id:userId},function (err,doc) {
                if(err){
                    res.contentType('application/json');
                    res.status(500);
                }else if(doc == null){
                    error.code=(404);
                    error.message="User not found";
                }else{
                    doc.person=person._id;
                    doc.save();
                    res.contentType('application/json');
                    res.status(201);
                }
                res.send(JSON.stringify({"result": result, "error": error}));
            });
         }
    });
});



router.put('/',jwt,function (req,res) {
  var error = {};
  var result = {};

  var userId = null;
  if(req.user){
    userId = req.user._id;
  }else{
    userId = req.query.userId;
  }

     var updatedPerson = new Person(req.body);

     User.findById(userId,function (err,doc) {
          if(err){
            res.contentType('application/json');
            res.status(500);
            error.code=err.code;
            error.message=err.message;
          }else if(doc == null){
            error.code(404);
            error.message="User not found";
          }else{
            var personId=doc.person;
            updatedPerson=updatedPerson.toObject();
            delete updatedPerson._id;
            Person.update({_id:personId},updatedPerson,{},function (err2,doc2){
                if(err2){
                    res.contentType('application/json');
                    res.status(500);
                    error.code=err2.code;
                    error.message=err2.message;
                }else{
                    res.contentType('application/json');
                    res.status(200);
                    updatedPerson._id=personId;
                    result.data=updatedPerson;
                }
                res.send(JSON.stringify({"result": result, "error": error}));
            });
          }
     });
});


router.get('/:userId',function(req,res) {
    var error = {};
    var result = {};
    var userId = req.params.userId;
    Person.findOne({user:userId},function(err,doc){
        if(err){
            res.contentType('application/json');
            res.status(500);
            error.code = err.code;
            error.message = err.message;

        }else{
            result.data = doc;
            res.status(200);
            res.contentType('application/json');
        }
        res.send(JSON.stringify({"result":result, "error":error}));
    });
});


router.put('/block/:providerId',jwt,function (req,res) {
     var error  = {};
     var result = {};
     var providerId = req.params.providerId;
      var userId = null;
    if(req.user){
      userId = req.user._id;
    }else{
      userId = req.query.userId;
    }

     Person.update({user:userId},{$addToSet:{blockedProviders:providerId}},function (err,doc) {
        if(err){
            res.contentType('application/json');
            res.status(500);
            error.code = err.code;
            error.message = err.message;
        }else{
            result.data = doc;
            res.status(200);
            res.contentType('application/json');
        }
        res.send(JSON.stringify({"result":result, "error":error}));

     });
});

router.put('/unblock/:providerId',jwt,function (req,res) {
     var error  = {};
     var result = {};
     var providerId = req.params.providerId;
      var userId = null;
  if(req.user){
    userId = req.user._id;
  }else{
    userId = req.query.userId;
  }

     Person.update({user:userId},{$pull:{blockedProviders:providerId}},function (err,doc) {
        if(err){
            res.contentType('application/json');
            res.status(500);
            error.code = err.code;
            error.message = err.message;
        }else{
            result.data = doc;
            res.status(200);
            res.contentType('application/json');
        }
        res.send(JSON.stringify({"result":result, "error":error}));

     });
});
module.exports = router;