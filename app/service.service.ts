import {Injectable} from 'angular2/core';
import {Service} from './service';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';


// Velho e bom service do Angular
@Injectable() // <-- Fucking necessarios esses parenteses, foi dito umas 3 vzs para sempre colocar eles, entao deve ser importante
export class ServiceService {
	constructor(private http: Http) { }

	private _newServiceUrl = 'http://localhost:3000/services/registerService';
	
	getServices() {
    return this.http.get('http://localhost:3000/services')
                  .map(res => res.json().result)
				  .catch(this.handleError);
	}

	registerService(newService : Object){
		let body = JSON.stringify(newService);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this._newServiceUrl, body, options)
			.map(res => <Object>res.json().result)
			.catch(this.handleError)
	}

 	private handleError (error: Response) {
	   console.error(error);
	   return Observable.throw(error.json().error || 'Server error');
	}
}