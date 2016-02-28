var mongoose = require('mongoose');
var User = require('./user');


var PersonSchema = new mongoose.Schema
({
	name: {type:String, required:true},
	email: {type:String},
	creation_date: {type: Date},
	user: {type:mongoose.Schema.Types.ObjectId, ref:"User"}
});
PersonSchema.index({nome:1});
module.exports = mongoose.model("Person",PersonSchema);