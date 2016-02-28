var mongoose = require('mongoose');
var Person = require('./person');
var Service = require('./service');

var NotificationSchema = new mongoose.Schema
(
{
	code: {type:String, required:true, unique:true},
	service_code: {type:mongoose.Schema.Types.ObjectId, ref:"Service",required: true},
	message: {type:String, required: true},
	notifier: {type:mongoose.Schema.Types.ObjectId, ref:"Person",required: true},
	notified: {type:mongoose.Schema.Types.ObjectId, ref:"Person",required: true},
	notification_date: {type:Date, required:true}
}


);
NotificationSchema.index({id:1},{unique:true});
module.exports = mongoose.model("Notification",NotificationSchema);