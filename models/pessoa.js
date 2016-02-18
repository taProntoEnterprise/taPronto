var mongoose = require('mongoose');


var PessoaSchema = new mongoose.Schema
(
{
	nome: {type:String, required:true, unique: true},
	nome: {type:String, required:true},
	email: {type:String},
	data_cadastro: {type: Date}

}


);
PessoaSchema.index({id:1, unique:true});
module.exports = mongoose.model("Pessoa",PessoaSchema);