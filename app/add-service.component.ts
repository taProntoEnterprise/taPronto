import { Component } from 'angular2/core';
import { ServiceService } from './service.service';
import { RequestOptions } from 'angular2/http';
import { AlertService } from './alert.service';

@Component({
	selector: 'add-service',
  	templateUrl: 'views/addService.html',
  	providers: [ServiceService]
})

export class AddServiceComponent{
	constructor(private _serviceService: ServiceService,
	private _alertService: AlertService) { }

	public newService = {
		name: "",
		description: ""
	}
	
	afterSucessfulRegister() {
		this._alertService.addSucessAlert("Serviço cadastrado com sucesso");
		this.back();
	}

	back() {
		window.history.back();
	}

	registerService() {
		this._serviceService.registerService(this.newService).subscribe(
			service => this.afterSucessfulRegister(),
			error => this.alertaErro(error));
	}

	alertaErro(error){
		this._alertService.addErrorAlert(error.message);
	}
}