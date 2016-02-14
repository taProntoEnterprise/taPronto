import { Component } from 'angular2/core';
import { Usuario } from './usuario';
import { Router } from 'angular2/router';

@Component({
	selector: 'detalhes-usuario',
  	templateUrl: 'views/detalhes-usuario.html',
	inputs: ['usuario']
})

export class DetalhesUsuarioComponent {
    constructor(
    	private _router: Router
    ) { }

	usuario: Usuario;

	redirecionaAdmin() {
  		let link = ['Usuario', { login: this.usuario.login }];
  		this._router.navigate(link);
	};
}