import { Component } from 'angular2/core';
import { RequestOptions } from 'angular2/http';
import { AlertService } from './alert.service';

@Component({
	selector: 'add-service',
  	templateUrl: 'views/addService.html'
})

export class AddServiceComponent{
	constructor(private _alertService: AlertService) { }

	public newService = {
		name: "",
		description: ""
	}

	back() {
		window.history.back();
	}

	registerService() {
		this._alertService.addErrorAlert("Não implementado.");
	}
}