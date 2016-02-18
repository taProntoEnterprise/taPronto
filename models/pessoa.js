var mongoose = require('mongoose');


var PessoaSchema = new mongoose.Schema
({
	nome: {type:String, required:true},
	email: {type:String},
	data_cadastro: {type: Date}
});
PessoaSchema.index({nome:1});
module.exports = mongoose.model("Pessoa",PessoaSchema);