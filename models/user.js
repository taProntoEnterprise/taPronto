var mongoose = require('mongoose');
var scrypt = require('scrypt');

var UserSchema = new mongoose.Schema
(
	{
		username: {type:String, required:true, unique:true},
		password: {type:String, required:true},
		person: {type:mongoose.Schema.Types.ObjectId, ref:"Person"}
	}

);

UserSchema.pre('save',function (next) {
	var user = this;
	if(!user.isModified('password')) return next();
	scrypt.hash(user.password,{"N":16,"r":1,"p":1},64,"",function (err,hash) {
		if(err){return next(err);}
		user.password = hash.toString('hex');
		next(); 
	}); 
});

UserSchema.methods.verifyPass = function (candidatePassword) {
	var user= this;
	var candidate = scrypt.hashSync(candidatePassword,{"N":16,"r":1,"p":1},64,"");
	return user.password===candidate.toString("hex");
};







UserSchema.index({username:1},{unique:true});
module.exports = mongoose.model("User",UserSchema);