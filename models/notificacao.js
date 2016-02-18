var mongoose = require('mongoose');


var NotificacaoSchema = new mongoose.Schema
(
{
	id: {type:String, required:true, unique:true},
	chave_produto: {type:String, required:true},
	message: {type:String, required: true},
	notificador: {type:String, required:true},
	notificado: {type:String, required:true},
	data_notifucacao: {type:Date, required:true},

}


);
NotificacaoSchema.index({id:1},{unique:true});
module.exports = mongoose.model("Notificacao",NotificacaoSchema);