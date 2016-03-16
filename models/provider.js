var mongoose = require('mongoose');

var ProviderSchema = new mongoose.Schema
({
	name: {type:String, required:true},
	phones: [String],
	documentType: [String],
	documentNumber: {type:String},
	addresses: [String],
	emails: [String],
	description: [String],
	user: {type:mongoose.Schema.Types.ObjectId, ref:"User"}
});

ProviderSchema.pre('save',function (next) {
	var provider = this;
	if (provider.phones.length === 0) {
		var error = new Error('Provider must have one phone number at least.');
		error.code = 400;
		return next(error);
	}
	next();
});

ProviderSchema.index({name:1});
module.exports = mongoose.model("Provider",ProviderSchema);