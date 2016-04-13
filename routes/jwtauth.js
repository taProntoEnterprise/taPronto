var UserModel = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(req, res, next){
	
	var token = (req.body && req.body.access_token) || req.query.access_token || req.headers["x-access-token"];

	if (token) {

		try {
			var decoded = jwt.decode(token, 'TA_PRONTO_PRA_PAGAR_P1')

			if (decoded.exp <= Date.now()) {
				res.status(403);
				res.end('Access token has expired', 403)				
			}

			UserModel.findOne({ '_id': decoded.iss }, function(err, user){

				if (!err) {					
					req.user = user									
					return next();
				}
			});

		} catch (err) {
			result = {};
			error = {};
			res.status(403);			
			error.message='Invalid Token';
			error.code=403;
			res.send(JSON.stringify({"result":result, "error":error}));

		}

	} else {
		//uncomment after only token based authentication is ready
		//result = {};
		//error = {};
		//res.status(403);			
	//	error.message='No token found';
	//	error.code=403;
	//	res.send(JSON.stringify({"result":result, "error":error}));

		next();

	}
};