import { Injectable } from 'angular2/core';
import { Service } from '../models/service';
import { LOGGED_USER } from './user.service';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ServiceService {
	constructor(private http: Http) { }

	private _serviceUrl = 'http://localhost:3000/services/' + "?userId=" + LOGGED_USER.id;

	getServices() {
		return this.http.get(this._serviceUrl)
		.map(res => <Array<Object>>res.json().result.data)
		.do(res => console.log(res))
		.catch(this.handleError);
	}

	registerService(newService : Object){
		let body = JSON.stringify(newService);
		let headers = new Headers({ 'Content-Type': 'application/json' });
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