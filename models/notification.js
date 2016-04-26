var mongoose = require('mongoose');
var User = require('./user');
var Order = require('./order');
var autoIncrement = require('mongoose-auto-increment');


var NotificationSchema = new mongoose.Schema
(
{
	code: {type:Number},
	message: {type:String},
	delivered:{type:Boolean,default:false},
	order: {type:mongoose.Schema.Types.ObjectId, ref:"Order",required: true},
	notifier: {type:mongoose.Schema.Types.ObjectId, ref:"User",required: true},
	notified: {type:mongoose.Schema.Types.ObjectId, ref:"User",required: true},
	notification_date: {type:Date, required:true, default:Date.now},
	blocked:{type: Boolean,default:false}
}


);
NotificationSchema.plugin(autoIncrement.plugin, { model: 'Notification', field: 'code'});
NotificationSchema.index({code:1},{unique:true});
module.exports = mongoose.model("Notification",NotificationSchema);