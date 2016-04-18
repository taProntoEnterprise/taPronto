import { Injectable } from 'angular2/core';
import { Order } from '../models/order';
import { LOGGED_USER } from './user.service';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { PersonService } from './person.service';


@Injectable()
export class OrderService {
	constructor(private http: Http,
		private _personService: PersonService) { }

	private _orderUrl = 'http://localhost:3000/orders/' + "?userId=" + LOGGED_USER.id;

	getOrders() {
		return this.http.get(this._orderUrl)
		.map(res => <Array<Object>>res.json().result.data)
		.do(res => console.log(res))
		.catch(this.handleError);
	}

	getOrder(idOrder) {
		var url = 'http://localhost:3000/orders/' + idOrder + "/?userId=" + LOGGED_USER.id;
		return this.http.get(url)
		.flatMap(order => {
			let idUserClient = <Object>order.json().result.data.client;
			return this._personService.getPerson(idUserClient).map(client => {
				let mappedOrder = <Object>order.json().result.data;
				mappedOrder.client = client;
				return mappedOrder;
			})
		})
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

    readyOrder(order) {
	    var url = 'http://localhost:3000/orders/' + order._id + "/?userId=" + LOGGED_USER.id;
		order.status = "taPronto";

		let body = JSON.stringify(order);
	  	let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.put(url, body, options)
			.map(res => <Object>res.json().result.data)
			.catch(this.handleError);
    }
}