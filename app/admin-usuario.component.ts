import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { UsuarioService } from './usuario.service';
import {Usuario} from './usuario';

@Component({
	selector: 'admin-usuario',
  	templateUrl: 'views/adminUsuario.html',
	inputs: ['usuario']
})

export class AdminUsuarioComponent implements OnInit{
	usuario: Usuario;
	constructor(
		private _usuarioService: UsuarioService,
		private _routeParams: RouteParams) {
	}

	voltar() {
  		window.history.back();
	}

	ngOnInit() {
	    let login = this._routeParams.get('login');
		this._usuarioService.getUsuario(login)
			.then(usuario => this.usuario = usuario);
	}
}