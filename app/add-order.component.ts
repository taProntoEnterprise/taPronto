import { Component, OnInit } from 'angular2/core';
import { ServiceService } from './service.service';
import { RequestOptions } from 'angular2/http';
import { AlertService } from './alert.service';
import { ServiceListComponent } from './service-list.component';

@Component({
	selector: 'addOrder',
	templateUrl: 'views/addOrder.html',
	providers: [ServiceService],
	directives: [ServiceListComponent]
})

export class AddOrderComponent implements OnInit {
	constructor(private _alertService: AlertService,
		private _serviceService: ServiceService) { }

	public selectedService;
	public serviceList;
	public newOrder = {
		description: "",
		price: 0
	};

	selectService(service){
		this.selectedService = service;
	}

	deselectService() {
		this.selectedService = undefined;
	}

	back() {
		window.history.back();
	}

	hasSelectedService(){
		return this.selectedService !== undefined;
	}

	ngOnInit(){
		this._serviceService.getServices().subscribe(
			services => this.serviceList = services,
			error => console.log(error));
	}
}