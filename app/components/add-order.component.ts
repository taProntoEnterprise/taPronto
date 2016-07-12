import { Component, OnInit } from 'angular2/core';
import { ServiceService } from '../services/service.service';
import { OrderService } from '../services/order.service';
import { RequestOptions } from 'angular2/http';
import { AlertService } from '../services/alert.service';
import { LOGGED_USER } from '../services/user.service';
import { ServiceListComponent } from './service-list.component';
import { ClientSelectComponet } from './client-select.component';
import { PersonService } from '../services/person.service';

@Component({
	selector: 'addOrder',
	templateUrl: 'views/addOrder.html',
	providers: [ServiceService, OrderService, PersonService],
	directives: [ServiceListComponent, ClientSelectComponet] 
})

export class AddOrderComponent implements OnInit {
	constructor(private _alertService: AlertService,
		private _serviceService: ServiceService,
		private _orderService: OrderService) { }

	private dataAtual = new Date();
	public selectedService;
	public serviceList;
	public selectedClient;
	public newOrder = {
		description: "",
		price: 0,
		service: undefined,
		client: undefined,
		status: "Em andamento"
	};

	registerOrder(){
		this.newOrder.service = this.selectedService._id;
		console.log(this.selectedClient);
		this.newOrder.client = this.selectedClient._id;
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

	hasSelectedService(){
		return this.selectedService !== undefined;
	};
	
	selectClient(client){
		this.selectedClient = client;
	};
	
	deselectClient() {
		this.selectedClient = undefined;
	};

	hasSelectedClient(){
		return this.selectedClient !== undefined;
	};

	back() {
		window.history.back();
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