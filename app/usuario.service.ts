import {Injectable} from 'angular2/core';
import {Usuario} from './usuario';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';


// Velho e bom service do Angular
@Injectable() // <-- Fucking necessarios esses parenteses, foi dito umas 3 vzs para sempre colocar eles, entao deve ser importante
export class UsuarioService {
	constructor(private http: Http) { }

	private _usuariosUrl = 'http://localhost:3000/users/';

	getUsuarios() {
		var response = this.http.get(this._usuariosUrl)
                .map(res => <Object[]> res.json().result)
			    .do(info => console.log(info)) 
				.catch(this.handleError);

		console.log(response);
		return response;
	}

	getUsuario(login : string) {
		// Isso é a mesma coisa da de cima + filtragem + magia negra, não tenho ideia do q isso faz
		return Promise.resolve(USUARIOS).then(
			usuarios => usuarios.filter(usuarios => usuarios.login === login)[0]
    	);			
	}

 	private handleError (error: Response) {
	   console.error(error);
	   return Observable.throw(error.json().error || 'Server error');
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