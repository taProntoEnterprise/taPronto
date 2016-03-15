import {Component, OnInit} from 'angular2/core';
import {User} from './user';
import {UserService} from './user.service';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { AlertService } from './alert.service';


// Funciona como declaracao do controller/diretiva, tudo é diretiva no angular 2.0,
// por isso é chamado de componente agora, um componente pode ter outros componentes
// e acessarem 'certas' coisas deles. Bem vago.
@Component({
    selector: 'login', // nome utilizado no HTML para importar a diretiva
    templateUrl: 'views/login.html',
    directives: [ROUTER_DIRECTIVES],
	providers: [UserService]
})

// Aqui eh a função em si do controller/diretiva
export class LoginComponent {
	// Quando vc quer injetar algo vc utiliza essa notação abaixo
	constructor(
		private _router: Router,
		private _userService: UserService,
		private _alertService: AlertService) { }

	public loginUser = { 
		username: "",
		password: ""
	}

	goToHomepage() {
		this._router.navigate(["Dashboard"]);
	}

	errorLogin(error) {
		console.log(error);
		this._alertService.addErrorAlert("Problemas no servidor, tente mais tarde");
	}

	login() {
		this._userService.login(this.loginUser).subscribe(
			user => this.goToHomepage(),
			error => this.errorLogin(error))
	}
} 