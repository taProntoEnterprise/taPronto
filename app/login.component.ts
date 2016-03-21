import {Component, OnInit, Injector, provide} from 'angular2/core';
import {User} from './models/user';
import {UserService} from './user.service';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { AlertService } from './alert.service';

// Funciona como declaracao do controller/diretiva, tudo é diretiva no angular 2.0,
// por isso é chamado de componente agora, um componente pode ter outros componentes
// e acessarem 'certas' coisas deles. Bem vago.
@Component({
    selector: 'login', // nome utilizado no HTML para importar a diretiva
    templateUrl: 'views/login.html',
    directives: [ROUTER_DIRECTIVES]
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