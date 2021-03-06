import { Component, OnInit } from 'angular2/core';
import { OrderService } from '../services/order.service';
import { RequestOptions } from 'angular2/http';
import { RouteParams, Router } from 'angular2/router';
import { AlertService } from '../services/alert.service';
import { LOGGED_USER, UserService } from '../services/user.service';
import { ServiceListComponent } from './service-list.component';
import { ClientSelectComponet } from './client-select.component';
import { ServiceService } from '../services/service.service';
import { PersonService } from '../services/person.service';

@Component({
	selector: 'editOrder',
	templateUrl: 'views/editOrder.html',
	providers: [OrderService, ServiceService, PersonService]
})

export class EditOrderComponent implements OnInit {
	constructor(private _alertService: AlertService,
		private _orderService: OrderService,
		private _serviceService: ServiceService,
		private _userService: UserService,
		private _routeParams: RouteParams,
		private _router: Router) { }

	public order;
	public ok = false;
	back() {
		window.history.back();
	};

	alertaErro(error){
		this._alertService.addErrorAlert(error.message);
	}

	updateOrder(){
		let orderPut = this.order;
		console.log(orderPut.client);
		orderPut.client = this.order.client.user;
		this._orderService.readyOrder(orderPut)
			.subscribe(success => {
					this._alertService.addSuccessAlert("Pedido atualizado com sucesso!";
					this._router.navigate(['Order']);
				}),
				error => this.alertaErro(error.message))
	}

	ngOnInit(){
		let idOrder = this._routeParams.get('id');
		this._orderService.getOrder(idOrder).subscribe(
			order => {
				this.order = order,
				this.ok = true;
			},
			error => this.alertaErro(error));
	};
}