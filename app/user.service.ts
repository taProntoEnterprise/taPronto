import {Injectable} from 'angular2/core';
import {User} from './user';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';


// Velho e bom service do Angular
@Injectable() // <-- Fucking necessarios esses parenteses, foi dito umas 3 vzs para sempre colocar eles, entao deve ser importante
export class UserService {
	constructor(private http: Http) { }

	private _loginUrl = 'https://tapronto1.herokuapp.com/users/login';
	private _newUserUrl = 'https://tapronto1.herokuapp.com/users/adduser';
	

	login(loginUser : Object) {
		let body = JSON.stringify(loginUser);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this._loginUrl, body, options)
			.map(res => <Object>res.json().data)
			.catch(this.handleError)
	}

	addUser(newUser : Object){
		let body = JSON.stringify(newUser);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this._newUserUrl, body, options)
			.map(res => <Object>res.json().data)
			.catch(this.handleError)
	}

 	private handleError (error: Response) {
	   console.error(error);
	   return Observable.throw(error.json().error || 'Server error');
	}
}