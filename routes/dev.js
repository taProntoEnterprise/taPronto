var express = require('express');
var User = require('../models/user.js');
var router = express.Router();

router.get('/',function (req,res){
   res.send("OK");
});

router.get('/populate', function(req, res) {
    var error= {};
    var result = {};
    for(var i=0;i<users.length;i++){
        var user = new User(users[i]);
        user.save(function(err) {
            if (err) {
                error.code = err.code;
                error.message = err.message;
                error.code == 11000 ? res.status(409) : res.status(500);
                berak;
            }else{
              res.status(201);
          }
      });
    }

    res.send(JSON.stringify({"result": result, "error": error}));
});

router.get('/drop',function(req,res){
   var error= {};
   var result = {};
   User.remove(function(err){
        if (err) {
            error.code = err.code;
            error.message = err.message;
            error.code == 11000 ? res.status(409) : res.status(500);
            berak;
        }else{
          res.status(201);
        }
    });
   res.send(JSON.stringify({"result": result, "error": error}));
});

module.exports = router;

var users = [{
    "username": "test1",
    "password": "test1"
}, {
    "username": "test2",
    "password": "test2"
}, {
    "username": "test3",
    "password": "test3"
}, {
    "username": "test4",
    "password": "test4"
}, {
    "username": "test5",
    "password": "test5"
}, {
    "username": "test6",
    "password": "test6"
}, {
    "username": "test7",
    "password": "test7"
}, {
    "username": "test8",
    "password": "test8"
}, {
    "username": "test9",
    "password": "test9"
}, {
    "username": "test10",
    "password": "test10"
}, {
    "username": "test11",
    "password": "test11"
}, {
    "username": "test12",
    "password": "test12"
}, {
    "username": "test13",
    "password": "test13"
}, {
    "username": "test14",
    "password": "test14"
}, {
    "username": "test15",
    "password": "test15"
}]
