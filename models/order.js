var mongoose = require('mongoose');
var Service = require('./service');
var User = require('./user');


var OrderSchema = new mongoose.Schema
(
{
	code: {type:String, required:true, unique:true},
	description: {type:String},
	service: {type:mongoose.Schema.Types.ObjectId,ref:"Service",required:true},
	client: {type:mongoose.Schema.Types.ObjectId, ref:"User",required: true},
	status: {type:String, required:true},
	creation_date:{type:Date},
	price: {type:Number}
}

);
OrderSchema.index({code:1},{unique:true});
module.exports = mongoose.model("Order",OrderSchema);