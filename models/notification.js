var mongoose = require('mongoose');
var Person = require('./person');
var Service = require('./service');
var autoIncrement = require('mongoose-auto-increment');


var NotificationSchema = new mongoose.Schema
(
{
	code: {type:Number},
	message: {type:String},
	//tdo set delivered to false on creation
	delivered:{type:Boolean},
	order: {type:mongoose.Schema.Types.ObjectId, ref:"Order",required: true},
	notifier: {type:mongoose.Schema.Types.ObjectId, ref:"User",required: true},
	notified: {type:mongoose.Schema.Types.ObjectId, ref:"User",required: true},
	//todo set the date with pre save
	notification_date: {type:Date, required:true}
}


);
NotificationSchema.plugin(autoIncrement.plugin, { model: 'Notification', field: 'code'});
NotificationSchema.index({id:1},{unique:true});
module.exports = mongoose.model("Notification",NotificationSchema);