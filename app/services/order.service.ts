import { Injectable } from 'angular2/core';
import { Order } from '../models/order';
import { LOGGED_USER } from './user.service';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class OrderService {
	constructor(private http: Http) { }

	private _orderUrl = 'http://localhost:3000/orders/' + "?userId=" + LOGGED_USER.id;

	getOrders() {
		return this.http.get(this._orderUrl)
		.map(res => <Array<Object>>res.json().result.data)
		.do(res => console.log(res))
		.catch(this.handleError);
	}

	registerOrder(newOrder : Object){
		let body = JSON.stringify(newOrder);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this._orderUrl, body, options)
			.map(res => <Object>res.json().result.data)
			.catch(this.handleError);
	}

 	private handleError (error: Response) {
	   console.error(error);
	   return Observable.throw(error.json().error || 'Server error');
	}
}