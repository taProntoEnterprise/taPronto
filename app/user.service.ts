import {Injectable} from 'angular2/core';
import {User} from './user';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';


// Velho e bom service do Angular
@Injectable() // <-- Fucking necessarios esses parenteses, foi dito umas 3 vzs para sempre colocar eles, entao deve ser importante
export class UserService {
	constructor(private http: Http) { }

	private _usuariosUrl = 'http://localhost:3000/users/';

	login(username : string, password : string) {
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