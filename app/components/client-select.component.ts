import { Component, Input, Output, EventEmitter} from 'angular2/core';
import { AlertService } from '../services/alert.service';
import { Service } from '../models/service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'clientSelect',
    templateUrl: 'views/clientSelect.html'
})

export class ClientSelectComponet {
	constructor(private _userService: UserService,
		private _alertService: AlertService) { }

	public clientName: String;

	@Output() onSelectedClient = new EventEmitter<Object>();

	searchClient(service) {
		this._userService.searchUser(this.clientName).subscribe(
			client => this.onSelectedClient.emit(client),
			error => this.alertClientNotFound());
	}

	alertClientNotFound() {
		this._alertService.addErrorAlert("Cliente não encontrado.");
	}
}