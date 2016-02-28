var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema
(
{
	username: {type:String, required:true, unique:true},
	password: {type:String, required:true},
	person: {type:mongoose.Schema.Types.ObjectId, ref:"Person"}
}

);
UserSchema.index({username:1},{unique:true});
module.exports = mongoose.model("User",UserSchema);