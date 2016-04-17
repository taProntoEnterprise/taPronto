import { Component, Input, Output, EventEmitter} from 'angular2/core';
import { AlertService } from './alert.service';
import { Service } from './models/service';
import { UserService } from './user.service';

@Component({
    selector: 'clientSelect', 
    templateUrl: 'views/clientSelect.html'
})

export class ClientSelectComponet {
  	constructor(private _userService: UserService) {}

	public clientName : String;

	@Output() onSelectedClient = new EventEmitter<Object>();

	searchClient(service) {
		var mockUser = this._userService.searchUser(this.clientName);

		this.onSelectedClient.emit(mockUser);
	}
}