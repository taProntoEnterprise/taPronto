import {Component, OnInit} from 'angular2/core';
import {User} from './user';
import {UserService} from './user.service';
import { Router } from 'angular2/router';


// Funciona como declaracao do controller/diretiva, tudo é diretiva no angular 2.0,
// por isso é chamado de componente agora, um componente pode ter outros componentes
// e acessarem 'certas' coisas deles. Bem vago.
@Component({
    selector: 'login', // nome utilizado no HTML para importar a diretiva
    templateUrl: 'views/login.html',
	providers: [UserService]
})

// Aqui eh a função em si do controller/diretiva
export class LoginComponent {
	// Quando vc quer injetar algo vc utiliza essa notação abaixo
	constructor(
		private _router: Router,
		private _userService: UserService) { }
	
	goToAddUser(){
		// this._router.navigate( ['AddUser']);
	}
}