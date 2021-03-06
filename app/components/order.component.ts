import { Component, OnInit, Input } from 'angular2/core';
import { Router } from 'angular2/router';
import { AlertService } from '../services/alert.service';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { OrderListComponent } from './order-list.component';
import { PersonService } from '../services/person.service';

@Component({
    selector: 'order',
    templateUrl: 'views/order.html',
    providers: [OrderService, PersonService],
	directives: [OrderListComponent]
})

export class OrderComponent implements OnInit {
	constructor(private _router: Router,
		private _alertService: AlertService,
		private _orderService: OrderService) { }

	public orderList;

	goToRegisterOrder() {
		this._router.navigate(['AddOrder']);
	}

	goToEditOrder(order) {
		this._router.navigate(['EditOrder', { id : order._id}]);
	}
	
	ngOnInit() {
		this._orderService.getOrders().subscribe(
			orders => this.orderList = orders,
			error => console.log(error));
	}
}