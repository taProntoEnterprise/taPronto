import { Injectable } from 'angular2/core';
import { Service } from '../models/service';
import { LOGGED_USER, userToken } from './user.service';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServiceService {
	constructor(private http: Http) { }

	private _serviceUrl = 'https://tapronto1.herokuapp.com/services/';
	// private _serviceUrl = 'http://localhost:3000/services/';

	getServices() {
		let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': userToken });
		let options = new RequestOptions({ headers: headers });
		return this.http.get(this._serviceUrl, options)
			.map(res => <Array<Object>>res.json().result.data)
		.do(res => console.log(res))
		.catch(this.handleError);
	}

	getService(serviceId) {
		let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': userToken });
		let options = new RequestOptions({ headers: headers });
		var url = 'https://tapronto1.herokuapp.com/services/' + serviceId;
		return this.http.get(url, options)
		.map(res => <Object>res.json().result.data)
		.do(res => console.log(res))
		.catch(this.handleError);
	}

	registerService(newService : Object){
		let body = JSON.stringify(newService);
		let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': userToken });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this._serviceUrl, body, options)
			.map(res => <Object>res.json().result.data)
			.catch(this.handleError);
	}

 	private handleError (error: Response) {
	   console.error(error);
	   return Observable.throw(error.json().error || 'Server error');
	}
}