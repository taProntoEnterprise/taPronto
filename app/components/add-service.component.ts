import { Component } from 'angular2/core';
import { ServiceService } from '../services/service.service';
import { RequestOptions } from 'angular2/http';
import { AlertService } from '../services/alert.service';

@Component({
	selector: 'addService',
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
	
	afterSuccessfulRegister() {
		this._alertService.addSuccessAlert("Serviço cadastrado com sucesso");
		this.back();
	}

	back() {
		window.history.back();
	}

	registerService() {
		this._serviceService.registerService(this.newService).subscribe(
			service => this.afterSuccessfulRegister(),
			error => this.alertaErro(error));
	}

	alertaErro(error){
		this._alertService.addErrorAlert(error.message);
	}
}