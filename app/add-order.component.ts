import { Component, OnInit } from 'angular2/core';
import { ServiceService } from './service.service';
import { OrderService } from './order.service';
import { RequestOptions } from 'angular2/http';
import { AlertService } from './alert.service';
import { LOGGED_USER } from './user.service';
import { ServiceListComponent } from './service-list.component';

@Component({
	selector: 'addOrder',
	templateUrl: 'views/addOrder.html',
	providers: [ServiceService, OrderService],
	directives: [ServiceListComponent]
})

export class AddOrderComponent implements OnInit {
	constructor(private _alertService: AlertService,
		private _serviceService: ServiceService,
		private _orderService: OrderService) { }

	private dataAtual = new Date();
	public selectedService;
	public serviceList;
	public newOrder = {
		description: "",
		price: 0,
		service: undefined,
		client: undefined,
		status: "Em andamento"
	};

	registerOrder(){
		this.newOrder.service = this.selectedService._id;
		this.newOrder.client = LOGGED_USER.id;
		this._orderService.registerOrder(this.newOrder).subscribe(
			order => this.afterSuccessfulRegister(),
			error => this.alertaErro(error));
	}

	afterSuccessfulRegister() {
		this._alertService.addSuccessAlert("Pedido cadastrado com sucesso");
		this.back();
	}

	selectService(service){
		this.selectedService = service;
	};

	deselectService() {
		this.selectedService = undefined;
	};

	back() {
		window.history.back();
	};

	hasSelectedService(){
		return this.selectedService !== undefined;
	};

	alertaErro(error){
		this._alertService.addErrorAlert(error.message);
	}

	ngOnInit(){
		this._serviceService.getServices().subscribe(
			services => this.serviceList = services,
			error => console.log(error));
	};
}