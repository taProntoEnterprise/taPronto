import {Injectable} from 'angular2/core';
import {Provider} from './provider';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import { LOGGED_USER } from './user.service';


// Velho e bom service do Angular
@Injectable() // <-- Fucking necessarios esses parenteses, foi dito umas 3 vzs para sempre colocar eles, entao deve ser importante
export class ProviderService {
	constructor(private http: Http) { }

	private _providersUrl = 'http://localhost:3000/providers/';
	
	getServices() {
		var uri = this._providersUrl + LOGGED_USER.provider 
		return this.http.get(uri)
                  .map(res => res.json().result)
				  .catch(this.handleError);
	}

	registerProvider(newProvider){
		var uri = this._providersUrl + LOGGED_USER.id + '/addprovider';
		let body = JSON.stringify(newProvider);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(uri, body, options)
                  .map(res => res.json().result)
				  .catch(this.handleError);
	}

 	private handleError (error: Response) {
	   console.error(error);
	   return Observable.throw(error.json().error || 'Server error');
	}
}