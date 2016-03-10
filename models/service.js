var mongoose = require('mongoose');
var Person = require('./person');


var ServiceSchema = new mongoose.Schema
(
{
	name:{type:String,required:true},
	company:{type:String},
	description:{type:String}
}

);
ServiceSchema.index({key:1},{unique:true});
module.exports = mongoose.model("Service",ServiceSchema);