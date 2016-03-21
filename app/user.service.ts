import {Injectable} from 'angular2/core';
import {User} from './models/user';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';


// Velho e bom service do Angular
@Injectable() // <-- Fucking necessarios esses parenteses, foi dito umas 3 vzs para sempre colocar eles, entao deve ser importante
export class UserService {
	constructor(private http: Http) { }

	private _loginUrl = 'http://localhost:3000/users/login';
	private _newUserUrl = 'http://localhost:3000/users/adduser';
	

	login(loginUser : Object) {
		let body = JSON.stringify(loginUser);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this._loginUrl, body, options)
			.map(res => this.mapUser(<Object>res.json().result.data))
			.do(data => console.log(data))
			.catch(this.handleError)
	}

	addUser(newUser : Object){
		let body = JSON.stringify(newUser);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this._newUserUrl, body, options)
			.map(res => <Object>res.json().result.data)
			.do(data => console.log(data))
			.catch(this.handleError);
	}

	mapUser(user) {
		var loggedUser: User = {
			"id" : user._id,
			"username": user.username,
			"person": user.peron,
			"provider": user.provider
		};
		LOGGED_USER = loggedUser;
		return loggedUser;
	}

 	private handleError (error: Response) {
	   return Observable.throw(error.json().error || 'Server error');
	}
}

export var LOGGED_USER : User;