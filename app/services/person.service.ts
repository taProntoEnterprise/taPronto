import { Injectable } from 'angular2/core';
import { Provider } from '../models/provider';
import { Http, Response, RequestOptions, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { LOGGED_USER } from './user.service';

@Injectable() 
export class PersonService {
	constructor(private http: Http) { }

	getPerson(userId) {
		let url = 'http://localhost:3000/person/' + userId +  "/?userId="+ LOGGED_USER.id;
		return this.http.get(url)
                  .map(res => res.json().result.data)
				  .catch(this.handleError);
	}

 	private handleError (error: Response) {
	   console.error(error);
	   return Observable.throw(error.json().error || 'Server error');
	}
}