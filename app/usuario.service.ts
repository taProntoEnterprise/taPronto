import {Injectable} from 'angular2/core';
import {Usuario} from './usuario';

// Velho e bom service do Angular
@Injectable() // <-- Fucking necessarios esses parenteses, foi dito umas 3 vzs para sempre colocar eles, entao deve ser importante
export class UsuarioService {
  	getUsuarios() {
  		// Promise que se resolve automaticamente com o array de mock
	  	return Promise.resolve(USUARIOS);
	}

	getUsuario(login : string) {
		// Isso é a mesma coisa da de cima + filtragem + magia negra, não tenho ideia do q isso faz
		return Promise.resolve(USUARIOS).then(
			usuarios => usuarios.filter(usuarios => usuarios.login === login)[0]
    	);			
	}
}

// Mock
var USUARIOS: Usuario[] = [
	{ "login": "user1", "nome": "RubberMan" },
	{ "login": "user2", "nome": "Dynama" },
	{ "login": "user3", "nome": "Dr IQ" },
	{ "login": "user4", "nome": "Magma" },
	{ "login": "user5", "nome": "Tornado" }
];