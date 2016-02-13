var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema
(
{
	username: {type:String, required:true, unique:true},
	password: {type:String, required:true},

}


);
UserSchema.index({username:1},{unique:true});
module.exports = mongoose.model("User",UserSchema);