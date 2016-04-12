var UserModel = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(req, res, next){
	
	var token = (req.body && req.body.access_token) || req.query.access_token || req.headers["x-access-token"];

	if (token) {

		try {
			var decoded = jwt.decode(token, 'TA_PRONTO_PRA_PAGAR_P1')

			if (decoded.exp <= Date.now()) {
				res.end('Access token has expired', 400)				
			}

			UserModel.findOne({ '_id': decoded.iss }, function(err, user){

				if (!err) {					
					req.user = user									
					return next()
				}
			})

		} catch (err) {			
			return next()
		}

	} else {

		next()

	}
};