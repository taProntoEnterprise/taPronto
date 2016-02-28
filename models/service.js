var mongoose = require('mongoose');
var Person = require('./person');


var ServiceSchema = new mongoose.Schema
(
{
	code: {type:String, required:true, unique:true},
	description: {type:String, required: true},
	generator: {type:mongoose.Schema.Types.ObjectId, ref:"Person",required: true},
	client: {type:mongoose.Schema.Types.ObjectId, ref:"Person",required: true},
	status: {type:String, required:true},
	creation_date: {type:Date, required:true}
}

);
ServiceSchema.index({key:1},{unique:true});
module.exports = mongoose.model("Service",ServiceSchema);