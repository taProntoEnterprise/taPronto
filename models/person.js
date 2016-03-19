var mongoose = require('mongoose');
var User = require('./user');


var PersonSchema = new mongoose.Schema
({
	name: {type:String, required:true},
	email: {type:String,required:true,unique:true},
	creation_date: {type: Date},
	user: {type:mongoose.Schema.Types.ObjectId, ref:"User"}
});
PersonSchema.index({name:1});
module.exports = mongoose.model("Person",PersonSchema);
