import { Injectable } from 'angular2/core';
import { Order } from '../models/order';
import { LOGGED_USER, userToken } from './user.service';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { PersonService } from './person.service';


@Injectable()
export class OrderService {
	constructor(private http: Http,
		private _personService: PersonService) { }

	private _orderUrl = 'https://tapronto1.herokuapp.com/orders/';

	getOrders() {
		let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': userToken });
		let options = new RequestOptions({ headers: headers });
		return this.http.get(this._orderUrl + "?provider=true", options)
		.map(res => <Array<Object>>res.json().result.data)
		.do(res => console.log(res))
		.catch(this.handleError);
	}

	getOrder(idOrder) {
		let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': userToken });
		let options = new RequestOptions({ headers: headers });
		var url = 'https://tapronto1.herokuapp.com/orders/' + idOrder;
		return this.http.get(url, options)
		.flatMap(order => {
			let idUserClient = <Object>order.json().result.data.client;
			return this._personService.getPerson(idUserClient).map(info => {
				console.log(info);
				let mappedOrder = <Object>order.json().result.data;
				mappedOrder.client = info;
				return mappedOrder;
			})
		})
		.do(res => console.log(res))
		.catch(this.handleError);
	}

	registerOrder(newOrder : Object){
		newOrder.provider = LOGGED_USER.id;
		let body = JSON.stringify(newOrder);

		let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': userToken });
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
		var url = 'https://tapronto1.herokuapp.com/orders/' + order._id;
		order.status = "taPronto";

		let body = JSON.stringify(order);
		let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': userToken });
		let options = new RequestOptions({ headers: headers });
		return this.http.put(url, body, options)
			.map(res => <Object>res.json().result.data)
			.catch(this.handleError);
    }
}


