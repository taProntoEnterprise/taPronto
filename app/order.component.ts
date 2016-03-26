import { Component, OnInit, Input } from 'angular2/core';
import { Router } from 'angular2/router';
import { AlertService } from './alert.service';
import { Order } from './models/order';
// import { ServiceService } from './service.service';
import { OrderListComponent } from './order-list.component';

@Component({
    selector: 'order',
    templateUrl: 'views/order.html',
    // providers: [OrderService],
	directives: [OrderListComponent]
})

export class OrderComponent implements OnInit {
	constructor(private _router: Router,
		private _alertService: AlertService) { }

	public orderList;

	goToRegisterOrder() {
		this._router.navigate(['AddOrder']);
	}
	
	ngOnInit() {
	//	this._serviceService.getServices().subscribe(
	//		services => this.serviceList = services,
	//		error => console.log(error));
		this.orderList = [{ code: "1", description: "Pedido 1" }, 
		{code: "2", description: "Pedido 2"},
		{code: "3", description: "Pedido 3"}  ]
	}
}