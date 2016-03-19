var express = require('express');
var Person = require('../models/person.js');
var User = require('../models/user.js');
var ObjectId = require('mongoose').Types.ObjectId;
var router = express.Router();


router.get('/',function (req,res) {
	var userId=new ObjectId(req.query.userId);
	var error = {};
	var result = {};

	Person.findOne({user:userId},function (err,doc) {
		 if(err){
            res.contentType('application/json');
            res.status(500);
            error.code = err.code;
            error.message = err.message;
        }else{
            result = doc;
            res.contentType('application/json');
        }
        res.send(JSON.stringify({"result":result, "error":error}));
	});

});


router.post('/',function (req,res) {
	var userId = req.query.userId;
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


//TODO PUT
module.exports = router;