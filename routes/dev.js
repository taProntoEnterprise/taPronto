var express = require('express');
var User = require('../models/user.js');
var Person = require('../models/person.js');
var Service = require('../models/service.js');
var Notification = require('../models/notification.js');
var Order = require('../models/order.js')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


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
                //break;
            }else{
              res.status(201);
          }
      });
    }

    res.send(JSON.stringify({"result": result, "error": error}));
});

router.get('/populateservices', function(req, res) {
    var error= {};
    var result = {};
    for(var i=0;i<=services.length;i++){
        var service = new Service(services[i]);
        service.save(function(err) {
            if (err) {
                error.code = err.code;
                error.message = err.message;
                error.code == 11000 ? res.status(409) : res.status(500);
               // break;
            }else{
              res.status(201);
          }
      });
    }

    res.send(JSON.stringify({"result": result, "error": error}));
});

router.get('/populatenotifications', function(req, res) {
    var error= {};
    var result = {};
    for(var i=0;i<=notifications.length;i++){
        var notification = new Notification(notifications[i]);
        notification.save(function(err) {
            if (err) {
                error.code = err.code;
                error.message = err.message;
                error.code == 11000 ? res.status(409) : res.status(500);
               // break;
            }else{
              res.status(201);
          }
      });
    }

    res.send(JSON.stringify({"result": result, "error": error}));
});

//FIXME: RODA, MAS NAO POPULA, PQ?
router.get('/populateorders', function(req, res) {
    var error= {};
    var result = {};
    for(var i=0;i<=orders.length;i++){
        var order = new Order(orders[i]);
        order.save(function(err) {
            if (err) {
                error.code = err.code;
                error.message = err.message;
                error.code == 11000 ? res.status(409) : res.status(500);
               // break;
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

router.get('/dropservice',function(req,res){
	   var error= {};
	   var result = {};
	   Service.remove(function(err){
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

router.get('/dropnotification',function(req,res){
	   var error= {};
	   var result = {};
	   Notification.remove(function(err){
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
    "password": "test123"
}];

var services = [{
	"code": "1234",
	"description": "bolo1",
	"generator": new Person ({
		"name": "nome1"
	}),
	"client": new Person ({
		"name": "nome2"
	}),
	"status": "aguardando",
	"creation_date": new Date()
}];

var notifications = [{
	"code": "2222",
	"service_code": new Service({
		"code": "123",
		"description": "description",
		"generator": new Person ({
			"name": "name4"
		}),
		"client": new Person ({
			"name": "name4"
		}),
		"status": "donw",
		"creation_date": new Date()
	}),
	"message": "message",
	"notifier": new Person ({
		"name": "name5"
	}),
	"notified": new Person ({
		"name": "name6"
	}),
	"notification_date": new Date()
}];

var client =  new ObjectId("56e809e842046b891eb6a125");
var service = new ObjectId("56e809e842046b891eb6a128");
var orders = [
    {
        "code": "1gz2a4b",
        "service": service,
        "client": client,
        "status": "em andamento",
        "description": "Óticas Diniz - Reparo na armação"
    },
    {
        "code": "1g42a4C",
        "service": service,
        "client": client,
        "status": "em andamento",
        "description": "Gato & Sapato - Personalização de sandália"
    },
    {
        "code": "1g52a4b",
        "service": service,
        "client": client,
        "status": "em andamento",
        "description": "Gráfica Copiar - Confecção das comandas"
    },
    {
        "code": "1gz2y4b",
        "service": service,
        "client": client,
        "status": "em andamento",
        "description": "Laboratórios Bem Estar - Exame de sangue"
    }];