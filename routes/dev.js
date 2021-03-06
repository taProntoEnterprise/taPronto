var express = require('express');
var User = require('../models/user.js');
var Provider = require('../models/provider.js');
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
			  res.send(JSON.stringify({"result": result, "error": error}));
          }
      });
    }
});

router.get('/populateproviders', function(req, res) {
    var error= {};
    var result = {};
    for(var i=0;i<providers.length;i++){
        var provider = new Provider(providers[i]);
		var user = new User({"username": "testProvider"+i, "password": "testProvider"+i});
		user.save(function(err) {
            if (err) {
                error.code = err.code;
                error.message = err.message;
                error.code == 11000 ? res.status(409) : res.status(500);
				res.send(JSON.stringify({"result": result, "error": error}));
                //break;
            }else{
			  provider.user = user._id;
              provider.save(function(err) {
				    console.log(provider);
					if (err) {
						error.code = err.code;
						error.message = err.message;
						error.code == 11000 ? res.status(409) : res.status(500);
						res.send(JSON.stringify({"result": result, "error": error}));
						//break;
					}else{
						result = provider;
						res.contentType('application/json');
						res.status(201);
						User.findById(user.id, function(err,doc){
							if(err){
									res.contentType('application/json');
									res.status(404);
									error.code = err.code;
									error.message = err.message;
							} else {
									doc.provider = provider.id;
									doc.save();
							}
							res.send(JSON.stringify({"result":result, "error":error}));
						});
				  }
			  });
          }
		});
    }
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
                //break;
            }else{
              res.status(201);
          }
      });
    }
    res.send(JSON.stringify({"result": result, "error": error}));
});

router.get('/dropusers',function(req,res){
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

router.get('/droporders',function(req,res){
   var error= {};
   var result = {};
   Order.remove(function(err){
        if (err) {
            error.code = err.code;
            error.message = err.message;
            error.code == 11000 ? res.status(409) : res.status(500);
        }else{
          res.status(201);
        }
        res.send(JSON.stringify({"result": result, "error": error}));
    });
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

var client1 =  new ObjectId("56e809e842046b891eb6a125");
var service1 = new ObjectId("56e809e842046b891eb6a128");
var service2 = new ObjectId("56e809e842046b891eb6a138");
var service3 = new ObjectId("56e809e842046b891eb6a148");
var service4 = new ObjectId("56e809e842046b891eb6a158");
var orders = [
    {
        "code": "1gz2a4b",
        "service": service1,
        "client": client1,
        "status": "em andamento",
        "description": "Óticas Diniz - Reparo na armação",
        "price": 80
    },
    {
        "code": "1g42a4C",
        "service": service2,
        "client": client1,
        "status": "em andamento",
        "description": "Gato & Sapato - Personalização de sandália",
        "price": 30
    },
    {
        "code": "1g52a4b",
        "service": service3,
        "client": client1,
        "status": "em andamento",
        "description": "Gráfica Copiar - Confecção das comandas",
        "creation_date": "12/02/2016",
        "price": 200
    },
    {
        "code": "1gz2y4b",
        "service": service4,
        "client": client1,
        "status": "em andamento",
        "description": "Laboratórios Bem Estar - Exame de sangue",
        "price": 9001
    }];

var providers = [
	{
		"name": "Empresa Teste",
		"phones": ["99999999"],
		"adresses": ["Rua Argentina, 2323"],
		"documentType": "CNPJ",
		"documentNumber": "2727346782364",
		"emails": ["sddhs@sdsd.com"]
	}
];