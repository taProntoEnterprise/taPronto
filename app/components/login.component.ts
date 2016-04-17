import {Component, OnInit, Injector, provide} from 'angular2/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'login',
    templateUrl: 'views/login.html',
    directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent {
	constructor(
		private _router: Router,
		private _userService: UserService,
		private _alertService: AlertService) { }

	public loginUser = { 
		username: "",
		password: ""
	}

	goToHomepage(user) {
		this._router.navigate(["Dashboard"]);
	}

	errorLogin(error) {
		if(error.code == 401){
			this._alertService.addErrorAlert("O par usuario/senha é invalido.");
		} else {
			this._alertService.addErrorAlert("Problemas no servidor, tente mais tarde.");
		}
	}

	login() {
		this._userService.login(this.loginUser).subscribe(
			user => this.goToHomepage(user),
			error => this.errorLogin(error))
	}
} 