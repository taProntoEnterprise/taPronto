import {Injectable} from 'angular2/core';
import {Provider} from './models/provider';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import { LOGGED_USER } from './user.service';

@Injectable() 
export class ProviderService {
	constructor(private http: Http) { }

	private _providersUrl = 'http://localhost:3000/providers/' + "?userId="+ LOGGED_USER.id;

	getServices() {
		return this.http.get(this._providersUrl)
                  .map(res => res.json().result.data)
				  .catch(this.handleError);
	}

	registerProvider(newProvider){
		let body = JSON.stringify(newProvider);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this._providersUrl, body, options)
                  .map(res => res.json().result.data)
				  .catch(this.handleError);
	}

	updateProvider(provider){
		var url = 'http://localhost:3000/providers/' +
			provider.id + '/?userId=' + LOGGED_USER.id;
		let body = JSON.stringify(provider);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.put(this._providersUrl, body, options)
	                 .map(res => res.json().result.data)
				  .catch(this.handleError);
	}

 	private handleError (error: Response) {
	   console.error(error);
	   return Observable.throw(error.json().error || 'Server error');
	}
}