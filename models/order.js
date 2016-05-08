var mongoose = require('mongoose');
var Service = require('./service');
var User = require('./user');
var autoIncrement = require('mongoose-auto-increment');



var OrderSchema = new mongoose.Schema
(
{
	code: {type:Number},
	description: {type:String},
	service: {type:mongoose.Schema.Types.ObjectId,ref:"Service",required:true},
	client: {type:mongoose.Schema.Types.ObjectId, ref:"User",required: true},
	provider: {type:mongoose.Schema.Types.ObjectId, ref:"User",required: true},
	status: {type:String, required:true},
	creation_date:{type:Date},
	price: {type:Number},
	blocked:{type:Boolean,default:false}
}

);
OrderSchema.plugin(autoIncrement.plugin, { model: 'Order', field: 'code'});
OrderSchema.index({code:1},{unique:true});
module.exports = mongoose.model("Order",OrderSchema);