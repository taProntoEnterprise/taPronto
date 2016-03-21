import { Component } from 'angular2/core';
import { UserService } from './user.service';
import { RequestOptions } from 'angular2/http';
import { AlertService } from './alert.service';

@Component({
	selector: 'addUser',
  	templateUrl: 'views/addUser.html'
})

export class AddUserComponent{
	constructor(private _userService: UserService,
		private _alertService: AlertService) { }

	public newUser = {
		username: "",
		password: ""
	}

	back() {
		window.history.back();
	}

	afterSuccessfulRegister() {
		this._alertService.addSuccessAlert("Usuario cadastrado com sucesso");
		this.back();
	}

	registerUser() {
		this._userService.addUser(this.newUser).subscribe(
			user => this.afterSuccessfulRegister(),
			error => this.alertaErro(error));
	}

	alertaErro(error){
		this._alertService.addErrorAlert(error.message);
	}
}