import {Injectable} from 'angular2/core';
import {Usuario} from './usuario';

@Injectable()
export class UsuarioService {
  	getUsuarios() {
	  	return Promise.resolve(USUARIOS);;
	}

	getUsuario(login : string) {
		return Promise.resolve(USUARIOS).then(
			usuarios => usuarios.filter(usuarios => usuarios.login === login)[0]
    	);			
	}
}

var USUARIOS: Usuario[] = [
	{ "login": "user1", "nome": "RubberMan" },
	{ "login": "user2", "nome": "Dynama" },
	{ "login": "user3", "nome": "Dr IQ" },
	{ "login": "user4", "nome": "Magma" },
	{ "login": "user5", "nome": "Tornado" }
];