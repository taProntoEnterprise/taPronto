import { Component, Input, Output, EventEmitter} from 'angular2/core';
import { AlertService } from '../services/alert.service';
import { Service } from '../models/service';
import { UserService } from '../services/user.service';
import { PersonService } from '../services/person.service';

@Component({
    selector: 'clientSelect',
    templateUrl: 'views/clientSelect.html'
})

export class ClientSelectComponet {
	constructor(private _userService: UserService,
		private _alertService: AlertService,
		private _personService: PersonService) { }

	public clientName: String;

	@Output() onSelectedClient = new EventEmitter<Object>();

	searchClient(service) {
		this._userService.searchUser(this.clientName).subscribe(
			client => this.searchPerson(client),
			error => this.alertClientNotFound());
	}

	alertClientNotFound() {
		this._alertService.addErrorAlert("Cliente não encontrado.");
	}

	alertPersonNotFound() {
		this._alertService.addErrorAlert("Cliente não possui cadastro no aplicativo.");
	}

	searchPerson(client){
		console.log(client);
		this._personService.getPerson(client._id).subscribe(
			person => this.onSelectedClient.emit(client),
			error => this.alertPersonNotFound());
	}
}