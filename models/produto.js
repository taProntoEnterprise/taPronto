var mongoose = require('mongoose');


var ProdutoSchema = new mongoose.Schema
(
{
	chave: {type:String, required:true, unique:true},
	descricao: {type:String, required: true},
	gerador: {type:String, required:true},
	client: {type:String, required:true},
	status: {type:String, required:true},
	data_criacao: {type:Date, required:true},

}


);
ProdutoSchema.index({chave:1},{unique:true});
module.exports = mongoose.model("Produto",ProdutoSchema);