import {Injectable} from 'angular2/core';
import {User} from '../models/user';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
	constructor(private http: Http) { }

	private _loginUrl = 'https://tapronto1.herokuapp.com/users/login';
	private _newUserUrl = 'https://tapronto1.herokuapp.com/users';

	// private _loginUrl = 'http://localhost:3000/users/login';
	// private _newUserUrl = 'http://localhost:3000/users';
	login(loginUser: Object) {
		let body = JSON.stringify(loginUser);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this._loginUrl, body, options)
			.map(res => {
				this.mapUser(<Object>res.json().result.data);
				console.log(<String>res.json().result.token);
				userToken = <String>res.json().result.token;
			})
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

	searchUser(username) {
		var url = 'https://tapronto1.herokuapp.com/users/?username=' + username;
		// var url = 'http://localhost:3000/users/?username=' + username;
		return this.http.get(url)
		.map(res => <Object>res.json().result.data)
		.do(res => console.log(res))
		.catch(this.handleError);
	}
	
 	private handleError (error: Response) {
	  return Observable.throw(error.json().error || 'Server error');
	}
}

export var LOGGED_USER : User;

export var userToken : String;